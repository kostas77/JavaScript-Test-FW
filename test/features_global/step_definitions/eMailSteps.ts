import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import * as moment from 'moment';
import { wordsToNumbers } from 'words-to-numbers';

import { TestData } from '../support/testData';
import { addresses } from '../../common/support/addressesData';
import { EMailPage } from '../../common/pages/eMailPage';
import * as Imap from 'imap';


const config: Imap.Config = {
    user: 'test.elsevier.io@gmail.com',
    password: 'Sp00n123'
};
const eMailPage = new EMailPage(config);
const testData = new TestData();

defineStep(/^I receive (?:a|an) ((?:\w+ ){1,})email(?: within (\d+) (\w+)(?: with a (\d+) second interval))?$/ , { timeout: 6 * 60 * 1000 }, async function (emailType: string, expQty?: string, expUnits?: string, intSeconds?: string): Promise<void> {
    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        const timeoutQty: number = parseInt(expQty || '5', 10);
        const timeoutUnits: string = expUnits || 'minutes';
        const expiryTime = moment().add(
            timeoutQty as moment.DurationInputArg1,
            timeoutUnits as moment.DurationInputArg2
        );
        const seconds: number = parseInt(intSeconds, 10) || 2;
        let email = false;
        const emailCheck = async (subject: string) => {
            try {
                return await this.gmail.getEmailBySubject(subject);
            } catch (e) {
                if (e !== 'No emails found') {
                    console.log({ e }, 'Error checking emails');
                    throw e;
                }
                return undefined;
            }
        };

        while (expiryTime > moment() && !email) {
            switch (emailType.trim()) {
                case 'order confirmation':
                    email = await emailCheck(`Your Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                    if (email) {
                        // The following is used to output the html of the OrderConfirmation e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'OrderConfirmationEmail.html'), email.html());
                        this.orderDetails.orderConfirmationEmail = email;
                    }
                    break;
                case 'CK order confirmation':
                    email = await emailCheck(`Your Order ${this.orderDetails.orderNumberText} from ClinicalKey`);
                    if (email) {
                        // The following is used to output the html of the CKOrderConfirmation e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'CKOrderConfirmationEmail.html'), email.html());
                        this.orderDetails.orderConfirmationEmail = email;
                    }
                    break;
                case 'Amirsys order confirmation':
                    email = await emailCheck(`Your Order ${this.orderDetails.orderNumberText} from Elsevier`);
                    if (email) {
                        // The following is used to output the html of the AmirsysOrderConfirmation e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'AmirsysOrderConfirmationEmail.html'), email.html());
                        this.orderDetails.orderConfirmationEmail = email;
                    }
                    break;
                case 'ScienceDirect order confirmation':
                    email = await emailCheck(`Your ScienceDirect order confirmation (${this.orderDetails.orderNumberText}`);
                    if (email) {
                        // The following is used to output the html of the SDOrderConfirmation e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'SDOrderConfirmationEmail.html'), email.html());
                        this.orderDetails.orderConfirmationEmail = email;
                    }
                    break;
                case 'eBook access links':
                    email = await emailCheck(`Your eBook Access Links for Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                    if (email) {
                        // The following is used to output the html of the DownloadLinks e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'DownloadLinksEmail.html'), email.html());
                        this.orderDetails.downloadLinksEmail = email;
                    }
                    break;
                case 'ScienceDirect download links':
                    email = await emailCheck(`Your ScienceDirect purchase is available for download (${this.orderDetails.orderNumberText})`);
                    if (email) {
                        // The following is used to output the html of the SDDownloadLinks e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'SDDownloadLinksEmail.html'), email.html());
                        this.orderDetails.downloadLinksEmail = email;
                    }
                    break;
                case 'account verification':
                    email = await emailCheck('Please verify your email address with Elsevier');
                    if (email) {
                        // The following is used to output the html of the accountVerification e-mail in a file for debugging purposes
                        // tslint:disable-next-line:no-require-imports
                        // require('fs').writeFileSync(require('path').join(process.cwd(), 'AccountVerificationEmail.html'), email.html());
                        this.orderDetails.accountVerificationEmail = email;
                    }
                    break;
                default:
                    throw new Error(`Email type '${emailType.trim()}' not configured`);
            }
            await Helpers.driverSleep(this.driver, seconds * 1000);
        }
        if (!email) {
            throw new Error(`Failed to find ${emailType.trim()} email after ${timeoutQty} ${timeoutUnits}`);
        }
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
    }
});

defineStep(/^The order confirmation email contains the correct order and customer details$/, async function (): Promise<void> {
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
                } else {
                    expectedItemTitles.push(title);
                    expectedItemTitles.push(title);
                }
            } else {
                expectedItemTitles.push(title);
            }
        }

        for (const item of orderItems) {
            this.assert.includeMembers(expectedItemTitles, item.text());
        }

        this.assert.equal(Helpers.removeCurrencySymbol($('.order-full-price').text()), this.orderDetails.cartTotalPrice, 'Expected Cart Total price total not found');
        // this.assert.equal($('.order-discount').text(), 'US$' + this.orderDetails.orderDiscount???, 'Expected Discount Total price not found'); TODO
        this.assert.equal(Helpers.removeCurrencySymbol($('.order-tax').text()), this.orderDetails.taxPrice, 'Expected Tax Price not found');
        this.assert.equal(Helpers.removeCurrencySymbol($('.order-grand-total').text()), this.orderDetails.orderTotalPrice, 'Expected Order Total price not found');

        this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addresses[this.customerDetails.countryCode].billing.firstName} ${addresses[this.customerDetails.countryCode].billing.lastName}`);
        this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.address1);
        this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.address2);
        this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.city);
        this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.region);
        this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.postcode);
        this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].billing.countryShort);

        this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addresses[this.customerDetails.countryCode].shipping.firstName} ${addresses[this.customerDetails.countryCode].shipping.lastName}`);
        this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.address1);
        this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.address2);
        this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.city);
        this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.region);
        this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.postcode);
        this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addresses[this.customerDetails.countryCode].shipping.countryShort);
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
    }
});

defineStep(/^The ((?:\w+ ){1,})email should contain (\d+) ((?:\w+ ){1,})download links?$/, function (emailType: string, numOfLinks: string, linkType: string): Promise<void> {
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
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- Download links validation is only performed for MAC/chrome tests');
    }
});

defineStep(/^(?:The (\w+)|All of the) VST download links? should redirect to VST$/, async function(ordinal?: string) {
    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        const downloadLinks = this.orderDetails.downloadLinksEmail('a[href^="https://checkout.staging.ecommerce.elsevier.com/order/item/redirect/"]');
        if (ordinal) {
            const index = (wordsToNumbers(ordinal) as number) - 1;
            this.assert.isAbove(downloadLinks.length, index);
            const downloadLink = downloadLinks[index].attribs.href;
            return await eMailPage.downloadLinkRedirectsToVST(this.driver, downloadLink);
        }
        for (let index = 0; index < downloadLinks.length; index++) {
            const downloadLink = downloadLinks[index].attribs.href;
            await eMailPage.downloadLinkRedirectsToVST(this.driver, downloadLink);
        }
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- Download links validation is only performed for MAC/chrome tests');
    }
});
