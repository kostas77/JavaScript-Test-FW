import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import { RenewalsHomePage } from '../../common/pages/ElsevierRenewals/renewalsHomePage';
import { RenewalsDetailPage } from '../../common/pages/ElsevierRenewals/renewalsDetailPage';
import { ElsevierECapturePage } from '../../common/pages/eCapture/elsevierECapturePage';
import { RenewalsThankYouPage } from '../../common/pages/ElsevierRenewals/renewalsThankYouPage';
import { TestData } from '../support/testData';
import { IDeltaRenewalToPurchase, IArgiOrAirBusinessRenewalToPurchase } from '../../common/support/interfaces';

const testData = new TestData();
const renewalsHomePage = new RenewalsHomePage(testData);
const renewalsDetailPage = new RenewalsDetailPage();
const elsevierECapturePage = new ElsevierECapturePage();
const renewalsThankYouPage = new RenewalsThankYouPage();


defineStep(/^I am on the renewals home page$/, async function (): Promise<void> {
    await renewalsHomePage.visitPage(this.driver);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, renewalsHomePage.pageTitle, 'Expected Renewals Home page title not found');
});

defineStep(/^I have (?:a|an) (.*)? renewal ready to renew$/, async function (renewalType: string): Promise<void> {
    this.orderDetails.orderTotalItems = 1;
    this.orderDetails.productTypes = [];
    if (renewalType === 'Delta') {
        this.orderDetails.productTypes.push('deltaJournal');
        const deltaRenewalToPurchase: IDeltaRenewalToPurchase = testData.getDeltaRenewalsDataFor().deltaRenewalsToPurchase.find(currentDeltaRenewal => currentDeltaRenewal.email === this.customerDetails.emailAddress);
        await renewalsHomePage.enterDeltaRenewalDetails(this.driver, deltaRenewalToPurchase.invoiceNumber, deltaRenewalToPurchase.billingAccount);
        console.log(`- Invoice Number: ${deltaRenewalToPurchase.invoiceNumber} , Billing Account: ${deltaRenewalToPurchase.billingAccount}`);
    }
    if (renewalType === 'ARGI' || renewalType === 'AirBusiness') {
        renewalType === 'ARGI' ? this.orderDetails.productTypes.push('argiJournal') : this.orderDetails.productTypes.push('airBusinessJournal');
        const argiOrAirBusinessRenewalToPurchase: IArgiOrAirBusinessRenewalToPurchase = testData.getArgiOrAirBusinessRenewalsDataFor().argiOrAirBusinessRenewalsToPurchase.find(currentArgiOrAirBusinessRenewal => currentArgiOrAirBusinessRenewal.email === this.customerDetails.emailAddress);
        await renewalsHomePage.enterArgiOrAirBusinessRenewalDetails(this.driver, argiOrAirBusinessRenewalToPurchase.accountNumber, argiOrAirBusinessRenewalToPurchase.publicationCode);
        console.log(`- Account Number: ${argiOrAirBusinessRenewalToPurchase.accountNumber} , Publication Code: ${argiOrAirBusinessRenewalToPurchase.publicationCode}`);
    }
    await Helpers.waitUntilElementHasState(this.driver, 'located', renewalsDetailPage.tAndCCheckboxLocator, 10 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, renewalsDetailPage.pageTitle, 'Expected Renewals Details page title not found');
});

defineStep(/^I accept the renewal$/, async function (): Promise<void> {
    await renewalsDetailPage.selectAllRenewalsCheckbox(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'enabled', renewalsDetailPage.tAndCCheckboxLocator);
    this.orderDetails.cartTotalPrice = await Helpers.removeCurrencySymbol(await (await renewalsDetailPage.cartTotalPrice(this.driver)).getText());
    console.log(`- Cart Total: ${this.orderDetails.cartTotalPrice}`);
    if (this.orderDetails.discountedOrder) {
        this.orderDetails.discountPrice = await Helpers.removeCurrencySymbol(await (await renewalsDetailPage.discountPrice(this.driver)).getText());
        console.log(`- Discount: ${this.orderDetails.discountPrice}`);
        this.assert.isAbove(Number(this.orderDetails.discountPrice), 0.00, 'Discount amount should be greater than 0');
        this.orderDetails.subTotalPrice = await Helpers.removeCurrencySymbol(await (await renewalsDetailPage.subTotalPrice(this.driver)).getText());
        console.log(`- Subtotal: ${this.orderDetails.subTotalPrice}`);
    }
    this.orderDetails.taxPrice = await Helpers.removeCurrencySymbol(await (await renewalsDetailPage.taxPrice(this.driver)).getText());
    console.log(`- Tax: ${this.orderDetails.taxPrice}`);
    // if (this.customerDetails.countryCode !== 'JP') {
    //     this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
    // }
    this.orderDetails.orderTotalPrice = await Helpers.removeCurrencySymbol(await (await renewalsDetailPage.orderTotalPrice(this.driver)).getText());
    console.log(`- Order total: ${this.orderDetails.orderTotalPrice}`);
    await renewalsDetailPage.selectTermsAndConditionsCheckbox(this.driver);
    await Helpers.driverSleep(this.driver, 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', renewalsDetailPage.proceedToCheckoutButtonLocator);
    await Helpers.waitUntilElementHasState(this.driver, 'enabled', renewalsDetailPage.proceedToCheckoutButtonLocator);
    await renewalsDetailPage.clickProceedToCheckoutButton(this.driver);
});

defineStep(/^I am taken to the eCapture page$/, { timeout: 20 * 1000 }, async function (): Promise<void> {
    await Helpers.driverSleep(this.driver, 5 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', elsevierECapturePage.orderSummaryHeaderLocator, 20 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'enabled', elsevierECapturePage.submitButtonLocator, 10 * 1000);
    await Helpers.driverSleep(this.driver, 2 * 1000);
    const orderSummaryHeader = await elsevierECapturePage.orderSummaryHeader(this.driver);
    const orderSummaryHeaderText = await orderSummaryHeader.getText();
    this.assert.equal(orderSummaryHeaderText, elsevierECapturePage.orderSummaryHeaderText, 'Expected order summary header not found');
});

defineStep(/^The correct (.*)? renewal details are displayed$/, async function (renewalType: string): Promise<void> {
    // TODO - Need to expand this out to cover full renewal item details in future
    let agentName: string;
    if (renewalType === 'Delta') {
        const deltaRenewalToPurchase: IDeltaRenewalToPurchase = testData.getDeltaRenewalsDataFor().deltaRenewalsToPurchase.find(currentDeltaRenewal => currentDeltaRenewal.email === this.customerDetails.emailAddress);
        agentName = deltaRenewalToPurchase.agentName;
    } if (renewalType === 'ARGI' || renewalType === 'AirBusiness') {
        const argiOrAirBusinessRenewalToPurchase: IArgiOrAirBusinessRenewalToPurchase = testData.getArgiOrAirBusinessRenewalsDataFor().argiOrAirBusinessRenewalsToPurchase.find(currentArgiOrAirBusinessRenewal => currentArgiOrAirBusinessRenewal.email === this.customerDetails.emailAddress);
        agentName = argiOrAirBusinessRenewalToPurchase.agentName;
    }
    const welcomeMessage = await elsevierECapturePage.welcomeMessage(this.driver);
    const welcomeMessageText = await welcomeMessage.getText();
    this.assert.equal(welcomeMessageText.trim(), elsevierECapturePage.welcomeMessageTextPrefix + agentName, 'Expected welcome message not found');
});

defineStep(/^I am making a payment using a (.*)?$/, { timeout: 2 * 60 * 1000 }, async function (paymentType: string): Promise<void> {
    await elsevierECapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
});

defineStep(/^eCapture succeeds$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', renewalsThankYouPage.orderNumberLocator, 60 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, renewalsThankYouPage.pageTitle, 'Expected Thank You page title not found');
    const orderNumber = await renewalsThankYouPage.orderNumber(this.driver);
    const orderNumberText = await orderNumber.getText();
    console.log('- Thank you message displayed - Order no:', orderNumberText);
    this.orderDetails.orderNumberText = orderNumberText;
    // const emailAddress = await renewalsThankYouPage.emailAddress(this.driver);
    // const emailAddressText = (await emailAddress.getText()).toLowerCase();
    // this.assert.equal(emailAddressText, this.customerDetails.emailAddress, 'Expected email address not found'); //TODO - Currently the e-mail address is not displayed on the Renewals thank you page
});

