'use strict';

var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('config');
var axios = require('axios');

const statusServer = config.get('statusServer');

// Setup AWS configuration parameters for S3 bucket "e2e-ecom-build-status"
AWS.config.update({
    region: 'eu-west-1'/*,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY*/
});

// Create S3 service object
var s3 = new AWS.S3();

checkForNewBuilds()
    .then(function (newBuilds) {
        if (!newBuilds) {
            process.exitCode = 1;
            console.log('There are not any new Develop builds in Travis');
        }
    })
    .catch(function (error) {
        process.exitCode = 20;
        console.log(error);
    });

async function checkForNewBuilds() {
    const changedRepos = await getChangedRepositories();
    const newBuilds = [];
    for (const repo of changedRepos) {
        const repoName = repo.name;
        const latestBuildTs = repo.deployFinishAt;
        const lastRecordedTs = await getLastBuild(repoName);
        console.log(`Checking ${repoName}, latest build at ${latestBuildTs}; last recorded ${lastRecordedTs}`);
        if (!lastRecordedTs || new Date(latestBuildTs) > new Date(lastRecordedTs)) {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', 'Develop branch push detected for repo: ' + repoName + ' - BUILD PASSED');
            const author = repo.authors.find((author) => author.latestAuthor);
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', 'Author: ' + author.authorLogin);
            console.log('\x1b[34m%s\x1b[0m', 'Develop branch commit id: ' + repo.developHash);
            recordLastBuild(repoName, latestBuildTs);
            newBuilds.push(repoName);
        }
    }
    await writePropertiesFile(newBuilds);
    return newBuilds.length > 0;
}

async function getChangedRepositories() {
    return new Promise((resolve, reject) => {
        axios.get(statusServer + 'getRepositories')
        .then(function (response) {
            resolve(response.data.filter(repo => repo.deployStatus === 'SUCCEEDED'));
        })
        .catch(function (_error) {
            console.log('Status server unavailable');
            reject();
        });
    });
}

async function getLastBuild(repo) {
    var s3ParamsRead = {
        Bucket: "e2e-ecom-build-status",
        Key: "build-ts-" + repo
    };
    return new Promise((resolve, reject) => {
        s3.getObject(s3ParamsRead, function (err, data) {
            if (err) {
                if (err.code === 'NoSuchKey') {
                    resolve(undefined);
                } else {
                    reject(err);
                }
            } else {
                resolve(data.Body.toString());
            }
        });
    });
}

async function writePropertiesFile(newBuilds) {
    const content = 'TRAVIS_REPOS=' + newBuilds.join(' & ');
    return new Promise((resolve, reject) => {
        fs.writeFile('travis_updated_repos.properties', content, 'utf8', writeError => {
            if (writeError) {
                reject(writeError);
            }
            else {
                console.log('Updated properties file with ' + content);
                resolve();
            }
        });
    });
}

async function recordLastBuild(repo, timestamp) {
    var s3ParamsWrite = {
        Bucket: "e2e-ecom-build-status",
        Key: "build-ts-" + repo,
        Body: timestamp
    };
    s3.putObject(s3ParamsWrite, function (s3UploadError, data) {
        if (s3UploadError) throw s3UploadError;
    });
}
