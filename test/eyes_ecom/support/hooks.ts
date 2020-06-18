import { After, Before } from 'cucumber';
import { DriverConfig } from './driverConfig';
// import * as SeleniumSDK from '@applitools/eyes-selenium';
import * as request from 'request';
import { Helpers } from '../../common/support/helpers';
import * as visualTestData from '../support/testData';
// import { TestData } from '../../features_global/support/testData';
// import * as logger from 'bunyan';

const config = new DriverConfig();
// const Eyes = SeleniumSDK.Eyes;
// const testData = new TestData();

Before({ timeout: 4 * 60 * 1000 }, async function (): Promise<void> {
    let delay = 0;
    let totalTime = 0;
    const browserstackTimeout = 240 * 1000;
    let browserstackReadiness: boolean = false;
    const zaleniumTimeout = 240 * 1000;
    let zaleniumReadiness: boolean = false;
    if (config.testServerURL === 'https://k8s-zalenium-grid.dev.ecommerce.elsevier.com/wd/hub') {
        console.log('- Zalenium-grid readiness check BEFORE FEATURE hook');
        const options = {
            method: 'GET',
            url: 'https://k8s-zalenium-grid.dev.ecommerce.elsevier.com/wd/hub/status'
        };
        while (!zaleniumReadiness && (totalTime < zaleniumTimeout)) {
            await request(options, async function (error, _response, body) {
                if (error) {
                    throw new Error(error);
                }
                const parsedJSON = JSON.parse(body);
                console.log('Checking for Zalenium-grid readiness. Current availability state is: ', parsedJSON.value.ready);
                zaleniumReadiness = parsedJSON.value.ready;
            });
            delay += 2 * 1000;
            await Helpers.driverSleep(this.driver, delay);
            totalTime = totalTime + delay;
        }
        if (!zaleniumReadiness) {
            throw new Error('Zalenium-grid is not available');
        } else {
            return;
        }
    } else if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
        console.log('- Browserstack-grid readiness check BEFORE FEATURE hook');
        const options = {
            method: 'GET',
            url: 'https://api-cloud.browserstack.com/automate/plan.json',
            headers: {
                'cache-control': 'no-cache',
                'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
            }
        };
        while (!browserstackReadiness && (totalTime < browserstackTimeout)) {
            await request(options, async function (error, _response, body) {
                if (error) {
                    throw new Error(error);
                }
                const parsedJSON = JSON.parse(body);
                console.log('Checking for Browserstack-grid readiness. Currently used parallel licenses: ', parsedJSON.parallel_sessions_running, '/', parsedJSON.parallel_sessions_max_allowed);
                if (parsedJSON.parallel_sessions_running < parsedJSON.parallel_sessions_max_allowed - 1) {
                    browserstackReadiness = true;
                }
            });
            delay += Math.trunc(Math.random() * 10 + 1) * 1000;
            await Helpers.driverSleep(this.driver, delay);
            totalTime = totalTime + delay;
        }
        if (!browserstackReadiness) {
            throw new Error('Browserstack-grid is not available');
        } else {
            return;
        }
    }
});

Before({ timeout: 120 * 1000 }, async function (): Promise<void> {
    if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
        console.log('- BrowserStack public session URL BEFORE FEATURE hook');
        await Helpers.driverSleep(this.driver, 1000);
        const sessionData = await this.driver.session_;
        const sessionID = sessionData.id_;
        const options = {
            method: 'GET',
            url: 'https://www.browserstack.com/automate/sessions/' + sessionID + '.json',
            headers: {
                'cache-control': 'no-cache',
                'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
            }
        };
        await Helpers.driverSleep(this.driver, 1000);
        await request(options, function (error, _response, body) {
            if (error) {
                throw new Error(error);
            }
            const parsedJSON = JSON.parse(body);
            console.log('-- Public BrowserStack session URL: ', parsedJSON.automation_session.public_url);
        });
    }
});

Before(async function (scenario): Promise<void> {
    console.log('- Making scenario tags available in World BEFORE FEATURE hook');
    this.scenarioTags = scenario.pickle.tags.map(tag => tag.name);
    console.log('-- Scenario tags: ' + this.scenarioTags.join(', '));
});

Before({ tags: '@visual_eyes' }, async function (): Promise<void> {
    if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
        console.log('- Applitools Eyes initial setup BEFORE FEATURE hook');
        if (!process.env.APPLITOOLS_API_KEY) {
            console.log('⚠️️️APPLITOOLS_API_KEY environment variable has not been set');
            process.exit(0);
        }
        await this.eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        // Set screenshot capturing strategy
        await this.eyes.setForceFullPageScreenshot(true);
        await this.eyes.setStitchMode('CSS');
        await this.eyes.setHideScrollbars(true);
        // Set match level
        // await this.eyes.setMatchLevel(SeleniumSDK.MatchSettings.MatchLevel.Strict);
        // Enable root cause analysis
        await this.eyes.setSendDom(true);
    }
});

Before({ tags: '@visual_eyes' }, async function (): Promise<void> {
    // setting viewport size for different scenarios
    if (this.platform === 'MOBILE') {
        if (this.browserName === 'android') {
            this.usedViewport = visualTestData.viewport_360x612;
        } else if (this.browserName === 'ipad') {
            this.usedViewport = visualTestData.viewport_834x1120;
        }  else if (this.browserName === 'iphone') {
            this.usedViewport = visualTestData.viewport_414x719;
        }
    } else if (this.platform === 'DESKTOP') {
        this.usedViewport = visualTestData.viewport_1200x700;
    }
});


// Before(async function (): Promise<void> {
//     if ((config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') && (this.platform === 'DESKTOP')) {
//         console.log('- Maximize browser window BEFORE FEATURE hook');
//         if (config.browserName !== 'safari') {
//             await Helpers.driverSleep(this.driver, 500);
//             await this.driver.manage().window().setPosition(0, 0);
//         }
//         await Helpers.driverSleep(this.driver, 500);
//         await this.driver.manage().window().maximize();
//     }
// });

After({ tags: '@visual_eyes' }, async function (): Promise<void> {
    console.log('- Applitools Eyes Quit AFTER FEATURE hook');
    await this.eyes.abortIfNotClosed();
});

After(async function (): Promise<void> {
    console.log('- WebDriver Quit AFTER FEATURE hook');
    await this.driver.quit();
});

// After({ tags: '@logOut' }, async function (): Promise<void> {
//     console.log('- Account logout AFTER FEATURE hook');
//     await Helpers.driverSleep(this.driver, 2 * 1000);
//     await this.driver.get(testData.getUrlFor().elsevier.logout);
//     console.log('-- Customer logged out');
// });

// After(async function (scenarioResult: HookScenarioResult): Promise<void> {
//     if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
//         if (scenarioResult.result.status === 'failed') {
//             console.log('- Modifying BrowserStack session result');
//             const sessionData = await this.driver.session_;
//             const sessionID = sessionData.id_;
//             const options = {
//                 method: 'PUT',
//                 url: 'https://www.browserstack.com/automate/sessions/' + sessionID + '.json',
//                 form: { status: scenarioResult.result.status, reason: '' },
//                 headers: {
//                     'cache-control': 'no-cache',
//                     'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
//                 }
//             };
//             await Helpers.driverSleep(this.driver, 1000);
//             await request(options, function (error, _response, _body) {
//                 if (error) { throw new Error(error); }
//             });
//         }
//     }
// });
