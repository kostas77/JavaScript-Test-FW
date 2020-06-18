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
const helpers_1 = require("../../support/helpers");
class RenewalsHomePage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().renewals.home;
        this.pageTitle = 'Enter your renewal references | Elsevier';
        this.invoiceNumberLocator = '#renewals-delta-invoice';
        this.billingAccountLocator = '#renewals-delta-billing-id';
        this.accountNumberLocator = '#renewals-argi-reference';
        this.publicationCodeLocator = '#renewals-argi-pubcode';
        this.submitButtonLocator = '#update-form-submit';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    enterInvoiceNumber(driver, invoiceNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.invoiceNumberLocator, invoiceNumber);
        });
    }
    enterBillingAccount(driver, billingAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.billingAccountLocator, billingAccount);
        });
    }
    enterAccountNumber(driver, accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.accountNumberLocator, accountNumber);
        });
    }
    enterPublicationCode(driver, publicationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.publicationCodeLocator, publicationCode);
        });
    }
    clickSubmitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.submitButtonLocator);
        });
    }
    enterDeltaRenewalDetails(driver, invoiceNumber, billingAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterInvoiceNumber(driver, invoiceNumber);
            yield this.enterBillingAccount(driver, billingAccount);
            return yield this.clickSubmitButton(driver);
        });
    }
    enterArgiRenewalDetails(driver, accountNumber, publicationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterAccountNumber(driver, accountNumber);
            yield this.enterPublicationCode(driver, publicationCode);
            return yield this.clickSubmitButton(driver);
        });
    }
}
exports.RenewalsHomePage = RenewalsHomePage;
//# sourceMappingURL=renewalsHomePage.js.map