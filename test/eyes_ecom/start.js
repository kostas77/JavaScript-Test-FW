"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const driverConfig_1 = require("../features_global/support/driverConfig");
const SeleniumSDK = require("eyes.selenium");
const testData = require("./testData");
const config = new driverConfig_1.DriverConfig();
const { server, capabilities } = config.getDriverConfig();
const Eyes = SeleniumSDK.Eyes;
if (!process.env.APPLITOOLS_API_KEY) {
    console.log(`
     ⚠️️️  Please set the APPLITOOLS_API_KEY environment variable
        * On Mac: export APPLITOOLS_API_KEY='YOUR_API_KEY'
        * On windows: set APPLITOOLS_API_KEY='YOUR_API_KEY'
        * Please Note: You can get your API key by logging into applitools.com | Click on the person icon (top-right corner) | Click on the "My API key" menu
    `);
    process.exit(0);
}
testData.testData.forEach((test) => __awaiter(this, void 0, void 0, function* () {
    const driver = new selenium_webdriver_1.Builder()
        .usingServer('http://' + server + '/wd/hub')
        .withCapabilities(capabilities)
        .build();
    const eyes = new Eyes();
    yield eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    yield eyes.setForceFullPageScreenshot(true);
    yield eyes.setMatchLevel(SeleniumSDK.MatchSettings.MatchLevel.Strict);
    yield eyes.setStitchMode(Eyes.StitchMode.CSS);
    yield eyes.setHideScrollbars(true);
    if (config.platform === 'MOBILE') {
        if (config.browserName === 'android') {
            this.usedViewport = testData.viewport_360x612;
        }
        else if (config.browserName === 'ipad') {
            this.usedViewport = testData.viewport_834x1120;
        }
        else if (config.browserName === 'iphone') {
            this.usedViewport = testData.viewport_414x719;
        }
    }
    else if (config.platform === 'DESKTOP') {
        this.usedViewport = testData.viewport_1200x700;
    }
    try {
        const testName = `${test.testNamePrefix}:${config.osName}_${config.osVersion}-${config.browserName}`;
        console.log('Running test: ', testName);
        const appName = `${test.appNamePrefix}`;
        console.log('App name:', appName);
        console.log('Test page URL:', test.url);
        const windowName = `${test.url} @ Viewport: ${this.usedViewport}`;
        console.log(`Window name: ${windowName}`);
        console.log('Viewport:', this.usedViewport);
        yield eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield eyes.open(driver, appName, testName, this.usedViewport);
        yield driver.get(test.url);
        yield eyes.checkWindow(windowName);
        const throwTestCompleteException = true;
        const result = yield eyes.close(throwTestCompleteException);
        const url = yield result.appUrls.session;
        if (yield result.isNew) {
            console.log(`Test completed: ${testName}`);
            console.log(`New Baseline Created: URL= ${url}`);
        }
        else if ((yield result.status) === 'Passed') {
            console.log(`Test completed: ${testName}`);
            console.log(`All steps passed:     URL= ${url}`);
        }
        else {
            console.log(`Test completed: ${testName}`);
            console.log(`Test Failed:          URL= ${url}`);
        }
    }
    finally {
        yield driver.quit();
        yield eyes.abortIfNotClosed();
    }
}));
//# sourceMappingURL=start.js.map