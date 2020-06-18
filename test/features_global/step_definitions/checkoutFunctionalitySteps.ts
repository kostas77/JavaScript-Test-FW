import { Key } from 'selenium-webdriver';
import { DriverConfig } from '../support/driverConfig';
import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';

import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { ThankYouPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/thankYouPage';
import { OrderHistoryPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/orderHistoryPage';
import { ElsevierECapturePage } from '../../common/pages/eCapture/elsevierECapturePage';
import { CheckoutPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage';
import { IPurchasableProducts } from '../../common/support/interfaces';
import * as Configuration from 'config';
import { addresses } from '../../common/support/addressesData';
import { TestData } from '../support/testData';

const config = new DriverConfig();
const testData = new TestData();
const cartPage = new CartPage(testData);
const thankYouPage = new ThankYouPage();
const eCapturePage = new ElsevierECapturePage();
const checkoutPage = new CheckoutPage();

const purchasableProducts: IPurchasableProducts = Configuration.get<boolean>('purchasableProducts');

defineStep(/^I proceed to the checkout page$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.proceedToCheckoutLocator, 10 * 1000);
    await Helpers.driverSleep(this.driver, 1000);
    await cartPage.clickProceedToCheckoutButton(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.loginButtonLocator, 20 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected checkout page title not found');
});

defineStep(/^I login on the checkout page$/, async function (): Promise<void> {
    await checkoutPage.selectLoginButton(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.loginEmailLocator, 5 * 1000);
    await checkoutPage.enterLoginDetails(this.driver, this.customerDetails.emailAddress, this.customerDetails.password);
});

defineStep(/^I enter my shipping and billing address details$/, { timeout: 2 * 60 * 1000 }, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.shippingAddressLabelLocator, 7 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected Checkout page title not found');
    const checkboxState = await (await checkoutPage.sameAddressCheckbox(this.driver)).isSelected();
    if (checkboxState === true) {
        await checkoutPage.selectSameAddressCheckbox(this.driver);
    }
    await Helpers.enterText(this.driver, checkoutPage.shippingFirstNameLocator, addresses[this.customerDetails.countryCode].shipping.firstName);
    await Helpers.enterText(this.driver, checkoutPage.shippingLastNameLocator, addresses[this.customerDetails.countryCode].shipping.lastName);
    await Helpers.enterText(this.driver, checkoutPage.shippingAddress1Locator, addresses[this.customerDetails.countryCode].shipping.address1);
    await Helpers.driverSleep(this.driver, 1000);
    await (await checkoutPage.shippingAddress1(this.driver)).sendKeys(Key.TAB);
    await Helpers.enterText(this.driver, checkoutPage.shippingAddress2Locator, addresses[this.customerDetails.countryCode].shipping.address2);
    await Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, addresses[this.customerDetails.countryCode].shipping.city);
    await Helpers.enterText(this.driver,  checkoutPage.shippingPostcodeLocator, addresses[this.customerDetails.countryCode].shipping.postcode);
    await checkoutPage.selectShippingCountry(this.driver, addresses[this.customerDetails.countryCode].shipping.countryShort);
    if (this.customerDetails.countryCode === 'US' || this.customerDetails.countryCode === 'DE' || this.customerDetails.countryCode === 'AU') {
        await checkoutPage.selectShippingRegion(this.driver, addresses[this.customerDetails.countryCode].shipping.region);
    } else {
        await Helpers.enterText(this.driver, checkoutPage.shippingRegionLocator, addresses[this.customerDetails.countryCode].shipping.region);
    }
    await Helpers.enterText(this.driver, checkoutPage.shippingPhoneLocator, addresses[this.customerDetails.countryCode].shipping.telephone);
    if (this.orderDetails.productTypes.includes('ck')) {
        this.customerDetails.emailAddress = [this.customerDetails.emailAddress.slice(0, 16), '+', this.customerDetails.countryCode.toLowerCase(), this.customerDetails.emailAddress.slice(16)].join('');
        await Helpers.enterText(this.driver, checkoutPage.registerPasswordLocator, this.customerDetails.password);
    }
    await Helpers.enterText(this.driver, checkoutPage.shippingEmailLocator, this.customerDetails.emailAddress);
    await Helpers.enterText(this.driver, checkoutPage.billingFirstNameLocator, addresses[this.customerDetails.countryCode].billing.firstName);
    await Helpers.enterText(this.driver, checkoutPage.billingLastNameLocator, addresses[this.customerDetails.countryCode].billing.lastName);
    await Helpers.enterText(this.driver, checkoutPage.billingAddress1Locator, addresses[this.customerDetails.countryCode].billing.address1);
    await Helpers.driverSleep(this.driver, 1000);
    await (await checkoutPage.billingAddress1(this.driver)).sendKeys(Key.TAB);
    await Helpers.enterText(this.driver, checkoutPage.billingAddress2Locator, addresses[this.customerDetails.countryCode].billing.address2);
    await Helpers.enterText(this.driver, checkoutPage.billingCityLocator, addresses[this.customerDetails.countryCode].billing.city);
    await Helpers.enterText(this.driver, checkoutPage.billingPostcodeLocator, addresses[this.customerDetails.countryCode].billing.postcode);
    await checkoutPage.selectBillingCountry(this.driver, addresses[this.customerDetails.countryCode].billing.countryShort);
    if (this.customerDetails.countryCode === 'US' || this.customerDetails.countryCode === 'DE' || this.customerDetails.countryCode === 'AU') {
        await checkoutPage.selectBillingRegion(this.driver, addresses[this.customerDetails.countryCode].billing.region);
    } else {
        await Helpers.enterText(this.driver, checkoutPage.billingRegionLocator, addresses[this.customerDetails.countryCode].billing.region);
    }
    await Helpers.enterText(this.driver, checkoutPage.billingPhoneLocator, addresses[this.customerDetails.countryCode].billing.telephone);
});

defineStep(/^I continue to pay using (?:a|an) ([a-z]+)?$/, { timeout: 2 * 60 * 1000 }, async function (paymentType: string): Promise<void> {
    if (this.platform === 'MOBILE') {
        await Helpers.driverSleep(this.driver, 5 * 1000);
    } else {
        await Helpers.waitUntilElementHasState(this.driver, 'located', checkoutPage.termsCheckboxLocator, 20 * 1000);
    }
    await checkoutPage.acceptTerms(this.driver);
    // TODO: Verify here that the Terms checkbox is clicked and if not retry clicking it
    if (this.platform === 'MOBILE') {
        await Helpers.driverSleep(this.driver, 7 * 1000); // Wait for the total tax value to load properly
        // TODO: Figure out why explicit wait does not seem to be working
    } else {
        await Helpers.driverSleep(this.driver, 7 * 1000); // Wait for the total tax value to load properly
        // TODO: Figure out why explicit wait does not seem to be working
        // await Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.taxLoadingLocator, 10 * 1000);
        // await Helpers.waitUntilElementHasState(this.driver, 'stale', checkoutPage.taxLoadingLocator, 10 * 1000);
        // await Helpers.jsWaitUntilPageLoadComplete(this.driver, 10 * 1000);
    }
    this.orderDetails.cartTotalPrice = await (await checkoutPage.cartTotalPrice(this.driver)).getText();
    console.log(`- Cart Total: ${this.orderDetails.cartTotalPrice}`);
    if (this.orderDetails.discountedOrder) {
        this.orderDetails.discountPrice = await (await checkoutPage.discountPrice(this.driver)).getText();
        console.log(`- Discount: ${this.orderDetails.discountPrice}`);
        this.assert.isAbove(Number(this.orderDetails.discountPrice), 0.00, 'Discount amount should be greater than 0');
        this.orderDetails.subTotalPrice = await (await checkoutPage.subTotalPrice(this.driver)).getText();
        console.log(`- Subtotal: ${this.orderDetails.subTotalPrice}`);
    }
    this.orderDetails.taxPrice = await (await checkoutPage.taxPrice(this.driver)).getText();
    console.log(`- Tax: ${this.orderDetails.taxPrice}`);
    if (this.customerDetails.countryCode !== 'JP') {
        this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
    }
    this.orderDetails.orderTotalPrice = await (await checkoutPage.orderTotalPrice(this.driver)).getText();
    console.log(`- Order total: ${this.orderDetails.orderTotalPrice}`);
    // TODO: Assert that the amount is correct for E2E tests that do not go all the way to ORR validation
    await Helpers.jsScrollToElementAlignTop(this.driver, await checkoutPage.payButton(this.driver));
    await Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.payButtonLocator, 10 * 1000);
    await checkoutPage.selectPayButton(this.driver);
    await Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
    await eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
});

defineStep(/^eCapture is successful$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', thankYouPage.orderNumberLocator, 60 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, thankYouPage.pageTitle, 'Expected Thank You page title not found');
    const orderNumber = await thankYouPage.orderNumber(this.driver);
    const orderNumberText = await orderNumber.getText();
    console.log('- Thank you message displayed - Order no:', orderNumberText);
    this.orderDetails.orderNumberText = orderNumberText;
    const emailAddress = await thankYouPage.emailAddress(this.driver);
    const emailAddressText = (await emailAddress.getText()).toLowerCase();
    this.assert.equal(emailAddressText, this.customerDetails.emailAddress, 'Expected email address not found');
    // TODO - Need to have a good waiting method here for the order to make it in the Order History
    await Helpers.driverSleep(this.driver, 3 * 1000);
});

defineStep(/^The order is displayed in (.*)? Order History$/, { timeout: 8 * 60 * 1000 }, async function (variant: string): Promise<void> {
    const orderHistoryPage = new OrderHistoryPage(variant, testData);
    await orderHistoryPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', orderHistoryPage.orderHistoryHeaderLocator, 60 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, orderHistoryPage.pageTitle, 'Expected Order History page title not found');

    // Validate Order History
    const orderNumberText = await orderHistoryPage.getTopOrderNumber(this.driver);
    this.assert.equal(orderNumberText, this.orderDetails.orderNumberText, 'Expected order number not found in Order History');
    const orderTotalText = await orderHistoryPage.getSpecificOrderTotal(this.driver, this.orderDetails.orderNumberText);
    this.assert.equal(orderTotalText, this.orderDetails.orderTotalPrice, 'Expected order total not found in Order History');

    if (config.platform === 'MOBILE' && config.browserName !== 'ipad') {
        await (await orderHistoryPage.specificOrderMoreInfoLinkMobile(this.driver, this.orderDetails.orderNumberText)).click();
    } else {
        await (await orderHistoryPage.specificOrderMoreInfoArrow(this.driver, this.orderDetails.orderNumberText)).click();
    }

    await Helpers.waitUntilElementHasState(this.driver, 'visible', orderHistoryPage.specificOrderLocatorPrefix + this.orderDetails.orderNumberText + orderHistoryPage.specificOrderItemISBNsLocatorSuffix , 5 * 1000);
    const titleArray = await orderHistoryPage.specificOrderItemTitles(this.driver, this.orderDetails.orderNumberText);
    for (const row of titleArray) {
        const titleText = await row.getText();
        await this.orderHistoryListedTitles.push(titleText);
    }
    const expectedTitles: string = JSON.stringify(this.orderDetails.orderTitles.slice().sort());
    this.assert.equal(JSON.stringify(this.orderHistoryListedTitles.sort()), expectedTitles, 'Incorrect title(s) found on Order History page');

    if (this.orderDetails.productTypes.includes('sdrmEBook') || this.orderDetails.productTypes.includes('vstEBook')) {
        let DownloadArray = await orderHistoryPage.specificOrderItemDownloadMessages(this.driver, this.orderDetails.orderNumberText);
        console.log('- Refreshing page until all Download Links are available');
        // Refreshing page until all the "Download processing. Please check again later." messages have been replaced by SDRM download links
        while (DownloadArray.length > 0) {
            await this.driver.navigate().refresh();
            await Helpers.driverSleep(this.driver, 3 * 1000);
            await Helpers.waitUntilPageTitleContains(this.driver, 'Order History | Elsevier', 60 * 1000);
            DownloadArray = await orderHistoryPage.specificOrderItemDownloadMessages(this.driver, this.orderDetails.orderNumberText);
        }
        console.log('- All Download Links are now available in Order History');
        await Helpers.driverSleep(this.driver, 2 * 1000);
    }

    if (this.orderDetails.productTypes.includes('vstEBook')) {
        const vstDownloadLinksArray = await orderHistoryPage.specificOrderItemVstDownloadLinks(this.driver, this.orderDetails.orderNumberText);
        if (vstDownloadLinksArray.length === 0 && purchasableProducts.vstEBook) {
            throw new Error('No download links found for VST eBook products in Order History: ' + this.orderDetails.orderNumberText);
        }
        for (const row of vstDownloadLinksArray) {
            const vstDownloadLinkAddress = await row.getAttribute('href');
            this.assert.isTrue(orderHistoryPage.vstDownloadUrlRegExp.test(vstDownloadLinkAddress), 'Expected VST download link url not valid');
        }
    }

    if (this.orderDetails.productTypes.includes('sdrmEBook')) {
        const downloadLinksArray = await orderHistoryPage.specificOrderItemSdrmDownloadLinks(this.driver, this.orderDetails.orderNumberText);
        if (downloadLinksArray.length === 0 && purchasableProducts.sdrmEBook) {
            throw new Error('No download links found for SDRM eBook products in Order History: ' + this.orderDetails.orderNumberText);
        }
        for (const row of downloadLinksArray) {
            const downloadLinkAddress = await row.getAttribute('href');
            const splitLinkAddress = downloadLinkAddress.split('/');
            this.assert.oneOf(splitLinkAddress[0] + '//' + splitLinkAddress[2] + '/' + splitLinkAddress[3] + '/',
                [orderHistoryPage.sdrmDownloadUrlPrefix], 'Expected SDRM Bookmark-API url prefix not found');
        }
    }

    const isbnsArray = await orderHistoryPage.specificOrderItemIsbns(this.driver, this.orderDetails.orderNumberText);
    for (const row of isbnsArray) {
        const isbn = await row.getText();
        this.orderHistoryListedIsbns.push(isbn.trim().split(' ').pop());
    }
    // const expectedIsbns: string = JSON.stringify(this.orderDetails.orderIsbns.sort()); TODO: Re-add this validation, once new implementation is working
    // if (this.productFormat !== 'personalJournal' && this.productFormat !== 'institutionalJournal') {
    // if (this.productFormat !== 'personalJournal' && this.productFormat !== 'institutionalJournal') {
    //     this.assert.equal(JSON.stringify(this.orderHistoryListedIsbns.sort()), expectedIsbns, 'Incorrect ISBN(s) found on Order History page');
    //     console.log('- Correct order item ISBN(s) found in Order History');
    // } else {
    //     this.assert.equal(JSON.stringify(this.orderHistoryListedIsbns.sort()), expectedIsbns, 'Incorrect ISSN(s) found on Order History page');
    //     console.log('- Correct order item ISSN(s) found in Order History');
    // }

});

defineStep(/^eCapture is accessible$/, async function (): Promise<void> {
    await checkoutPage.acceptTerms(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', checkoutPage.taxPriceLocator, 10 * 1000);
    this.orderDetails.orderTotalPrice = await (await checkoutPage.orderTotalPrice(this.driver)).getText();
    await checkoutPage.selectPayButton(this.driver);
    await Helpers.jsWaitUntilPageLoadComplete(this.driver, 20 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
});
