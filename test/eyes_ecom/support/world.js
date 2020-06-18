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
const selenium_webdriver_1 = require("selenium-webdriver");
const SeleniumSDK = require("@applitools/eyes-selenium");
const driverConfig_1 = require("./driverConfig");
const cucumber_1 = require("cucumber");
function CustomWorld() {
    const config = new driverConfig_1.DriverConfig();
    const { server, capabilities } = config.getDriverConfig();
    const Eyes = SeleniumSDK.Eyes;
    cucumber_1.setDefaultTimeout(60 * 1000);
    this.customerDetails = [];
    this.orderDetails = [];
    this.testEnv = config.testEnv;
    this.platform = config.platform;
    this.osName = config.osName;
    this.osVersion = config.osVersion;
    this.browserName = config.browserName;
    this.driver = new selenium_webdriver_1.Builder()
        .usingServer('http://' + server + '/wd/hub')
        .withCapabilities(capabilities)
        .build();
    this.eyes = new Eyes();
    this.finaliseVisualTest = function (testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const throwTestCompleteException = true;
            const result = yield this.eyes.close(throwTestCompleteException);
            const url = yield result._appUrls._session;
            if (yield result.isNew) {
                console.log(`Test completed: ${testName}`);
                console.log(`New Baseline Created - Applitools session URL= ${url}`);
            }
            else if ((yield result._status) === 'Passed') {
                console.log(`Test completed: ${testName}`);
                console.log(`All steps passed - Applitools session URL= ${url}`);
            }
            else {
                console.log(`Test completed: ${testName}`);
                console.log(`Test Failed - Applitools session URL= ${url}`);
            }
        });
    };
}
cucumber_1.setWorldConstructor(CustomWorld);
//# sourceMappingURL=world.js.map