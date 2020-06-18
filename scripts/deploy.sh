#!/bin/bash

# change to project root
cd ${0%/*}"/.."

# Any subsequent commands which fail will cause the shell script to exit immediately
set -e

npm install
npm run build

scripts/build.sh $1
node scripts/upload-build-to-s3.js $1
