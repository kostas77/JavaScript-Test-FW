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
const helpers_1 = require("../../common/support/helpers");
const request = require("request");
const accountPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage");
const addressBookPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage");
const eMailPage_1 = require("../../common/pages/eMailPage");
const addressesData_1 = require("../../common/support/addressesData");
const testData_1 = require("./testData");
const renewals_api_1 = require("@elsevier/renewals-api");
const logger = require("bunyan");
const config = new driverConfig_1.DriverConfig();
const testData = new testData_1.TestData();
const accountPage = new accountPage_1.AccountPage(testData);
const addressBookPage = new addressBookPage_1.AddressBookPage(testData);
let gmail;
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
cucumber_1.Before({ tags: '@email' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            user: 'test.elsevier.io@gmail.com',
            password: 'Sp00n123'
        };
        gmail = new eMailPage_1.EMailPage(config);
        yield gmail.init();
    });
});
cucumber_1.Before({ tags: '@email' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.gmail = gmail;
    });
});
cucumber_1.After({ tags: '@email' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        gmail.close();
    });
});
cucumber_1.Before({ timeout: 90 * 1000 }, function () {
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
cucumber_1.Before({ tags: '@renewals' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Renewals DB initialisation BEFORE FEATURE hook');
        const log = logger.createLogger({ name: 'renewals-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
        const renewalsConfig = {
            host: 'renewals-db.elsevier.internal',
            username: 'admin',
            password: 'this-is-a-password'
        };
        const renewalsClient = new renewals_api_1.TestMySQLClient(renewalsConfig, new renewals_api_1.RenewalEventListener(log));
        yield renewalsClient.setUnprocessed('5877192X');
        yield renewalsClient.setUnprocessed('5877193X');
        yield renewalsClient.setUnprocessed('5877194X');
        yield renewalsClient.setUnprocessed('5877195X');
        yield renewalsClient.setUnprocessed('5877196X');
        yield renewalsClient.setUnprocessed('5877197X');
        yield renewalsClient.setUnprocessed('5877198X');
        yield renewalsClient.setUnprocessed('5877199X');
        yield renewalsClient.setUnprocessed('411355-2');
        yield renewalsClient.setUnprocessed('411355-3');
        yield renewalsClient.setUnprocessed('411355-4');
        yield renewalsClient.setUnprocessed('411355-5');
        yield renewalsClient.setUnprocessed('411355-6');
        yield renewalsClient.setUnprocessed('411355-7');
        yield renewalsClient.setUnprocessed('411355-8');
        yield renewalsClient.setUnprocessed('411355-9');
    });
});
cucumber_1.Before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        if ((config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') && (this.platform === 'DESKTOP')) {
            console.log('- Maximize browser window BEFORE FEATURE hook');
            if (config.browserName !== 'safari') {
                yield helpers_1.Helpers.driverSleep(this.driver, 500);
            }
            yield helpers_1.Helpers.driverSleep(this.driver, 500);
            yield this.driver.manage().window().maximize();
        }
    });
});
cucumber_1.After(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- WebDriver Quit AFTER FEATURE hook');
        yield this.driver.quit();
    });
});
cucumber_1.After({ tags: '@logOut' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Account logout AFTER FEATURE hook');
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
        yield this.driver.get(testData.getUrlFor().elsevier.logout);
        console.log('-- Customer logged out');
    });
});
cucumber_1.After({ tags: '@renewals' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Renewals DB initialisation AFTER FEATURE hook');
        const log = logger.createLogger({ name: 'renewals-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
        const renewalsConfig = {
            host: 'renewals-db.elsevier.internal',
            username: 'admin',
            password: 'this-is-a-password'
        };
        const renewalsClient = new renewals_api_1.TestMySQLClient(renewalsConfig, new renewals_api_1.RenewalEventListener(log));
        yield renewalsClient.setUnprocessed('5877192X');
        yield renewalsClient.setUnprocessed('5877193X');
        yield renewalsClient.setUnprocessed('5877194X');
        yield renewalsClient.setUnprocessed('5877195X');
        yield renewalsClient.setUnprocessed('5877196X');
        yield renewalsClient.setUnprocessed('5877197X');
        yield renewalsClient.setUnprocessed('5877198X');
        yield renewalsClient.setUnprocessed('5877199X');
        yield renewalsClient.setUnprocessed('411355-2');
        yield renewalsClient.setUnprocessed('411355-3');
        yield renewalsClient.setUnprocessed('411355-4');
        yield renewalsClient.setUnprocessed('411355-5');
        yield renewalsClient.setUnprocessed('411355-6');
        yield renewalsClient.setUnprocessed('411355-7');
        yield renewalsClient.setUnprocessed('411355-8');
        yield renewalsClient.setUnprocessed('411355-9');
    });
});
cucumber_1.After({ tags: '@SubCancel' }, function (scenarioResult) {
    return __awaiter(this, void 0, void 0, function* () {
        if (scenarioResult.result.status === 'failed') {
            console.log(`- Subscriptions scenario failed: Order Details: ${this.orderDetails}`);
            const subOrderNumber = this.orderDetails.orderNumberText;
            if (subOrderNumber) {
                console.log(`- Subscriptions scenario failed: Cancelling any active subscription orders, so subsequent tests are not impacted (subOrderNumber: ${subOrderNumber})`);
                yield helpers_1.Helpers.cancelSubscriptionOrder(subOrderNumber);
            }
            else {
                console.log('- Subscriptions scenario failed: Cannot determine subscription order number to cancel');
            }
        }
    });
});
cucumber_1.After(function (scenarioResult) {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.testServerURL === 'http://hub-cloud.browserstack.com/wd/hub') {
            if (scenarioResult.result.status === 'failed') {
                console.log('- Modifying BrowserStack session result');
                const sessionData = yield this.driver.session_;
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
                yield helpers_1.Helpers.driverSleep(this.driver, 1000);
                yield request(options, function (error, _response, _body) {
                    if (error) {
                        throw new Error(error);
                    }
                });
            }
        }
    });
});
cucumber_1.After({ tags: '@resetAddresses' }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Reset Addresses AFTER FEATURE hook');
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield addressBookPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', addressBookPage.billingAddressLabelLocator, 5000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, addressBookPage.pageTitle, 'Expected Address Book page title not found');
        const checkboxState = yield (yield addressBookPage.sameAddressCheckbox(this.driver)).isSelected();
        if (checkboxState === true) {
            yield addressBookPage.selectSameAddressCheckbox(this.driver);
        }
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingFirstNameLocator, addressesData_1.addresses.US.billing.firstName);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingLastNameLocator, addressesData_1.addresses.US.billing.lastName);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingAddress1Locator, addressesData_1.addresses.US.billing.address1);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingAddress2Locator, addressesData_1.addresses.US.billing.address2);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingCityLocator, addressesData_1.addresses.US.billing.city);
        yield addressBookPage.selectBillingCountry(this.driver, addressesData_1.addresses.US.billing.countryShort);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingPostcodeLocator, addressesData_1.addresses.US.billing.postcode);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingPhoneLocator, addressesData_1.addresses.US.billing.telephone);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingFirstNameLocator, addressesData_1.addresses.US.shipping.firstName);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingLastNameLocator, addressesData_1.addresses.US.shipping.lastName);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingAddress1Locator, addressesData_1.addresses.US.shipping.address1);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingAddress2Locator, addressesData_1.addresses.US.shipping.address2);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingCityLocator, addressesData_1.addresses.US.shipping.city);
        yield addressBookPage.selectShippingCountry(this.driver, addressesData_1.addresses.US.shipping.countryShort);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingPostcodeLocator, addressesData_1.addresses.US.shipping.postcode);
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.shippingPhoneLocator, addressesData_1.addresses.US.shipping.telephone);
        yield addressBookPage.selectBillingRegion(this.driver, addressesData_1.addresses.US.billing.region);
        yield addressBookPage.selectShippingRegion(this.driver, addressesData_1.addresses.US.shipping.region);
        yield addressBookPage.submitForm(this.driver);
        const pageTitle2 = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle2, accountPage.pageTitle, 'Expected Account page title not found');
    });
});
//# sourceMappingURL=hooks.js.map