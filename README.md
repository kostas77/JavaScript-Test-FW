# End to End Tests

## Installation

    git clone git@github.com:elsevier-io/end-to-end-tests.git
    cd end-to-end-tests
    
> You'll need to ensure node version is ~12. You can run command: node --version to find out.
> If you have different node version then run following command to use v12
    
    nvm use 12
    npm install
    npm run build

## Running the E2E tests using Browserstack

More info about `BrowserStackLocal` can be found here:
https://www.browserstack.com/local-testing

Installation of `BrowserStackLocal` app on your Mac:

    curl -O https://www.browserstack.com/browserstack-local/BrowserStackLocal-darwin-x64.zip
    unzip BrowserStackLocal-darwin-x64.zip
    rm BrowserStackLocal-darwin-x64.zip
    mv BrowserStackLocal /usr/local/bin/BrowserStackLocal

> You can get a <browserstack_key> by copying the values form the non-prod secret manager, copy one of the `local/browserstack/credential` or
> by logging into the BrowserStack account you have access to and 
> copying the values [from the _Settings_ page](https://www.browserstack.com/accounts/settings).
> Speak to folk on the eCommerce team for the BrowserStack account login details or look in secret manager.

> Coordinate with folk to not use the same credential at the same time, it doesn't work, and you would disconnect the person using them.

Set the following environment variables in your `~/.bash_profile` file and `source` it.

    export BROWSERSTACK_USERNAME=<browserstack_username>
    export BROWSERSTACK_ACCESS_KEY=<browserstack_key>

> You'll need to `source` the file in order for those environment variables to
> be picked up in existing shells.
>
    source ~/.bash_profile

In case you are working with ZSH, then you might need to add following environment variables in your `~/.zshrc` file and `source` it.

    export BROWSERSTACK_USERNAME=<browserstack_username>
    export BROWSERSTACK_ACCESS_KEY=<browserstack_key>

> You'll need to `source` the file in order for those environment variables to
> be picked up in existing shells.
>
    source ~/.zshrc

Run the `BrowserStackLocal` app in a terminal:

    BrowserStackLocal --key $BROWSERSTACK_ACCESS_KEY --force-local

Start the end-to-end tests in another terminal (for e.g.):

    NODE_ENV=staging npm run test:E2E:ELCM

## Running the E2E tests locally using Selenium Docker containers (only Chrome and Firefox browsers supported currently)

> [Install Docker](https://docs.docker.com/install/)

> Go to the `end-to-end-tests` directory and execute the docker compose configuration file:

    cd ./end-to-end-tests
    docker-compose up -d

> Once docker command is complete you can view the running docker process for chrome & firefox using this command:

    docker ps

> If you want to interact with docker container via command line then you can using following command:

    docker exec -it “container id” /bin/bash
    ('container id' can be known from 'docker ps' command) 

> If you want to interact with docker container via UI then you can do following:

1. Download and install VNC viewer https://www.realvnc.com/en/connect/download/viewer/

2. Launch VNC viewer and open container using PORTS info as available from 'docker ps' command.
e.g. 0.0.0.0:32794 and enter the password `secret` when prompted. You can always launch both Chrome & Firefox 
containers together, if you want.

> Execute tests in your local docker container
>
> Run the appropriate test command in another terminal (ensure you update the script in packages.json accordingly)
> Following is a e.g. that would run test on docker instance with tests tagged as e.g. 
>
> To run test in chrome (Note: script 'test:staging:docker_chrome' is in packages.json, so you have to update this 
> script if need to run different tests with different tags.)
    
    npm run test:staging:docker_chrome

> To run test in firefox (Note: script 'test:staging:docker_firefox' is in packages.json, so you have to update this 
> script if need to run different tests with different tags.)

    npm run test:staging:docker_firefox

> When you finish with your testing shut down the Docker instances:

    docker-compose down

> If your docker instances does not go down, then you can kill these running instances using this command:

    docker kill $(docker ps -q);

## Running the E2E tests locally for renewals on docker instances
> Start the docker environment. This will spin up Mysql container with local renewal database dump with test data.

    cd ./end-to-end-tests
    docker-compose up -d

> From command line you can now trigger the tests

    npm run test:localhost:renewals:docker_chrome
    npm run test:localhost:renewals:docker_firefox

## Running the E2E tests locally using chromedriver
#### Setup

1) Install [Chrome](https://www.google.com/chrome/)

2) Install [https://www.npmjs.com/package/chromedriver](https://www.npmjs.com/package/chromedriver)

    npm install -g chromedriver

#### Usage

1) In a separate terminal run 
`chromedriver --port=3100 --url-base=/wd/hub`

2) Go to the directory containing the end-to-end project.

3) Run a test against the `dev` environment:

   folder_tag=USHealthStore test_tag=multiProductPurchase npm run test:E2E:RegionalHS:dev:local

**folder_tag:**

> This is only applicable to the Regional-Stores E2E tests.

This tag describes the directory where the tests are stored in the end-to-end
project. Set it to the name of the directory that contains the features to be
tested: the directories are in `test/features_regional`.

For example, `USHealthStore`, `FRHealthStore`, `MXHealthStore`, etc.

**test_tag:**

This tag describes the Gherkin tag that decorates some scenarios. Only those
scenarios that have the named tag will be run.

For example, `@FRHealthStore`, `@vitalSourceEBookPurchase`, `@paypalPurchase`, etc.
This tag should be added without the `@`

# ORR Flow tests information

These are a set of tests designed to test just ORR end-to-end (they construct an order manually and pass it in to the submit API, then check via the internal API that the various required parts of ORR respond as expected).

## Running the ORR Flow tests locally

Copy `config/locahost.json` to `config/local.json` and adjust the env in the two URLs as required.

Run the tests via the `npm run test:ORR` command. If you want to run a subset of tests, you can run `npm run test:ORR -- -t <tag>` where `<tag>` is whichever tag in the feature files you want (i.e. `@orrflow` for all flow tests).

# ISSUES

## GMAIL Hook

Error: "self signed certificate" was encountered when running E2E tests with Docker and command similar to `folder_tag=MEAHealthStore test_tag=dvd  NODE_ENV=staging npm run test:E2E:RegionalHS:docker_chrome`.

Node issue https://github.com/nodejs/help/issues/1974 provides some background and rolling back to use Node 11 resolved the issue.

    1) Scenario: Purchasing multiple products from the german store with paypal # test/features_regional/DEHealthStore/productPurchase.feature:25
    ✖ Before # test/common/support/gmailHook.js:16
        Error: self signed certificate
            at TLSSocket.onConnectSecure (_tls_wrap.js:1473:34)
            at TLSSocket.emit (events.js:321:20)

Solution: `NVM USE 11`

## CK Subscription Cancellation

Occasionally, the cancellation of the CK subscriptions in the corresponding E2E tests might fail, which will result in active CK subscriptions for the respective E2E test accounts.

This means that any subsequent tests for that OS/Browser combination will fail. One way to fix this, is to manually find and cancel the CK subscriptions in the oberon/elsio staging database using the following two SQL scripts:

Find active CK Subscriptions for E2E tests accounts:

```sql
select s.id, s.webUserId, o.customerEmail, o.elsevierOrderNo
from elsio.subscriptions s
left join elsio.orders o on s.elsevierOrderNo = o.elsevierOrderNo
where s.isActive = 1
  and s.status = 'ACTIVE'
  and customerEmail like 'test.elsevier.io%';
```

Cancel active CK Subscriptions for E2E tests accounts:

```sql
Start transaction;
SET SQL_SAFE_UPDATES = 0;
update elsio.subscriptions s
left join elsio.orders o on s.elsevierOrderNo = o.elsevierOrderNo
set s.isActive = 0, s.status = 'CANCELLED'
where s.isActive = 1
  and s.status = 'ACTIVE'
  and customerEmail like 'test.elsevier.io%';
SET SQL_SAFE_UPDATES = 1;
commit;
```

# A useful VS code debug configuration for running the tests locally with Browserstack (in this case running with the @SubsE2E tag)
```
{
            // Name of configuration; appears in the launch configuration drop down menu.
            "name": "E2E Tests",
            // Type of configuration. Possible values: "node", "mono".
            "type": "node",
            "request": "launch",
            "console": "internalConsole",
            // Workspace relative or absolute path to the program.
            "program": "${workspaceFolder}/node_modules/cucumber/bin/cucumber-js",
            // Automatically stop program after launch.
            "stopOnEntry": false,
            // Command line arguments passed to the program.
            "args": [
                "./test/features_global/",
                "--tags",
                "@SubsE2E"
            ],
            // Workspace relative or absolute path to the working directory of the program being debugged. Default is the current workspace.
            "cwd": "${workspaceFolder}/.",
            // Workspace relative or absolute path to the runtime executable to be used. Default is the runtime executable on the PATH.
            "runtimeExecutable": null,
            // Optional arguments passed to the runtime executable.
            "runtimeArgs": [
                "--nolazy"
            ],
            // Environment variables passed to the program.
            "env": {
                "NODE_ENV": "staging",
                "PLATFORM": "DESKTOP",
                "SELENIUM_REMOTE_URL": "http://hub-cloud.browserstack.com/wd/hub",
                "SELENIUM_BROWSER": "Chrome::WIN",
                "OSversion": "7",
                "BROWSERversion": "75",
                "BROWSERSTACK_USERNAME": "<user name><",
                "BROWSERSTACK_ACCESS_KEY": "<key>",
                "test_tag": "SubsE2E"
            },
            // Use JavaScript source maps (if they exist).
            "sourceMaps": true,
            // If JavaScript source maps are enabled, the generated code is expected in this directory.
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ]
        }
    ```
