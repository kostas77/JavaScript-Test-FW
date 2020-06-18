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
const renewalsHomePage_1 = require("../../common/pages/ElsevierRenewals/renewalsHomePage");
const renewalsDetailPage_1 = require("../../common/pages/ElsevierRenewals/renewalsDetailPage");
const elsevierECapturePage_1 = require("../../common/pages/eCapture/elsevierECapturePage");
const renewalsThankYouPage_1 = require("../../common/pages/ElsevierRenewals/renewalsThankYouPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const renewalsHomePage = new renewalsHomePage_1.RenewalsHomePage(testData);
const renewalsDetailPage = new renewalsDetailPage_1.RenewalsDetailPage();
const elsevierECapturePage = new elsevierECapturePage_1.ElsevierECapturePage();
const renewalsThankYouPage = new renewalsThankYouPage_1.RenewalsThankYouPage();
cucumber_1.Given(/^I am on the renewals home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield renewalsHomePage.visitPage(this.driver);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, renewalsHomePage.pageTitle, 'Expected Renewals Home page title not found');
    });
});
cucumber_1.Given(/^I have (?:a|an) (.*)? renewal ready to renew$/, function (renewalType) {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.orderTotalItems = 1;
        this.orderDetails.productTypes = [];
        if (renewalType === 'Delta') {
            this.orderDetails.productTypes.push('deltaJournal');
            const deltaRenewalToPurchase = testData.getDeltaRenewalsDataFor().deltaRenewalsToPurchase.find(currentDeltaRenewal => currentDeltaRenewal.email === this.customerDetails.emailAddress);
            yield renewalsHomePage.enterDeltaRenewalDetails(this.driver, deltaRenewalToPurchase.invoiceNumber, deltaRenewalToPurchase.billingAccount);
            console.log(`- Invoice Number: ${deltaRenewalToPurchase.invoiceNumber} , Billing Account: ${deltaRenewalToPurchase.billingAccount}`);
        }
        else if (renewalType === 'ARGI') {
            this.orderDetails.productTypes.push('argiJournal');
            const argiRenewalToPurchase = testData.getArgiRenewalsDataFor().argiRenewalsToPurchase.find(currentArgiRenewal => currentArgiRenewal.email === this.customerDetails.emailAddress);
            yield renewalsHomePage.enterArgiRenewalDetails(this.driver, argiRenewalToPurchase.accountNumber, argiRenewalToPurchase.publicationCode);
            console.log(`- Account Number: ${argiRenewalToPurchase.accountNumber} , Publication Code: ${argiRenewalToPurchase.publicationCode}`);
        }
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', renewalsDetailPage.tAndCCheckboxLocator, 10 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, renewalsDetailPage.pageTitle, 'Expected Renewals Details page title not found');
    });
});
cucumber_1.When(/^I accept the renewal$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield renewalsDetailPage.selectAllRenewalsCheckbox(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'enabled', renewalsDetailPage.tAndCCheckboxLocator);
        this.orderDetails.cartTotalPrice = yield helpers_1.Helpers.removeCurrencySymbol(yield (yield renewalsDetailPage.cartTotalPrice(this.driver)).getText());
        console.log(`- Cart Total: ${this.orderDetails.cartTotalPrice}`);
        if (this.orderDetails.discountedOrder) {
            this.orderDetails.discountPrice = yield helpers_1.Helpers.removeCurrencySymbol(yield (yield renewalsDetailPage.discountPrice(this.driver)).getText());
            console.log(`- Discount: ${this.orderDetails.discountPrice}`);
            this.assert.isAbove(Number(this.orderDetails.discountPrice), 0.00, 'Discount amount should be greater than 0');
            this.orderDetails.subTotalPrice = yield helpers_1.Helpers.removeCurrencySymbol(yield (yield renewalsDetailPage.subTotalPrice(this.driver)).getText());
            console.log(`- Subtotal: ${this.orderDetails.subTotalPrice}`);
        }
        this.orderDetails.taxPrice = yield helpers_1.Helpers.removeCurrencySymbol(yield (yield renewalsDetailPage.taxPrice(this.driver)).getText());
        console.log(`- Tax: ${this.orderDetails.taxPrice}`);
        this.orderDetails.orderTotalPrice = yield helpers_1.Helpers.removeCurrencySymbol(yield (yield renewalsDetailPage.orderTotalPrice(this.driver)).getText());
        console.log(`- Order total: ${this.orderDetails.orderTotalPrice}`);
        yield renewalsDetailPage.selectTermsAndConditionsCheckbox(this.driver);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', renewalsDetailPage.proceedToCheckoutButtonLocator);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'enabled', renewalsDetailPage.proceedToCheckoutButtonLocator);
        yield renewalsDetailPage.clickProceedToCheckoutButton(this.driver);
    });
});
cucumber_1.Then(/^I am taken to the eCapture page$/, { timeout: 20 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', elsevierECapturePage.orderSummaryHeaderLocator, 20 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'enabled', elsevierECapturePage.submitButtonLocator, 10 * 1000);
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
        const orderSummaryHeader = yield elsevierECapturePage.orderSummaryHeader(this.driver);
        const orderSummaryHeaderText = yield orderSummaryHeader.getText();
        this.assert.equal(orderSummaryHeaderText, elsevierECapturePage.orderSummaryHeaderText, 'Expected order summary header not found');
    });
});
cucumber_1.Then(/^The correct (.*)? renewal details are displayed$/, function (renewalType) {
    return __awaiter(this, void 0, void 0, function* () {
        let agentName;
        if (renewalType === 'Delta') {
            const deltaRenewalToPurchase = testData.getDeltaRenewalsDataFor().deltaRenewalsToPurchase.find(currentDeltaRenewal => currentDeltaRenewal.email === this.customerDetails.emailAddress);
            agentName = deltaRenewalToPurchase.agentName;
        }
        if (renewalType === 'ARGI') {
            const argiRenewalToPurchase = testData.getArgiRenewalsDataFor().argiRenewalsToPurchase.find(currentArgiRenewal => currentArgiRenewal.email === this.customerDetails.emailAddress);
            agentName = argiRenewalToPurchase.agentName;
        }
        const welcomeMessage = yield elsevierECapturePage.welcomeMessage(this.driver);
        const welcomeMessageText = yield welcomeMessage.getText();
        this.assert.equal(welcomeMessageText.trim(), elsevierECapturePage.welcomeMessageTextPrefix + agentName, 'Expected welcome message not found');
    });
});
cucumber_1.Then(/^I am making a payment using a (.*)?$/, { timeout: 2 * 60 * 1000 }, function (paymentType) {
    return __awaiter(this, void 0, void 0, function* () {
        yield elsevierECapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
    });
});
cucumber_1.Then(/^eCapture succeeds$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', renewalsThankYouPage.orderNumberLocator, 60 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, renewalsThankYouPage.pageTitle, 'Expected Thank You page title not found');
        const orderNumber = yield renewalsThankYouPage.orderNumber(this.driver);
        const orderNumberText = yield orderNumber.getText();
        console.log('- Thank you message displayed - Order no:', orderNumberText);
        this.orderDetails.orderNumberText = orderNumberText;
    });
});
//# sourceMappingURL=renewalsSteps.js.map