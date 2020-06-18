import { defineStep } from 'cucumber';
import { Key } from 'selenium-webdriver';
import { Helpers } from '../../common/support/helpers';
import { SdCartPage } from '../../common/pages/ScienceDirectStore/cartPage';
import { SdAuthorisationPage } from '../../common/pages/ScienceDirectStore/authorisationPage';
import { SdCheckoutPage } from '../../common/pages/ScienceDirectStore/checkoutPage';
import { SdThankYouPage } from '../../common/pages/ScienceDirectStore/thankYouPage';
import { ElsevierECapturePage } from '../../common/pages/eCapture/elsevierECapturePage';
import { SdOrderHistoryPage } from '../../common/pages/ScienceDirectStore/orderHistoryPage';
import { SdOrderReceiptPage } from '../../common/pages/ScienceDirectStore/orderReceiptPage';
import { addresses } from '../../common/support/addressesData';
import { TestData } from '../support/testData';

const testData = new TestData();
const sdCartPage = new SdCartPage(testData);
const sdAuthorisationPage = new SdAuthorisationPage();
const sdCheckoutPage = new SdCheckoutPage();
const eCapturePage = new ElsevierECapturePage();
const sdThankYouPage = new SdThankYouPage(testData);
const sdOrderHistoryPage = new SdOrderHistoryPage(testData);
const sdOrderReceiptPage = new SdOrderReceiptPage(testData);

// const config = new DriverConfig();

defineStep(/^I login on the SD authorisation page$/, async function (): Promise<void> {
    // TODO: Assert that the correct page is loaded
    await sdAuthorisationPage.enterSignInEmailAddress(this.driver, this.customerDetails.emailAddress);
    await sdAuthorisationPage.clickContinueButton(this.driver);
    await sdAuthorisationPage.enterSignInPassword(this.driver, this.customerDetails.password);
    await sdAuthorisationPage.clickSignInButton(this.driver);
});

defineStep(/^I proceed to the SD checkout page$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', sdCartPage.proceedToCheckoutLocator, 10 * 1000);
    await Helpers.driverSleep(this.driver, 1000);
    await sdCartPage.clickProceedToCheckoutButton(this.driver);
    // await Helpers.waitUntilElementHasState(this.driver, 'clickable', sdCheckoutPage.loginButtonLocator, 20 * 1000);
    // const pageTitle = await Helpers.getPageTitle(this.driver);
    // this.assert.equal(pageTitle, sdCheckoutPage.pageTitle, 'Expected checkout page title not found');
});

defineStep(/^I enter my shipping and billing address details on the SD checkout page$/, { timeout: 2 * 60 * 1000 }, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', sdCheckoutPage.shippingAddressLabelLocator, 7 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, sdCheckoutPage.pageTitle, 'Expected Checkout page title not found');
    const address = addresses[this.customerDetails.countryCode];
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingFirstNameLocator, address.shipping.firstName);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingLastNameLocator, address.shipping.lastName);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingAddress1Locator, address.shipping.address1);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingAddress2Locator, address.shipping.address2);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingCityLocator, address.shipping.city);
    await Helpers.enterText(this.driver, sdCheckoutPage.shippingPostcodeLocator, address.shipping.postcode);
    await sdCheckoutPage.selectShippingCountry(this.driver, address.shipping.countryShort);
    await sdCheckoutPage.selectShippingRegion(this.driver, address.shipping.region);

    await Helpers.jsScrollToElementAlignTop(this.driver, await sdCheckoutPage.sameAddressCheckbox(this.driver));
    const checkboxState = await (await sdCheckoutPage.sameAddressCheckbox(this.driver)).isSelected();
    await Helpers.driverSleep(this.driver, 1000);
    if (checkboxState === true) {
        await Helpers.jsClickOnElement(this.driver, await sdCheckoutPage.sameAddressCheckbox(this.driver));
        await Helpers.driverSleep(this.driver, 1000);
    }

    await Helpers.enterText(this.driver, sdCheckoutPage.billingFirstNameLocator, address.billing.firstName);
    await Helpers.enterText(this.driver, sdCheckoutPage.billingLastNameLocator, address.billing.lastName);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.billingAddress1Locator, address.billing.address1);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.billingAddress2Locator, address.billing.address2);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.billingCityLocator, address.billing.city);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.enterText(this.driver, sdCheckoutPage.billingPostcodeLocator, address.billing.postcode);
    await sdCheckoutPage.selectBillingCountry(this.driver, address.billing.countryShort);
    await sdCheckoutPage.selectBillingRegion(this.driver, address.billing.region);
    await (await sdCheckoutPage.billingPostcode(this.driver)).sendKeys(Key.TAB);
    await Helpers.driverSleep(this.driver, 2 * 1000);
});

defineStep(/^I continue to pay in SD$/, { timeout: 2 * 60 * 1000 }, async function (): Promise<void> {
    this.orderDetails.subTotalPrice = (await (await sdCheckoutPage.subTotalPrice(this.driver)).getText()).slice(3);
    console.log(`- Subtotal: US$ ${this.orderDetails.subTotalPrice}`);
    this.orderDetails.taxPrice = (await (await sdCheckoutPage.taxTotalPrice(this.driver)).getText()).slice(3);
    console.log(`- Tax: US$ ${this.orderDetails.taxPrice}`);
    this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
    this.orderDetails.orderTotalPrice = (await (await sdCheckoutPage.orderTotalPrice(this.driver)).getText()).slice(3);
    console.log(`- Order total: US$ ${this.orderDetails.orderTotalPrice}`);
    await Helpers.jsScrollToElementAlignTop(this.driver, await sdCheckoutPage.payNowButton(this.driver));
    await Helpers.waitUntilElementHasState(this.driver, 'clickable', sdCheckoutPage.payNowButtonLocator, 10 * 1000);
    await sdCheckoutPage.selectPayNowButton(this.driver);
    await Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
    await eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, 'mastercard');
});

defineStep(/^The order is displayed correctly in Order History$/, { timeout: 8 * 60 * 1000 }, async function (): Promise<void> {
    await sdOrderHistoryPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', sdOrderHistoryPage.orderHistoryHeaderLocator, 10 * 1000);

    // SD Order history validation
    const sdOrderHistoryPageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(sdOrderHistoryPageTitle, sdOrderHistoryPage.pageTitle, 'Expected SD Order History page title not found');
    // Can be a slight delay while the order is submitted; wait for it to appear.
    await sdOrderHistoryPage.waitForOrder(this.driver, this.orderDetails.orderNumberText);
    await sdOrderHistoryPage.clickSpecificOrderShowReceiptLink(this.driver, this.orderDetails.orderNumberText);
    await Helpers.waitUntilElementHasState(this.driver, 'located', sdOrderReceiptPage.returnToOrderHistoryLinkLocator, 10 * 1000);
    const sdOrderReceiptPageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(sdOrderReceiptPageTitle, sdOrderReceiptPage.pageTitle, 'Expected SD Order Receipt page title not found');

    // SD Order receipt validation
    const sdReceiptOrderNumber = await sdOrderReceiptPage.getOrderNumber(this.driver);
    this.assert.equal(sdReceiptOrderNumber, this.orderDetails.orderNumberText, 'Expected order number not found in Order Receipt');
    const sdReceiptSubTotalPrice = await sdOrderReceiptPage.getSubTotal(this.driver);
    this.assert.equal(sdReceiptSubTotalPrice, this.orderDetails.subTotalPrice, 'Expected subtotal price not found in Order Receipt');
    const sdReceiptTaxPrice = await sdOrderReceiptPage.getTaxTotal(this.driver);
    this.assert.equal(sdReceiptTaxPrice, this.orderDetails.taxPrice, 'Expected tax price not found in Order Receipt');
    const sdReceiptOrderTotal = await sdOrderReceiptPage.getOrderTotal(this.driver);
    this.assert.equal(sdReceiptOrderTotal, this.orderDetails.orderTotalPrice, 'Expected order total price not found in Order Receipt');

});


defineStep(/^eCapture is successful in SD$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', sdThankYouPage.orderNumberLocator, 60 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, sdThankYouPage.pageTitle, 'Expected Thank You page title not found');
    const orderNumber = await sdThankYouPage.orderNumber(this.driver);
    const orderNumberText = await orderNumber.getText();
    console.log('- Thank you message displayed - Order no:', orderNumberText);
    this.orderDetails.orderNumberText = orderNumberText;
    const emailAddress = await sdThankYouPage.emailAddress(this.driver);
    const emailAddressText = (await emailAddress.getText()).toLowerCase();
    this.assert.equal(emailAddressText, this.customerDetails.emailAddress, 'Expected email address not found');
});
