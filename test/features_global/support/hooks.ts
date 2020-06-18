import { After, Before, HookScenarioResult } from 'cucumber';
import { DriverConfig } from './driverConfig';
import { Helpers } from '../../common/support/helpers';
import * as request from 'request';
import { AccountPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage';
import { AddressBookPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage';
import { EMailPage } from '../../common/pages/eMailPage';
import * as Imap from 'imap';
import { addresses } from '../../common/support/addressesData';
import { TestData } from './testData';
import { RenewalEventListener, TestMySQLClient } from '@elsevier/renewals-api';
import * as logger from 'bunyan';
import * as Config from 'config';

const config = new DriverConfig();
const testData = new TestData();
const accountPage = new AccountPage(testData);
const addressBookPage = new AddressBookPage(testData);
let gmail: EMailPage;

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

Before({ tags: '@email' }, async function (): Promise<void> {
    const config: Imap.Config = {
        user: 'test.elsevier.io@gmail.com',
        password: 'Sp00n123'
    };
    gmail = new EMailPage(config);
    await gmail.init();
});

Before({ tags: '@email' }, async function (): Promise<void> {
    this.gmail = gmail;
});

After({ tags: '@email' }, async function (): Promise<void> {
    gmail.close();
});

Before({ timeout: 90 * 1000 }, async function (): Promise<void> {
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

Before({ tags: '@renewals' }, async function (): Promise<void> {
    console.log('- Renewals DB initialisation BEFORE FEATURE hook');
    const log = logger.createLogger({ name: 'renewals-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
    const renewalsConfig = Config.get('databases.renewals');
    const renewalsClient = new TestMySQLClient(renewalsConfig,  new RenewalEventListener(log));
    const invoiceAndAccounts = ['5877192X', '5877193X', '5877194X', '5877195X', '5877196X', '5877197X', '5877198X', '5877199X',
        '411355-2', '411355-3', '411355-4', '411355-5', '411355-6', '411355-7', '411355-8', '411355-9'];
    for (const data of invoiceAndAccounts) {
        await renewalsClient.setUnprocessed(data);
        // await renewalsClient.setActivePrice(data);
    }
});

Before(async function (): Promise<void> {
    if ((config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') && (this.platform === 'DESKTOP')) {
        console.log('- Maximize browser window BEFORE FEATURE hook');
        if (config.browserName !== 'safari') {
            await Helpers.driverSleep(this.driver, 500);
            // await this.driver.manage().window().setPosition(0, 0); //TODO: upgrade for Selenium 4
        }
        await Helpers.driverSleep(this.driver, 500);
        await this.driver.manage().window().maximize();
    }
});

After(async function (): Promise<void> {
    console.log('- WebDriver Quit AFTER FEATURE hook');
    await this.driver.quit();
});

After({ tags: '@logOut' }, async function (): Promise<void> {
    console.log('- Account logout AFTER FEATURE hook');
    await Helpers.driverSleep(this.driver, 2 * 1000);
    await this.driver.get(testData.getUrlFor().elsevier.logout);
    console.log('-- Customer logged out');
});

After({ tags: '@renewals' }, async function (): Promise<void> {
    console.log('- Renewals DB initialisation AFTER FEATURE hook');
    const log = logger.createLogger({ name: 'renewals-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
    const renewalsConfig = Config.get('databases.renewals');
    const renewalsClient = new TestMySQLClient(renewalsConfig,  new RenewalEventListener(log));
    const invoiceAndAccounts = ['5877192X', '5877193X', '5877194X', '5877195X', '5877196X', '5877197X', '5877198X', '5877199X',
        '411355-2', '411355-3', '411355-4', '411355-5', '411355-6', '411355-7', '411355-8', '411355-9'];
    for (const data of invoiceAndAccounts) {
        await renewalsClient.setUnprocessed(data);
        // await renewalsClient.setActivePrice(data);
    }
});

After({ tags: '@SubCancel' }, async function (scenarioResult: HookScenarioResult): Promise<void> {
    if (scenarioResult.result.status === 'failed') {
        console.log(`- Subscriptions scenario failed: Order Details: ${this.orderDetails}`);
        const subOrderNumber: string = this.orderDetails.orderNumberText;
        if (subOrderNumber) {
            console.log(`- Subscriptions scenario failed: Cancelling any active subscription orders, so subsequent tests are not impacted (subOrderNumber: ${subOrderNumber})`);
            await Helpers.cancelSubscriptionOrder(subOrderNumber);
        } else {
            console.log('- Subscriptions scenario failed: Cannot determine subscription order number to cancel');
        }
    }
});

After(async function (scenarioResult: HookScenarioResult): Promise<void> {
    if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
        if (scenarioResult.result.status === 'failed') {
            console.log('- Modifying BrowserStack session result');
            const sessionData = await this.driver.session_;
            const sessionID = sessionData.id_;
            const options = {
                method: 'PUT',
                url: 'https://www.browserstack.com/automate/sessions/' + sessionID + '.json',
                form: { status: scenarioResult.result.status, reason: '' },
                headers: {
                    'cache-control': 'no-cache',
                    'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
                }
            };
            await Helpers.driverSleep(this.driver, 1000);
            await request(options, function (error, _response, _body) {
                if (error) { throw new Error(error); }
            });
        }
    }
});

After({ tags: '@resetAddresses' }, async function (): Promise<void> {
    console.log('- Reset Addresses AFTER FEATURE hook');
    await Helpers.driverSleep(this.driver, 1000);
    await addressBookPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', addressBookPage.billingAddressLabelLocator, 5000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, addressBookPage.pageTitle, 'Expected Address Book page title not found');
    const checkboxState = await (await addressBookPage.sameAddressCheckbox(this.driver)).isSelected();
    if (checkboxState === true) {
        await addressBookPage.selectSameAddressCheckbox(this.driver);
    }
    await Helpers.enterText(this.driver, addressBookPage.billingFirstNameLocator, addresses.US.billing.firstName);
    await Helpers.enterText(this.driver, addressBookPage.billingLastNameLocator, addresses.US.billing.lastName);
    await Helpers.enterText(this.driver, addressBookPage.billingAddress1Locator, addresses.US.billing.address1);
    await Helpers.enterText(this.driver, addressBookPage.billingAddress2Locator, addresses.US.billing.address2);
    await Helpers.enterText(this.driver, addressBookPage.billingCityLocator, addresses.US.billing.city);
    await addressBookPage.selectBillingCountry(this.driver, addresses.US.billing.countryShort);
    await Helpers.enterText(this.driver, addressBookPage.billingPostcodeLocator, addresses.US.billing.postcode);
    await Helpers.enterText(this.driver, addressBookPage.billingPhoneLocator, addresses.US.billing.telephone);
    await Helpers.enterText(this.driver, addressBookPage.shippingFirstNameLocator, addresses.US.shipping.firstName);
    await Helpers.enterText(this.driver, addressBookPage.shippingLastNameLocator, addresses.US.shipping.lastName);
    await Helpers.enterText(this.driver, addressBookPage.shippingAddress1Locator, addresses.US.shipping.address1);
    await Helpers.enterText(this.driver, addressBookPage.shippingAddress2Locator, addresses.US.shipping.address2);
    await Helpers.enterText(this.driver, addressBookPage.shippingCityLocator, addresses.US.shipping.city);
    await addressBookPage.selectShippingCountry(this.driver, addresses.US.shipping.countryShort);
    await Helpers.enterText(this.driver, addressBookPage.shippingPostcodeLocator, addresses.US.shipping.postcode);
    await Helpers.enterText(this.driver, addressBookPage.shippingPhoneLocator, addresses.US.shipping.telephone);
    await addressBookPage.selectBillingRegion(this.driver, addresses.US.billing.region);
    await addressBookPage.selectShippingRegion(this.driver, addresses.US.shipping.region);
    await addressBookPage.submitForm(this.driver);
    const pageTitle2 = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle2, accountPage.pageTitle, 'Expected Account page title not found');
});
