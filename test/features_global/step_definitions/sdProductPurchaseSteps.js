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
const selenium_webdriver_1 = require("selenium-webdriver");
const helpers_1 = require("../../common/support/helpers");
const cartPage_1 = require("../../common/pages/ScienceDirectStore/cartPage");
const authorisationPage_1 = require("../../common/pages/ScienceDirectStore/authorisationPage");
const checkoutPage_1 = require("../../common/pages/ScienceDirectStore/checkoutPage");
const thankYouPage_1 = require("../../common/pages/ScienceDirectStore/thankYouPage");
const elsevierECapturePage_1 = require("../../common/pages/eCapture/elsevierECapturePage");
const orderHistoryPage_1 = require("../../common/pages/ScienceDirectStore/orderHistoryPage");
const orderReceiptPage_1 = require("../../common/pages/ScienceDirectStore/orderReceiptPage");
const addressesData_1 = require("../../common/support/addressesData");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const sdCartPage = new cartPage_1.SdCartPage(testData);
const sdAuthorisationPage = new authorisationPage_1.SdAuthorisationPage();
const sdCheckoutPage = new checkoutPage_1.SdCheckoutPage();
const eCapturePage = new elsevierECapturePage_1.ElsevierECapturePage();
const sdThankYouPage = new thankYouPage_1.SdThankYouPage(testData);
const sdOrderHistoryPage = new orderHistoryPage_1.SdOrderHistoryPage(testData);
const sdOrderReceiptPage = new orderReceiptPage_1.SdOrderReceiptPage(testData);
cucumber_1.When(/^I login on the SD authorisation page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield sdAuthorisationPage.enterSignInEmailAddress(this.driver, this.customerDetails.emailAddress);
        yield sdAuthorisationPage.clickContinueButton(this.driver);
        yield sdAuthorisationPage.enterSignInPassword(this.driver, this.customerDetails.password);
        yield sdAuthorisationPage.clickSignInButton(this.driver);
    });
});
cucumber_1.When(/^I proceed to the SD checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', sdCartPage.proceedToCheckoutLocator, 10 * 1000);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield sdCartPage.clickProceedToCheckoutButton(this.driver);
    });
});
cucumber_1.Then(/^I enter my shipping and billing address details on the SD checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', sdCheckoutPage.shippingAddressLabelLocator, 7 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, sdCheckoutPage.pageTitle, 'Expected Checkout page title not found');
        const address = addressesData_1.addresses[this.customerDetails.countryCode];
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingFirstNameLocator, address.shipping.firstName);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingLastNameLocator, address.shipping.lastName);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingAddress1Locator, address.shipping.address1);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingAddress2Locator, address.shipping.address2);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingCityLocator, address.shipping.city);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.shippingPostcodeLocator, address.shipping.postcode);
        yield sdCheckoutPage.selectShippingCountry(this.driver, address.shipping.countryShort);
        yield sdCheckoutPage.selectShippingRegion(this.driver, address.shipping.region);
        yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield sdCheckoutPage.sameAddressCheckbox(this.driver));
        const checkboxState = yield (yield sdCheckoutPage.sameAddressCheckbox(this.driver)).isSelected();
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        if (checkboxState === true) {
            yield helpers_1.Helpers.jsClickOnElement(this.driver, yield sdCheckoutPage.sameAddressCheckbox(this.driver));
            yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        }
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingFirstNameLocator, address.billing.firstName);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingLastNameLocator, address.billing.lastName);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingAddress1Locator, address.billing.address1);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingAddress2Locator, address.billing.address2);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingCityLocator, address.billing.city);
        yield helpers_1.Helpers.enterText(this.driver, sdCheckoutPage.billingPostcodeLocator, address.billing.postcode);
        yield sdCheckoutPage.selectBillingCountry(this.driver, address.billing.countryShort);
        yield sdCheckoutPage.selectBillingRegion(this.driver, address.billing.region);
        yield (yield sdCheckoutPage.billingPostcode(this.driver)).sendKeys(selenium_webdriver_1.Key.TAB);
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
    });
});
cucumber_1.When(/^I continue to pay in SD$/, { timeout: 2 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.subTotalPrice = (yield (yield sdCheckoutPage.subTotalPrice(this.driver)).getText()).slice(3);
        console.log(`- Subtotal: US$ ${this.orderDetails.subTotalPrice}`);
        this.orderDetails.taxPrice = (yield (yield sdCheckoutPage.taxTotalPrice(this.driver)).getText()).slice(3);
        console.log(`- Tax: US$ ${this.orderDetails.taxPrice}`);
        this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
        this.orderDetails.orderTotalPrice = (yield (yield sdCheckoutPage.orderTotalPrice(this.driver)).getText()).slice(3);
        console.log(`- Order total: US$ ${this.orderDetails.orderTotalPrice}`);
        yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield sdCheckoutPage.payNowButton(this.driver));
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'clickable', sdCheckoutPage.payNowButtonLocator, 10 * 1000);
        yield sdCheckoutPage.selectPayNowButton(this.driver);
        yield helpers_1.Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
        yield eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, 'mastercard');
    });
});
cucumber_1.Then(/^The order is displayed correctly in Order History$/, { timeout: 8 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield sdOrderHistoryPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', sdOrderHistoryPage.orderHistoryHeaderLocator, 10 * 1000);
        const sdOrderHistoryPageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(sdOrderHistoryPageTitle, sdOrderHistoryPage.pageTitle, 'Expected SD Order History page title not found');
        yield sdOrderHistoryPage.clickSpecificOrderShowReceiptLink(this.driver, this.orderDetails.orderNumberText);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', sdOrderReceiptPage.returnToOrderHistoryLinkLocator, 10 * 1000);
        const sdOrderReceiptPageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(sdOrderReceiptPageTitle, sdOrderReceiptPage.pageTitle, 'Expected SD Order Receipt page title not found');
        const sdReceiptOrderNumber = yield sdOrderReceiptPage.getOrderNumber(this.driver);
        this.assert.equal(sdReceiptOrderNumber, this.orderDetails.orderNumberText, 'Expected order number not found in Order Receipt');
        const sdReceiptSubTotalPrice = yield sdOrderReceiptPage.getSubTotal(this.driver);
        this.assert.equal(sdReceiptSubTotalPrice, this.orderDetails.subTotalPrice, 'Expected subtotal price not found in Order Receipt');
        const sdReceiptTaxPrice = yield sdOrderReceiptPage.getTaxTotal(this.driver);
        this.assert.equal(sdReceiptTaxPrice, this.orderDetails.taxPrice, 'Expected tax price not found in Order Receipt');
        const sdReceiptOrderTotal = yield sdOrderReceiptPage.getOrderTotal(this.driver);
        this.assert.equal(sdReceiptOrderTotal, this.orderDetails.orderTotalPrice, 'Expected order total price not found in Order Receipt');
    });
});
cucumber_1.Then(/^eCapture is successful in SD$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', sdThankYouPage.orderNumberLocator, 60 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, sdThankYouPage.pageTitle, 'Expected Thank You page title not found');
        const orderNumber = yield sdThankYouPage.orderNumber(this.driver);
        const orderNumberText = yield orderNumber.getText();
        console.log('- Thank you message displayed - Order no:', orderNumberText);
        this.orderDetails.orderNumberText = orderNumberText;
        const emailAddress = yield sdThankYouPage.emailAddress(this.driver);
        const emailAddressText = (yield emailAddress.getText()).toLowerCase();
        this.assert.equal(emailAddressText, this.customerDetails.emailAddress, 'Expected email address not found');
    });
});
//# sourceMappingURL=sdProductPurchaseSteps.js.map