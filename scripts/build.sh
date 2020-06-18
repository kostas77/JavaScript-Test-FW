#!/bin/bash
#
# This script builds a deployment artifact for a specific env.
# It takes the env name as the only param.
#
# Usage: `./scripts/build.sh dev`
#

DEPLOY_ENV=${1}

rm -rf deploy/${DEPLOY_ENV}
rm -rf build
mkdir -p build/scripts
mkdir -p deploy/${DEPLOY_ENV}

#Exit immediately if anything returns a non-zero status
set -e

DEPLOY_ENV=${1}
BRANCH=${TRAVIS_BRANCH:=null}

rsync -avm --delete --exclude-from=scripts/.rsync-exclude . build

cd build
#Makes builds go faster...https://github.com/npm/npm/issues/11283#issuecomment-175246823
npm set progress=false
npm install --production

BUILDSTAMP=$(date +%Y%m%d-%H%M%S)
tar -czf ../deploy/${DEPLOY_ENV}/end-to-end-tests-build-${BUILDSTAMP}.tar.gz .

# Create a copy of the application tar called 'latest'
# This is useful in environments where we don't necessarily know the name of the most recent build, e.g. CodeDeploy triggered by Travis
cp ../deploy/${DEPLOY_ENV}/end-to-end-tests-build-${BUILDSTAMP}.tar.gz ../deploy/${DEPLOY_ENV}/end-to-end-tests-build-latest.tar.gz

cd ..
rm -rf build
