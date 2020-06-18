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
const driverConfig_1 = require("../support/driverConfig");
const cucumber_1 = require("cucumber");
const helpers_1 = require("../../common/support/helpers");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const thankYouPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/thankYouPage");
const orderHistoryPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/orderHistoryPage");
const elsevierECapturePage_1 = require("../../common/pages/eCapture/elsevierECapturePage");
const checkoutPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage");
const Configuration = require("config");
const addressesData_1 = require("../../common/support/addressesData");
const testData_1 = require("../support/testData");
const config = new driverConfig_1.DriverConfig();
const testData = new testData_1.TestData();
const cartPage = new cartPage_1.CartPage(testData);
const thankYouPage = new thankYouPage_1.ThankYouPage();
const eCapturePage = new elsevierECapturePage_1.ElsevierECapturePage();
const checkoutPage = new checkoutPage_1.CheckoutPage();
const purchasableProducts = Configuration.get('purchasableProducts');
cucumber_1.When(/^I proceed to the checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.proceedToCheckoutLocator, 10 * 1000);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield cartPage.clickProceedToCheckoutButton(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.loginButtonLocator, 20 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected checkout page title not found');
    });
});
cucumber_1.When(/^I login on the checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkoutPage.selectLoginButton(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.loginEmailLocator, 5 * 1000);
        yield checkoutPage.enterLoginDetails(this.driver, this.customerDetails.emailAddress, this.customerDetails.password);
    });
});
cucumber_1.Then(/^I enter my shipping and billing address details$/, { timeout: 2 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.shippingAddressLabelLocator, 7 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected Checkout page title not found');
        const checkboxState = yield (yield checkoutPage.sameAddressCheckbox(this.driver)).isSelected();
        if (checkboxState === true) {
            yield checkoutPage.selectSameAddressCheckbox(this.driver);
        }
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingFirstNameLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.firstName);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingLastNameLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.lastName);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingAddress1Locator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.address1);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield (yield checkoutPage.shippingAddress1(this.driver)).sendKeys(selenium_webdriver_1.Key.TAB);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingAddress2Locator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.address2);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.city);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingPostcodeLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.postcode);
        yield checkoutPage.selectShippingCountry(this.driver, addressesData_1.addresses[this.customerDetails.countryCode].shipping.countryShort);
        if (this.customerDetails.countryCode === 'US' || this.customerDetails.countryCode === 'DE' || this.customerDetails.countryCode === 'AU') {
            yield checkoutPage.selectShippingRegion(this.driver, addressesData_1.addresses[this.customerDetails.countryCode].shipping.region);
        }
        else {
            yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingRegionLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.region);
        }
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingPhoneLocator, addressesData_1.addresses[this.customerDetails.countryCode].shipping.telephone);
        if (this.orderDetails.productTypes.includes('ck')) {
            this.customerDetails.emailAddress = [this.customerDetails.emailAddress.slice(0, 16), '+', this.customerDetails.countryCode.toLowerCase(), this.customerDetails.emailAddress.slice(16)].join('');
            yield helpers_1.Helpers.enterText(this.driver, checkoutPage.registerPasswordLocator, this.customerDetails.password);
        }
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.shippingEmailLocator, this.customerDetails.emailAddress);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingFirstNameLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.firstName);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingLastNameLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.lastName);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingAddress1Locator, addressesData_1.addresses[this.customerDetails.countryCode].billing.address1);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield (yield checkoutPage.billingAddress1(this.driver)).sendKeys(selenium_webdriver_1.Key.TAB);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingAddress2Locator, addressesData_1.addresses[this.customerDetails.countryCode].billing.address2);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingCityLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.city);
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingPostcodeLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.postcode);
        yield checkoutPage.selectBillingCountry(this.driver, addressesData_1.addresses[this.customerDetails.countryCode].billing.countryShort);
        if (this.customerDetails.countryCode === 'US' || this.customerDetails.countryCode === 'DE' || this.customerDetails.countryCode === 'AU') {
            yield checkoutPage.selectBillingRegion(this.driver, addressesData_1.addresses[this.customerDetails.countryCode].billing.region);
        }
        else {
            yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingRegionLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.region);
        }
        yield helpers_1.Helpers.enterText(this.driver, checkoutPage.billingPhoneLocator, addressesData_1.addresses[this.customerDetails.countryCode].billing.telephone);
    });
});
cucumber_1.When(/^I continue to pay using (?:a|an) ([a-z]+)?$/, { timeout: 2 * 60 * 1000 }, function (paymentType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.platform === 'MOBILE') {
            yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
        }
        else {
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', checkoutPage.termsCheckboxLocator, 20 * 1000);
        }
        yield checkoutPage.acceptTerms(this.driver);
        if (this.platform === 'MOBILE') {
            yield helpers_1.Helpers.driverSleep(this.driver, 7 * 1000);
        }
        else {
            yield helpers_1.Helpers.driverSleep(this.driver, 7 * 1000);
        }
        this.orderDetails.cartTotalPrice = yield (yield checkoutPage.cartTotalPrice(this.driver)).getText();
        console.log(`- Cart Total: ${this.orderDetails.cartTotalPrice}`);
        if (this.orderDetails.discountedOrder) {
            this.orderDetails.discountPrice = yield (yield checkoutPage.discountPrice(this.driver)).getText();
            console.log(`- Discount: ${this.orderDetails.discountPrice}`);
            this.assert.isAbove(Number(this.orderDetails.discountPrice), 0.00, 'Discount amount should be greater than 0');
            this.orderDetails.subTotalPrice = yield (yield checkoutPage.subTotalPrice(this.driver)).getText();
            console.log(`- Subtotal: ${this.orderDetails.subTotalPrice}`);
        }
        this.orderDetails.taxPrice = yield (yield checkoutPage.taxPrice(this.driver)).getText();
        console.log(`- Tax: ${this.orderDetails.taxPrice}`);
        if (this.customerDetails.countryCode !== 'JP') {
            this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
        }
        this.orderDetails.orderTotalPrice = yield (yield checkoutPage.orderTotalPrice(this.driver)).getText();
        console.log(`- Order total: ${this.orderDetails.orderTotalPrice}`);
        yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield checkoutPage.payButton(this.driver));
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.payButtonLocator, 10 * 1000);
        yield checkoutPage.selectPayButton(this.driver);
        yield helpers_1.Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
        yield eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
    });
});
cucumber_1.Then(/^eCapture is successful$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', thankYouPage.orderNumberLocator, 60 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, thankYouPage.pageTitle, 'Expected Thank You page title not found');
        const orderNumber = yield thankYouPage.orderNumber(this.driver);
        const orderNumberText = yield orderNumber.getText();
        console.log('- Thank you message displayed - Order no:', orderNumberText);
        this.orderDetails.orderNumberText = orderNumberText;
        const emailAddress = yield thankYouPage.emailAddress(this.driver);
        const emailAddressText = (yield emailAddress.getText()).toLowerCase();
        this.assert.equal(emailAddressText, this.customerDetails.emailAddress, 'Expected email address not found');
        yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
    });
});
cucumber_1.Then(/^The order is displayed in (.*)? Order History$/, { timeout: 8 * 60 * 1000 }, function (variant) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderHistoryPage = new orderHistoryPage_1.OrderHistoryPage(variant, testData);
        yield orderHistoryPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', orderHistoryPage.orderHistoryHeaderLocator, 60 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, orderHistoryPage.pageTitle, 'Expected Order History page title not found');
        const orderNumberText = yield orderHistoryPage.getTopOrderNumber(this.driver);
        this.assert.equal(orderNumberText, this.orderDetails.orderNumberText, 'Expected order number not found in Order History');
        const orderTotalText = yield orderHistoryPage.getSpecificOrderTotal(this.driver, this.orderDetails.orderNumberText);
        this.assert.equal(orderTotalText, this.orderDetails.orderTotalPrice, 'Expected order total not found in Order History');
        if (config.platform === 'MOBILE' && config.browserName !== 'ipad') {
            yield (yield orderHistoryPage.specificOrderMoreInfoLinkMobile(this.driver, this.orderDetails.orderNumberText)).click();
        }
        else {
            yield (yield orderHistoryPage.specificOrderMoreInfoArrow(this.driver, this.orderDetails.orderNumberText)).click();
        }
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', orderHistoryPage.specificOrderLocatorPrefix + this.orderDetails.orderNumberText + orderHistoryPage.specificOrderItemISBNsLocatorSuffix, 5 * 1000);
        const titleArray = yield orderHistoryPage.specificOrderItemTitles(this.driver, this.orderDetails.orderNumberText);
        for (const row of titleArray) {
            const titleText = yield row.getText();
            yield this.orderHistoryListedTitles.push(titleText);
        }
        const expectedTitles = JSON.stringify(this.orderDetails.orderTitles.slice().sort());
        this.assert.equal(JSON.stringify(this.orderHistoryListedTitles.sort()), expectedTitles, 'Incorrect title(s) found on Order History page');
        if (this.orderDetails.productTypes.includes('sdrmEBook') || this.orderDetails.productTypes.includes('vstEBook')) {
            let DownloadArray = yield orderHistoryPage.specificOrderItemDownloadMessages(this.driver, this.orderDetails.orderNumberText);
            console.log('- Refreshing page until all Download Links are available');
            while (DownloadArray.length > 0) {
                yield this.driver.navigate().refresh();
                yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
                yield helpers_1.Helpers.waitUntilPageTitleContains(this.driver, 'Order History | Elsevier', 60 * 1000);
                DownloadArray = yield orderHistoryPage.specificOrderItemDownloadMessages(this.driver, this.orderDetails.orderNumberText);
            }
            console.log('- All Download Links are now available in Order History');
            yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
        }
        if (this.orderDetails.productTypes.includes('vstEBook')) {
            const vstDownloadLinksArray = yield orderHistoryPage.specificOrderItemVstDownloadLinks(this.driver, this.orderDetails.orderNumberText);
            if (vstDownloadLinksArray.length === 0 && purchasableProducts.vstEBook) {
                throw new Error('No download links found for VST eBook products in Order History: ' + this.orderDetails.orderNumberText);
            }
            for (const row of vstDownloadLinksArray) {
                const vstDownloadLinkAddress = yield row.getAttribute('href');
                this.assert.isTrue(orderHistoryPage.vstDownloadUrlRegExp.test(vstDownloadLinkAddress), 'Expected VST download link url not valid');
            }
        }
        if (this.orderDetails.productTypes.includes('sdrmEBook')) {
            const downloadLinksArray = yield orderHistoryPage.specificOrderItemSdrmDownloadLinks(this.driver, this.orderDetails.orderNumberText);
            if (downloadLinksArray.length === 0 && purchasableProducts.sdrmEBook) {
                throw new Error('No download links found for SDRM eBook products in Order History: ' + this.orderDetails.orderNumberText);
            }
            for (const row of downloadLinksArray) {
                const downloadLinkAddress = yield row.getAttribute('href');
                const splitLinkAddress = downloadLinkAddress.split('/');
                this.assert.oneOf(splitLinkAddress[0] + '//' + splitLinkAddress[2] + '/' + splitLinkAddress[3] + '/', [orderHistoryPage.sdrmDownloadUrlPrefix], 'Expected SDRM Bookmark-API url prefix not found');
            }
        }
        const isbnsArray = yield orderHistoryPage.specificOrderItemIsbns(this.driver, this.orderDetails.orderNumberText);
        for (const row of isbnsArray) {
            const isbn = yield row.getText();
            this.orderHistoryListedIsbns.push(isbn.trim().split(' ').pop());
        }
    });
});
cucumber_1.Then(/^eCapture is accessible$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkoutPage.acceptTerms(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.taxPriceLocator, 10 * 1000);
        this.orderDetails.orderTotalPrice = yield (yield checkoutPage.orderTotalPrice(this.driver)).getText();
        yield checkoutPage.selectPayButton(this.driver);
        yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 20 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
    });
});
//# sourceMappingURL=checkoutFunctionalitySteps.js.map