import { Builder } from 'selenium-webdriver';
import { Config } from './config';
import { setWorldConstructor } from 'cucumber';
import * as chai from 'chai';

function CustomWorld(): void {
    const config = new Config();
    const getDriverConfig = config.getDriverConfig();

    this.assert = chai.assert;
    this.expect = chai.expect;
    this.customerDetails = [];
    this.orderDetails = [];
    this.orderActivityLogText = [];
    this.orrListedOrderedIsbns = [];
    this.bundleFlag = false;

    this.testEnv = config.testEnv;

    this.driver = new Builder()
        .usingServer('http://' + getDriverConfig.server + '/wd/hub')
        .withCapabilities(getDriverConfig.capabilities)
        .build();
}

setWorldConstructor(CustomWorld);
