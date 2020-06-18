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
const helpers_1 = require("../../common/support/helpers");
const authorisationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage");
const accountPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage");
const addressBookPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const checkoutPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const authorisationPage = new authorisationPage_1.AuthorisationPage(testData);
const accountPage = new accountPage_1.AccountPage(testData);
const addressBookPage = new addressBookPage_1.AddressBookPage(testData);
const cartPage = new cartPage_1.CartPage(testData);
const checkoutPage = new checkoutPage_1.CheckoutPage();
let addressList = [];
cucumber_1.Given(/^I have a single New York address defined for my account$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        let pageTitle;
        yield authorisationPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', authorisationPage.termsLocator, 10 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
        yield authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', accountPage.contactInformationHeaderLocator, 20 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
        yield accountPage.selectEditAddressesLink(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', addressBookPage.billingAddressLabelLocator, 20 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, addressBookPage.pageTitle, 'Expected Address Book page title not found');
        const sameAddressCheckbox = yield addressBookPage.sameAddressCheckbox(this.driver);
        const checkboxState = yield sameAddressCheckbox.isSelected();
        if (checkboxState === false) {
            yield addressBookPage.selectSameAddressCheckbox(this.driver);
        }
        yield addressBookPage.selectBillingCountry(this.driver, 'US');
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingCityLocator, 'New York');
        yield addressBookPage.selectBillingRegion(this.driver, 'New York');
        yield helpers_1.Helpers.enterText(this.driver, addressBookPage.billingPostcodeLocator, '10007');
        yield addressBookPage.submitForm(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', accountPage.contactInformationHeaderLocator, 20 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
    });
});
cucumber_1.Given(/^My cart is empty$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
cucumber_1.When(/^I change my address details to the following in turn:$/, function (addresses) {
    return __awaiter(this, void 0, void 0, function* () {
        addressList = addresses.rows();
        for (const row in addressList) {
            yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, addressList[row][0]);
            yield (yield checkoutPage.shippingPhoneNumber(this.driver)).click();
            yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
            addressList[row][3] = yield (yield checkoutPage.taxPrice(this.driver)).getText();
            yield checkoutPage.selectShippingRegion(this.driver, addressList[row][1]);
            yield (yield checkoutPage.shippingPhoneNumber(this.driver)).click();
            yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
            addressList[row][4] = yield (yield checkoutPage.taxPrice(this.driver)).getText();
            yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingPostcodeLocator, addressList[row][2]);
            yield (yield checkoutPage.shippingPhoneNumber(this.driver)).click();
            yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
            addressList[row][5] = yield (yield checkoutPage.taxPrice(this.driver)).getText();
        }
    });
});
cucumber_1.Then(/^The checkout page shows a tax value of "([^"]*)"$/, function (taxValue) {
    return __awaiter(this, void 0, void 0, function* () {
        yield cartPage.clickProceedToCheckoutButton(this.driver);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected Checkout page title not found');
        yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
        const taxPrice = yield checkoutPage.taxPrice(this.driver);
        const taxActualValue = yield taxPrice.getText();
        const discountedTaxValue = (Number(taxValue) * this.discountMultiplier).toFixed(2);
        this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${taxValue}"`);
        this.assert.approximately(Number(taxActualValue), Number(discountedTaxValue), 0.02, 'Displayed tax in checkout does not equal expected tax value');
    });
});
cucumber_1.Then(/^The Checkout page shows the following updated tax values after each address change:$/, function (taxValues) {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedTaxValues = taxValues.rows();
        for (const row in expectedTaxValues) {
            let discountedTaxValue = (Number(expectedTaxValues[row][0]) * this.discountMultiplier).toFixed(2);
            this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][0]}"`);
            this.assert.approximately(Number(addressList[row][3]), Number(discountedTaxValue), 0.02, 'Expected tax value following city change not found for addressList row ' + row);
            discountedTaxValue = (Number(expectedTaxValues[row][1]) * this.discountMultiplier).toFixed(2);
            this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][1]}"`);
            this.assert.approximately(Number(addressList[row][4]), Number(discountedTaxValue), 0.02, 'Expected tax value following region change not found for addressList row ' + row);
            discountedTaxValue = (Number(expectedTaxValues[row][2]) * this.discountMultiplier).toFixed(2);
            this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][2]}"`);
            this.assert.approximately(Number(addressList[row][5]), Number(discountedTaxValue), 0.02, 'Expected tax value following postcode change not found for addressList row ' + row);
        }
    });
});
cucumber_1.When(/^I go to the checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield cartPage.clickProceedToCheckoutButton(this.driver);
    });
});
cucumber_1.When(/^The checkout page shows a tax value$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
        const taxText = yield (yield checkoutPage.taxPrice(this.driver)).getText();
        this.assert.notEqual(taxText, '0.00', 'Displayed tax in checkout does not equal expected tax value');
    });
});
cucumber_1.Then(/^The checkout page shows no tax value$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
        const taxText = yield (yield checkoutPage.taxPrice(this.driver)).getText();
        this.assert.equal(taxText, '0.00', 'Displayed tax in checkout does not equal expected tax value');
    });
});
cucumber_1.When(/^I change my address details to a New Hampshire address$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, 'Concord');
        yield checkoutPage.selectShippingRegion(this.driver, 'New Hampshire');
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingPostcodeLocator, '94518');
        yield (yield checkoutPage.shippingPhoneNumber(this.driver)).click();
    });
});
//# sourceMappingURL=orderTaxDisplaySteps.js.map