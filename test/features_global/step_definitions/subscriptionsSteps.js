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
const ckHomePage_1 = require("../../common/pages/Subscriptions/ckHomePage");
const ckProductPage_1 = require("../../common/pages/Subscriptions/ckProductPage");
const amirsysHomePage_1 = require("../../common/pages/Subscriptions/amirsysHomePage");
const embaseHomePage_1 = require("../../common/pages/Subscriptions/embaseHomePage");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const addressesData_1 = require("../../common/support/addressesData");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const ckHomePage = new ckHomePage_1.CkHomePage(testData);
const embaseHomePage = new embaseHomePage_1.EmbaseHomePage(testData);
const amirsysHomePage = new amirsysHomePage_1.AmirsysHomePage(testData);
const ckProductPage = new ckProductPage_1.CkProductPage();
const cartPage = new cartPage_1.CartPage(testData);
cucumber_1.When(/^I add a (.*) - (.*) to my cart$/, function (product, duration) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (product) {
            case 'Embase':
                yield embaseHomePage.clickSubscriptionOption(this.driver, duration);
                break;
            default:
                if (this.platform === 'MOBILE') {
                    yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                    yield helpers_1.Helpers.removeCkSurveyPopupElement(this.driver);
                    yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield ckHomePage.productItem(this.driver, product));
                    yield ckHomePage.productItemClick(this.driver, product);
                    yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                    yield helpers_1.Helpers.removeCkSurveyPopupElement(this.driver);
                    yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield ckProductPage.subscriptionOption(this.driver, duration));
                    yield ckProductPage.clickSubscriptionOption(this.driver, duration);
                }
                else {
                    yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                    yield helpers_1.Helpers.removeCkSurveyPopupElement(this.driver);
                    yield ckHomePage.productItemClick(this.driver, product);
                    yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                    yield helpers_1.Helpers.removeCkSurveyPopupElement(this.driver);
                    yield ckProductPage.clickSubscriptionOption(this.driver, duration);
                }
                break;
        }
    });
});
cucumber_1.When(/^I add a product with sku (.*) to my cart$/, function (sku) {
    return __awaiter(this, void 0, void 0, function* () {
        yield amirsysHomePage.productItemClick(this.driver, sku);
    });
});
cucumber_1.When(/^I set the term to (.*) for (.*)$/, function (duration, product) {
    return __awaiter(this, void 0, void 0, function* () {
        let productCode;
        switch (product) {
            case 'sports-medicine':
                productCode = 'CKSPORT';
                break;
            case 'sleep-medicine':
                productCode = 'CKSLEEP';
                break;
            case 'dentistry':
                productCode = 'CKDENT';
                break;
            case 'neurosurgery':
                productCode = 'CKNEUSUR';
                break;
            case 'nephrology':
                productCode = 'CKNEPHRO';
                break;
            default:
                throw new Error('Invalid option for CK subscription requested');
        }
        const sku = `EST_GLB_BS-SKU-CK-${productCode}-M12`;
        yield cartPage.selectVariation(this.driver, sku, duration);
    });
});
cucumber_1.Then(/I should have (.*) with an sbn of (.*) in my cart/, function (title, sbn) {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.productTypes = [];
        switch (this.orderDetails.solution) {
            case 'CK':
                this.orderDetails.orderTitles = [title];
                this.orderDetails.orderIsbns = [sbn];
                this.orderDetails.orderTotalItems = 1;
                this.orderDetails.productTypes.push('ck');
                break;
            case 'Embase':
                this.orderDetails.orderTitles = [title];
                this.orderDetails.orderIsbns = [sbn];
                this.orderDetails.orderTotalItems = 1;
                this.orderDetails.productTypes.push('embase');
                break;
            case 'Amirsys':
                this.orderDetails.orderTitles = [title];
                this.orderDetails.orderIsbns = [sbn];
                this.orderDetails.orderTotalItems = 1;
                this.orderDetails.productTypes.push('amirsys');
                break;
            default:
                throw new Error('Invalid subscription option requested');
        }
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.lineItemsTitleLocator, 5 * 1000);
        const cartItemTitles = yield cartPage.lineItemShortTitles(this.driver);
        const cartItemTitlesText = [];
        for (const item of cartItemTitles) {
            const itemTitle = (yield item.getText()).trim();
            cartItemTitlesText.push(itemTitle);
        }
        this.assert.include(cartItemTitlesText, title, `Cart items don't contain the title ${title}`);
    });
});
cucumber_1.Then(/^The CK order confirmation email contains the correct order and customer details$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            this.assert.isDefined(this.orderDetails.orderConfirmationEmail);
            const $ = this.orderDetails.orderConfirmationEmail;
            const orderItemTitles = $('.order-item-title');
            let expectedItemTitles = [];
            for (const title of this.orderDetails.orderTitles) {
                for (const item in this.orderDetails.orderItemDetails) {
                    if (this.orderDetails.orderItemDetails.hasOwnProperty(item) && this.orderDetails.orderItemDetails[item].name === title) {
                        expectedItemTitles.push(`${title}${this.orderDetails.orderItemDetails[item].bundleFlag ? ' - Bundle' : ''}`);
                    }
                }
            }
            expectedItemTitles = expectedItemTitles.filter((value, index, self) => self.indexOf(value) === index);
            this.assert.equal(orderItemTitles.length, expectedItemTitles.length);
            for (let i = 0; i < expectedItemTitles.length; i++) {
                this.assert.equal(orderItemTitles.slice(i, i + 1).text(), expectedItemTitles[i]);
            }
            this.assert.equal($('.order-grand-total').text(), 'US$' + this.orderDetails.orderTotalPrice, 'Expected order total not found');
            this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addressesData_1.addresses.US.billing.firstName} ${addressesData_1.addresses.US.billing.lastName}`);
            this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.address1);
            this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.address2);
            this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.city);
            this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.region);
            this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.postcode);
            this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.countryShort);
            this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addressesData_1.addresses.US.shipping.firstName} ${addressesData_1.addresses.US.shipping.lastName}`);
            this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.address1);
            this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.address2);
            this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.city);
            this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.region);
            this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.postcode);
            this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.countryShort);
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^The Embase order confirmation email contains the correct order and customer details$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            this.assert.isDefined(this.orderDetails.orderConfirmationEmail);
            const $ = this.orderDetails.orderConfirmationEmail;
            const orderItemTitles = $('.order-item-title');
            let expectedItemTitles = [];
            for (const title of this.orderDetails.orderTitles) {
                for (const item in this.orderDetails.orderItemDetails) {
                    if (this.orderDetails.orderItemDetails.hasOwnProperty(item) && this.orderDetails.orderItemDetails[item].name === title) {
                        expectedItemTitles.push(`${title}${this.orderDetails.orderItemDetails[item].bundleFlag ? ' - Bundle' : ''}`);
                    }
                }
            }
            expectedItemTitles = expectedItemTitles.filter((value, index, self) => self.indexOf(value) === index);
            this.assert.equal(orderItemTitles.length, expectedItemTitles.length);
            for (let i = 0; i < expectedItemTitles.length; i++) {
                this.assert.equal(orderItemTitles.slice(i, i + 1).text(), expectedItemTitles[i]);
            }
            this.assert.equal($('.order-grand-total').text(), 'US$' + this.orderDetails.orderTotalPrice, 'Expected order total not found');
            this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addressesData_1.addresses.US.billing.firstName} ${addressesData_1.addresses.US.billing.lastName}`);
            this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.address1);
            this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.address2);
            this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.city);
            this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.region);
            this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.postcode);
            this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addressesData_1.addresses.US.billing.countryShort);
            this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addressesData_1.addresses.US.shipping.firstName} ${addressesData_1.addresses.US.shipping.lastName}`);
            this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.address1);
            this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.address2);
            this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.city);
            this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.region);
            this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.postcode);
            this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addressesData_1.addresses.US.shipping.countryShort);
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
        }
    });
});
//# sourceMappingURL=subscriptionsSteps.js.map