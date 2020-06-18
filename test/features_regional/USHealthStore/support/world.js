"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const config_1 = require("./config");
const cucumber_1 = require("cucumber");
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
}
cucumber_1.setWorldConstructor(CustomWorld);
//# sourceMappingURL=world.js.map