"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const config = require("config");
const _ = require("lodash");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const capabilitiesDict = {
        'browserstack.local': 'true',
        'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
        'browserstack.debug': 'true',
        'browserstack.console': 'verbose',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        'project': process.env.test_tag,
        'build': (process.env.TRAVIS_REPOS) ? `Updated Repos: ${process.env.TRAVIS_REPOS}` : 'Manual Trigger of E2E tests',
        'name': (process.env.JOB_NAME && process.env.BUILD_ID) ? `Jenkins job: ${process.env.JOB_NAME} - Jenkins BuildID: ${process.env.BUILD_ID}` : 'Manual Trigger of E2E tests'
    };
    const choices = config.get('combinations');
    const browsers = config.get('browsers');
    let platform;
    const os = yield inquirer.prompt([
        {
            type: 'list',
            name: 'os',
            message: 'Select os',
            choices,
            filter: (ans) => {
                if (['ios', 'android'].indexOf(ans) !== -1) {
                    platform = 'mobile';
                }
                else if (ans === 'local') {
                    platform = 'desktop_local';
                }
                else {
                    platform = 'desktop';
                }
                return ans;
            }
        },
        {
            type: 'list',
            name: 'os_version',
            message: 'Select os version',
            choices: (ans) => _.find(choices, { value: ans.os }).versions
        }
    ]);
    const browser = yield inquirer.prompt([
        {
            type: 'list',
            name: 'browser',
            message: 'Select browser',
            choices: () => {
                const validBrowsers = _.find(choices, { value: os.os }).browsers;
                return browsers.filter(b => validBrowsers.indexOf(b.name) !== -1);
            }
        }
    ]);
    const suite = yield inquirer.prompt([
        {
            type: 'list',
            name: 'path',
            message: 'Select test suite to run',
            choices: fs_1.readdirSync(__dirname + '/../test')
                .filter(f => fs_1.statSync(path_1.join(__dirname, '..', 'test', f)).isDirectory())
                .map(e => ({
                name: e.replace(/_/g, ' '),
                value: path_1.join(__dirname, '..', 'test', e)
            }))
        }
    ]);
    const featureSuite = path_1.basename(suite.path) === 'features';
    let grepRegExp = '@[a-zA-Z0-9]*';
    if (featureSuite) {
        grepRegExp += 'E2E';
    }
    const grepedTags = child_process_1.execSync(`grep -ho -e "${grepRegExp}" ${path_1.join(suite.path, '**/*.feature')}`);
    const tagChoices = _.uniq(grepedTags.toString().split('\n'))
        .filter(e => e.length)
        .sort()
        .map(e => ({ name: e, value: e }));
    const tags = yield inquirer.prompt([
        {
            type: 'list',
            name: 'selected',
            message: 'Select tag to run',
            choices: tagChoices
        }
    ]);
    const suiteConfig = Object.assign(Object.assign(Object.assign({}, capabilitiesDict), os), browser.browser);
    console.log(`\nRunning tests with the following config:\n${JSON.stringify(suiteConfig, null, 2)}\n`);
    process.env.SUITE_CONFIG = JSON.stringify(suiteConfig);
    process.env.test_tag = tags.selected.slice(1);
    const args = ['run', `test:${platform}`, '--', `${suite.path}`];
    args.push('--tags');
    if (tags.selected.length) {
        args.push(`${tags.selected} and not @wip`);
    }
    else {
        args.push('not @wip');
    }
    const child = child_process_1.spawn('npm', args, {
        cwd: process.cwd(),
        env: process.env
    });
    child.stdout.on('data', data => console.log(`${data}`));
    child.stderr.on('data', data => console.error(`${data}`));
});
main();
//# sourceMappingURL=setup.js.map