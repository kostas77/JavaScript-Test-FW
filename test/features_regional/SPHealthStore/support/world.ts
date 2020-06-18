import { Builder } from 'selenium-webdriver';
import { Config } from './config';
import { setWorldConstructor } from 'cucumber';
import { Helpers } from '../../../common/support/helpers';
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

    // every call to this function should be replace by `Helpers.driverSleep` in future
    this.driverSleep = async function (delay: number) {
        return await Helpers.driverSleep(this.driver, delay);
    };
}

setWorldConstructor(CustomWorld);
