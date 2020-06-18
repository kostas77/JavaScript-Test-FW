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
const cucumber_1 = require("cucumber");
const driverConfig_1 = require("./driverConfig");
const request = require("request");
const helpers_1 = require("../../common/support/helpers");
const visualTestData = require("../support/testData");
const config = new driverConfig_1.DriverConfig();
cucumber_1.Before({ timeout: 4 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        let delay = 0;
        let totalTime = 0;
        const browserstackTimeout = 240 * 1000;
        let browserstackReadiness = false;
        const zaleniumTimeout = 240 * 1000;
        let zaleniumReadiness = false;
        if (config.testServerURL === 'https://k8s-zalenium-grid.dev.ecommerce.elsevier.com/wd/hub') {
            console.log('- Zalenium-grid readiness check BEFORE FEATURE hook');
            const options = {
                method: 'GET',
                url: 'https://k8s-zalenium-grid.dev.ecommerce.elsevier.com/wd/hub/status'
            };
            while (!zaleniumReadiness && (totalTime < zaleniumTimeout)) {
                yield request(options, function (error, _response, body) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            throw new Error(error);
                        }
                        const parsedJSON = JSON.parse(body);
                        console.log('Checking for Zalenium-grid readiness. Current availability state is: ', parsedJSON.value.ready);
                        zaleniumReadiness = parsedJSON.value.ready;
                    });
                });
                delay += 2 * 1000;
                yield helpers_1.Helpers.driverSleep(this.driver, delay);
                totalTime = totalTime + delay;
            }
            if (!zaleniumReadiness) {
                throw new Error('Zalenium-grid is not available');
            }
            else {
                return;
            }
        }
        else if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
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
                yield request(options, function (error, _response, body) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            throw new Error(error);
                        }
                        const parsedJSON = JSON.parse(body);
                        console.log('Checking for Browserstack-grid readiness. Currently used parallel licenses: ', parsedJSON.parallel_sessions_running, '/', parsedJSON.parallel_sessions_max_allowed);
                        if (parsedJSON.parallel_sessions_running < parsedJSON.parallel_sessions_max_allowed - 1) {
                            browserstackReadiness = true;
                        }
                    });
                });
                delay += Math.trunc(Math.random() * 10 + 1) * 1000;
                yield helpers_1.Helpers.driverSleep(this.driver, delay);
                totalTime = totalTime + delay;
            }
            if (!browserstackReadiness) {
                throw new Error('Browserstack-grid is not available');
            }
            else {
                return;
            }
        }
    });
});
cucumber_1.Before({ timeout: 120 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
            console.log('- BrowserStack public session URL BEFORE FEATURE hook');
            yield helpers_1.Helpers.driverSleep(this.driver, 1000);
            const sessionData = yield this.driver.session_;
            const sessionID = sessionData.id_;
            const options = {
                method: 'GET',
                url: 'https://www.browserstack.com/automate/sessions/' + sessionID + '.json',
                headers: {
                    'cache-control': 'no-cache',
                    'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
                }
            };
            yield helpers_1.Helpers.driverSleep(this.driver, 1000);
            yield request(options, function (error, _response, body) {
                if (error) {
                    throw new Error(error);
                }
                const parsedJSON = JSON.parse(body);
                console.log('-- Public BrowserStack session URL: ', parsedJSON.automation_session.public_url);
            });
        }
    });
});
cucumber_1.Before(function (scenario) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Making scenario tags available in World BEFORE FEATURE hook');
        this.scenarioTags = scenario.pickle.tags.map(tag => tag.name);
        console.log('-- Scenario tags: ' + this.scenarioTags.join(', '));
    });
});
cucumber_1.Before({ tags: '@visual_eyes' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
            console.log('- Applitools Eyes initial setup BEFORE FEATURE hook');
            if (!process.env.APPLITOOLS_API_KEY) {
                console.log('⚠️️️APPLITOOLS_API_KEY environment variable has not been set');
                process.exit(0);
            }
            yield this.eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
            yield this.eyes.setForceFullPageScreenshot(true);
            yield this.eyes.setStitchMode('CSS');
            yield this.eyes.setHideScrollbars(true);
            yield this.eyes.setSendDom(true);
        }
    });
});
cucumber_1.Before({ tags: '@visual_eyes' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.platform === 'MOBILE') {
            if (this.browserName === 'android') {
                this.usedViewport = visualTestData.viewport_360x612;
            }
            else if (this.browserName === 'ipad') {
                this.usedViewport = visualTestData.viewport_834x1120;
            }
            else if (this.browserName === 'iphone') {
                this.usedViewport = visualTestData.viewport_414x719;
            }
        }
        else if (this.platform === 'DESKTOP') {
            this.usedViewport = visualTestData.viewport_1200x700;
        }
    });
});
cucumber_1.After({ tags: '@visual_eyes' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Applitools Eyes Quit AFTER FEATURE hook');
        yield this.eyes.abortIfNotClosed();
    });
});
cucumber_1.After(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- WebDriver Quit AFTER FEATURE hook');
        yield this.driver.quit();
    });
});
//# sourceMappingURL=hooks.js.map