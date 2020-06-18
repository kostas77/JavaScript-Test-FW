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
const moment = require("moment");
const words_to_numbers_1 = require("words-to-numbers");
const testData_1 = require("../support/testData");
const addressesData_1 = require("../../common/support/addressesData");
const eMailPage_1 = require("../../common/pages/eMailPage");
const config = {
    user: 'test.elsevier.io@gmail.com',
    password: 'Sp00n123'
};
const eMailPage = new eMailPage_1.EMailPage(config);
const testData = new testData_1.TestData();
cucumber_1.Then(/^I receive (?:a|an) ((?:\w+ ){1,})email(?: within (\d+) (\w+)(?: with a (\d+) second interval))?$/, { timeout: 6 * 60 * 1000 }, function (emailType, expQty, expUnits, intSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            const timeoutQty = parseInt(expQty || '5', 10);
            const timeoutUnits = expUnits || 'minutes';
            const expiryTime = moment().add(timeoutQty, timeoutUnits);
            const seconds = parseInt(intSeconds, 10) || 2;
            while (expiryTime > moment()) {
                let email;
                switch (emailType.trim()) {
                    case 'order confirmation':
                        email = yield this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                        if (email) {
                            this.orderDetails.orderConfirmationEmail = email;
                            return;
                        }
                        throw new Error('The order confirmation email could not be found');
                        break;
                    case 'CK order confirmation':
                        email = yield this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} from ClinicalKey`);
                        if (email) {
                            this.orderDetails.orderConfirmationEmail = email;
                            return;
                        }
                        throw new Error('The CK order confirmation email could not be found');
                        break;
                    case 'Amirsys order confirmation':
                        email = yield this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} from Elsevier`);
                        if (email) {
                            this.orderDetails.orderConfirmationEmail = email;
                            return;
                        }
                        throw new Error('The Amirsys order confirmation email could not be found');
                        break;
                    case 'ScienceDirect order confirmation':
                        email = yield this.gmail.getEmailBySubject(`Your ScienceDirect order confirmation (${this.orderDetails.orderNumberText}`);
                        if (email) {
                            this.orderDetails.orderConfirmationEmail = email;
                            return;
                        }
                        throw new Error('The Amirsys order confirmation email could not be found');
                        break;
                    case 'eBook access links':
                        email = yield this.gmail.getEmailBySubject(`Your eBook Access Links for Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                        if (email) {
                            this.orderDetails.downloadLinksEmail = email;
                            return;
                        }
                        throw new Error('The eBook access links email could not be found');
                        break;
                    case 'ScienceDirect download links':
                        email = yield this.gmail.getEmailBySubject(`Your ScienceDirect purchase is available for download (${this.orderDetails.orderNumberText})`);
                        if (email) {
                            this.orderDetails.downloadLinksEmail = email;
                            return;
                        }
                        throw new Error('The SD download links email could not be found');
                        break;
                    case 'account verification':
                        email = yield this.gmail.getEmailBySubject('Please verify your email address with Elsevier');
                        if (email) {
                            this.orderDetails.accountVerificationEmail = email;
                            return;
                        }
                        throw new Error('The account verification email could not be found');
                        break;
                    default:
                        throw new Error(`Email type '${emailType.trim()}' not configured`);
                }
                yield helpers_1.Helpers.driverSleep(this.driver, seconds * 1000);
            }
            throw new Error(`Failed to find email after ${timeoutQty} ${timeoutUnits}`);
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^The order confirmation email contains the correct order and customer details$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            this.assert.isDefined(this.orderDetails.orderConfirmationEmail);
            const $ = this.orderDetails.orderConfirmationEmail;
            const orderItems = [];
            const expectedItemTitles = [];
            const productsToPurchase = testData.getProductDataFor().productsToPurchase;
            for (const title of this.orderDetails.orderTitles) {
                const item = productsToPurchase.find(p => p.productTitle === title);
                if (item.bundleFlag) {
                    if (process.env.test_tag !== 'GlobalStoreCheckout') {
                        expectedItemTitles.push(`${title} - Bundle`);
                    }
                    else {
                        expectedItemTitles.push(title);
                        expectedItemTitles.push(title);
                    }
                }
                else {
                    expectedItemTitles.push(title);
                }
            }
            for (const item of orderItems) {
                this.assert.includeMembers(expectedItemTitles, item.text());
            }
            this.assert.equal(helpers_1.Helpers.removeCurrencySymbol($('.order-full-price').text()), this.orderDetails.cartTotalPrice, 'Expected Cart Total price total not found');
            this.assert.equal(helpers_1.Helpers.removeCurrencySymbol($('.order-tax').text()), this.orderDetails.taxPrice, 'Expected Tax Price not found');
            this.assert.equal(helpers_1.Helpers.removeCurrencySymbol($('.order-grand-total').text()), this.orderDetails.orderTotalPrice, 'Expected Order Total price not found');
            this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addressesData_1.addresses[this.customerDetails.countryCode].billing.firstName} ${addressesData_1.addresses[this.customerDetails.countryCode].billing.lastName}`);
            this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.address1);
            this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.address2);
            this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.city);
            this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.region);
            this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.postcode);
            this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].billing.countryShort);
            this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addressesData_1.addresses[this.customerDetails.countryCode].shipping.firstName} ${addressesData_1.addresses[this.customerDetails.countryCode].shipping.lastName}`);
            this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.address1);
            this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.address2);
            this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.city);
            this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.region);
            this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.postcode);
            this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addressesData_1.addresses[this.customerDetails.countryCode].shipping.countryShort);
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^The ((?:\w+ ){1,})email should contain (\d+) ((?:\w+ ){1,})download links?$/, function (emailType, numOfLinks, linkType) {
    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        this.assert.isDefined(this.orderDetails.downloadLinksEmail);
        switch (emailType.trim()) {
            case 'eBook access links':
                switch (linkType.trim()) {
                    case 'VST':
                        this.assert.equal(this.orderDetails.downloadLinksEmail('a[href^="https://checkout.staging.ecommerce.elsevier.com/order/item/redirect/"]').length, parseInt(numOfLinks, 10));
                        return;
                    case 'PDF':
                        this.assert.equal(this.orderDetails.downloadLinksEmail('a[href^="http://bookmark-api.elsevieremea.com/download/pdf/"]').length, parseInt(numOfLinks, 10));
                        return;
                    case 'EPub':
                        this.assert.equal(this.orderDetails.downloadLinksEmail('a[href^="http://bookmark-api.elsevieremea.com/download/epub/"]').length, parseInt(numOfLinks, 10));
                        return;
                    case 'Mobi':
                        this.assert.equal(this.orderDetails.downloadLinksEmail('a[href^="http://bookmark-api.elsevieremea.com/download/mobi/"]').length, parseInt(numOfLinks, 10));
                        return;
                    default:
                        throw new Error(`Link type '${linkType.trim()}' not configured`);
                }
            default:
                throw new Error(`Email type '${emailType.trim()}' not configured`);
        }
    }
    else {
        console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- Download links validation is only performed for MAC/chrome tests');
    }
});
cucumber_1.Then(/^(?:The (\w+)|All of the) VST download links? should redirect to VST$/, function (ordinal) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            const downloadLinks = this.orderDetails.downloadLinksEmail('a[href^="https://checkout.staging.ecommerce.elsevier.com/order/item/redirect/"]');
            if (ordinal) {
                const index = words_to_numbers_1.wordsToNumbers(ordinal) - 1;
                this.assert.isAbove(downloadLinks.length, index);
                const downloadLink = downloadLinks[index].attribs.href;
                return yield eMailPage.downloadLinkRedirectsToVST(this.driver, downloadLink);
            }
            for (let index = 0; index < downloadLinks.length; index++) {
                const downloadLink = downloadLinks[index].attribs.href;
                yield eMailPage.downloadLinkRedirectsToVST(this.driver, downloadLink);
            }
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- Download links validation is only performed for MAC/chrome tests');
        }
    });
});
//# sourceMappingURL=eMailSteps.js.map