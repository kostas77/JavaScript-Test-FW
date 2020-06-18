import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import { CkHomePage } from '../../common/pages/Subscriptions/ckHomePage';
import { CkProductPage } from '../../common/pages/Subscriptions/ckProductPage';
import { AmirsysHomePage } from '../../common/pages/Subscriptions/amirsysHomePage';
import { EmbaseHomePage } from '../../common/pages/Subscriptions/embaseHomePage';
import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { addresses } from '../../common/support/addressesData';
import { TestData } from '../support/testData';

const testData = new TestData();

const ckHomePage = new CkHomePage(testData);
const embaseHomePage = new EmbaseHomePage(testData);
const amirsysHomePage = new AmirsysHomePage(testData);
const ckProductPage = new CkProductPage();
const cartPage = new CartPage(testData);
// const thankYouPage = new ThankYouPage(); // TODO use for assertion in one of the final steps

defineStep(/^I add a (.*) - (.*) to my cart$/, async function (product: string, duration: string): Promise<void> {
    switch (product) {
        case 'Embase':
            await embaseHomePage.clickSubscriptionOption(this.driver, duration);
            break;
        default:
            if (this.platform === 'MOBILE') {
                await Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                await Helpers.removeCkSurveyPopupElement(this.driver);
                await Helpers.jsScrollToElementAlignTop(this.driver, await ckHomePage.productItem(this.driver, product));
                await ckHomePage.productItemClick(this.driver, product);
                await Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                await Helpers.removeCkSurveyPopupElement(this.driver);
                await Helpers.jsScrollToElementAlignTop(this.driver, await ckProductPage.subscriptionOption(this.driver, duration));
                await ckProductPage.clickSubscriptionOption(this.driver, duration);
            } else {
                await Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                await Helpers.removeCkSurveyPopupElement(this.driver);
                await ckHomePage.productItemClick(this.driver, product);
                await Helpers.jsWaitUntilPageLoadComplete(this.driver, 3 * 1000);
                await Helpers.removeCkSurveyPopupElement(this.driver);
                await ckProductPage.clickSubscriptionOption(this.driver, duration);
            }
            break;
    }
});

defineStep(/^I add a product with sku (.*) to my cart$/, async function (sku: string): Promise<void> {
    await amirsysHomePage.productItemClick(this.driver, sku);
});

defineStep(/^I set the term to (.*) for (.*)$/, async function (duration: string, product: string): Promise<void> {
    let productCode: string;
    switch (product) {
        case 'emergency-medicine':
            productCode = 'CKEMERG';
            break;
        case 'family-medicine':
            productCode = 'CKFAMMED';
            break;
        case 'internal-medicine':
            productCode = 'CKINTMED';
            break;
        case 'pediatrics':
            productCode = 'CKPEDIAT';
            break;
        case 'dermatology':
            productCode = 'CKDERMA';
            break;
        default:
            throw new Error('Invalid option for CK subscription requested');
    }
    const sku = `EST_GLB_BS-SKU-CK-${productCode}-M12`;
    await cartPage.selectVariation(this.driver, sku, duration);
});

defineStep(/I should have (.*) with an sbn of (.*) in my cart/, async function (title: string, sbn: string): Promise<void> {
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
    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.lineItemsTitleLocator, 5 * 1000);
    const cartItemTitles = await cartPage.lineItemShortTitles(this.driver);
    const cartItemTitlesText = [];
    for (const item of cartItemTitles) {
        const itemTitle = (await item.getText()).trim();
        cartItemTitlesText.push(itemTitle);
    }
    this.assert.include(cartItemTitlesText, title, `Cart items don't contain the title ${title}`);
});

defineStep(/^The CK order confirmation email contains the correct order and customer details$/, async function (): Promise<void> {
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
        this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addresses.US.billing.firstName} ${addresses.US.billing.lastName}`);
        this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addresses.US.billing.address1);
        this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addresses.US.billing.address2);
        this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addresses.US.billing.city);
        this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addresses.US.billing.region);
        this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addresses.US.billing.postcode);
        this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addresses.US.billing.countryShort);

        this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addresses.US.shipping.firstName} ${addresses.US.shipping.lastName}`);
        this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addresses.US.shipping.address1);
        this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addresses.US.shipping.address2);
        this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addresses.US.shipping.city);
        this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addresses.US.shipping.region);
        this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addresses.US.shipping.postcode);
        this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addresses.US.shipping.countryShort);
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
    }
});

defineStep(/^The Embase order confirmation email contains the correct order and customer details$/, async function (): Promise<void> {
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
        this.assert.equal($('.order-billing-name').text().replace(/\n/g, ''), `${addresses.US.billing.firstName} ${addresses.US.billing.lastName}`);
        this.assert.equal($('.order-billing-street1').text().replace(/\n/g, ''), addresses.US.billing.address1);
        this.assert.equal($('.order-billing-street2').text().replace(/\n/g, ''), addresses.US.billing.address2);
        this.assert.equal($('.order-billing-city').text().replace(/\n/g, ''), addresses.US.billing.city);
        this.assert.equal($('.order-billing-region').text().replace(/\n/g, ''), addresses.US.billing.region);
        this.assert.equal($('.order-billing-postcode').text().replace(/\n/g, ''), addresses.US.billing.postcode);
        this.assert.equal($('.order-billing-country').text().replace(/\n/g, ''), addresses.US.billing.countryShort);

        this.assert.equal($('.order-shipping-name').text().replace(/\n/g, ''), `${addresses.US.shipping.firstName} ${addresses.US.shipping.lastName}`);
        this.assert.equal($('.order-shipping-street1').text().replace(/\n/g, ''), addresses.US.shipping.address1);
        this.assert.equal($('.order-shipping-street2').text().replace(/\n/g, ''), addresses.US.shipping.address2);
        this.assert.equal($('.order-shipping-city').text().replace(/\n/g, ''), addresses.US.shipping.city);
        this.assert.equal($('.order-shipping-region').text().replace(/\n/g, ''), addresses.US.shipping.region);
        this.assert.equal($('.order-shipping-postcode').text().replace(/\n/g, ''), addresses.US.shipping.postcode);
        this.assert.equal($('.order-shipping-country').text().replace(/\n/g, ''), addresses.US.shipping.countryShort);
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- E-mail validation is only performed for MAC/chrome tests');
    }
});
