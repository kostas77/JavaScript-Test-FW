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
const helpers_1 = require("./helpers");
const config_1 = require("../../features_regional/USHealthStore/support/config");
const request = require("request");
function CommonHook() {
    cucumber_1.Before({ timeout: 90 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('- WebDriver BrowserStack session URL BEFORE FEATURE hook');
            yield helpers_1.Helpers.driverSleep(this.driver, 1000);
            const sessionData = yield this.driver.session_;
            const sessionID = sessionData.id_;
            const config = new config_1.Config();
            const getDriverConfig = config.getDriverConfig();
            if (getDriverConfig.server.includes('browserstack')) {
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
                    console.log('Public session URL: ', parsedJSON.automation_session.public_url);
                });
            }
        });
    });
    cucumber_1.Before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.platform === 'DESKTOP') {
                console.log('- Maximize Window BEFORE FEATURE hook');
                yield helpers_1.Helpers.driverSleep(this.driver, 1000);
                yield this.driver.manage().window().maximize();
            }
        });
    });
    cucumber_1.After(function (scenarioResult) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(process.env.DEBUG_STAY_OPEN === 'TRUE' && scenarioResult.result.status === 'failed')) {
                console.log('- WebDriver Quit AFTER FEATURE hook');
                yield this.driver.quit();
            }
        });
    });
}
exports.CommonHook = CommonHook;
//# sourceMappingURL=commonHook.js.map