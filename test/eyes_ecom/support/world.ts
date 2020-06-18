import { Builder } from 'selenium-webdriver';
import * as SeleniumSDK from '@applitools/eyes-selenium';
import { DriverConfig } from './driverConfig';
import { setDefaultTimeout, setWorldConstructor } from 'cucumber';

function CustomWorld(): void {
    const config = new DriverConfig();
    const { server, capabilities } = config.getDriverConfig();
    const Eyes = SeleniumSDK.Eyes;

    setDefaultTimeout(60 * 1000);

    this.customerDetails = []; // Used to record current customer details during sign-in step.
    this.orderDetails = []; // Used to record new order details so can validate against ORR and order xml
    this.testEnv = config.testEnv;
    this.platform = config.platform;
    this.osName = config.osName;
    this.osVersion = config.osVersion;
    this.browserName = config.browserName;

    // // Open a local Chrome browser.
    // this.driver = new Builder()
    //     .withCapabilities(Capabilities.chrome())
    //     .build();

    this.driver = new Builder()
        .usingServer('http://' + server + '/wd/hub')
        .withCapabilities(capabilities)
        .build();

    // Initialize the eyes SDK and set your private API key.
    this.eyes = new Eyes();

    this.finaliseVisualTest = async function(testName: string): Promise<void> {
        const throwTestCompleteException = true;
        const result = await this.eyes.close(throwTestCompleteException);
        const url = await result._appUrls._session;
        if (await result.isNew) {
            console.log(`Test completed: ${testName}`);
            console.log(`New Baseline Created - Applitools session URL= ${url}`);
        } else if (await result._status === 'Passed') {
            console.log(`Test completed: ${testName}`);
            console.log(`All steps passed - Applitools session URL= ${url}`);
        } else {
            console.log(`Test completed: ${testName}`);
            console.log(`Test Failed - Applitools session URL= ${url}`);
        }
    };

}

setWorldConstructor(CustomWorld);
