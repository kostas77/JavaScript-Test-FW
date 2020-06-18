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
const helpers_1 = require("../../../support/helpers");
class ThankYouPage {
    constructor() {
        this.pageTitle = 'Thank you | Elsevier';
        this.thankYouText = 'Thank you for your order!';
        this.thankYouMessageLocator = '#maincontent > div > div > h2';
        this.orderNumberMessageLocator = '#maincontent > div > div > div > h3';
        this.orderNumberLocator = '.order-number';
        this.confirmationEmailMessageLocator = '#maincontent > div > div > div > p';
        this.emailAddressLocator = '.email';
    }
    thankYouMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.thankYouMessageLocator);
        });
    }
    orderNumberMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderNumberMessageLocator);
        });
    }
    confirmationEmailMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.confirmationEmailMessageLocator);
        });
    }
    emailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.emailAddressLocator);
        });
    }
    orderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderNumberLocator);
        });
    }
}
exports.ThankYouPage = ThankYouPage;
//# sourceMappingURL=thankYouPage.js.map