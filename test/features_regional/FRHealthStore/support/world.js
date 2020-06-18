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
const config_1 = require("./config");
const cucumber_1 = require("cucumber");
const helpers_1 = require("../../../common/support/helpers");
function CustomWorld() {
    const config = new config_1.Config();
    const getDriverConfig = config.getDriverConfig();
    this.customerDetails = [];
    this.orderDetails = [];
    this.orderActivityLogText = [];
    this.orrListedOrderedIsbns = [];
    this.bundleFlag = false;
    this.testEnv = config.testEnv;
    this.driver = new selenium_webdriver_1.Builder()
        .usingServer('http://' + getDriverConfig.server + '/wd/hub')
        .withCapabilities(getDriverConfig.capabilities)
        .build();
    this.driverSleep = function (delay) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.driverSleep(this.driver, delay);
        });
    };
}
cucumber_1.setWorldConstructor(CustomWorld);
//# sourceMappingURL=world.js.map