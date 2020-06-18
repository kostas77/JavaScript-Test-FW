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
const commonTestData_1 = require("../../support/commonTestData");
class ElsevierECapturePage {
    constructor() {
        this.pageTitle = 'Elsevier Secure Payment';
        this.orderSummaryHeaderLocator = '.sectionHeader.ng-binding';
        this.orderSummaryHeaderText = 'Cardholder Details';
        this.welcomeMessageLocator = '.welcome';
        this.welcomeMessageTextPrefix = 'Welcome ';
        this.backButtonLocator = '.go-back-to-store';
        this.cardholderNameLocator = '#input-cardholder-family-name';
        this.visaCardTypeLocator = '#input-card-type > option:nth-child(2)';
        this.mastercardCardTypeLocator = '#input-card-type > option:nth-child(3)';
        this.amexCardTypeLocator = '#input-card-type > option:nth-child(4)';
        this.jcbCardTypeLocator = '#input-card-type > option:nth-child(5)';
        this.cardNumberLocator = '#input-card-number';
        this.cvvLocator = '#input-cvv-number';
        this.futureMonthLocator = '#input-expiry-month';
        this.futureYearLocator = '#input-expiry-year';
        this.termsCheckboxLocator = '#tandcCheckBox';
        this.submitButtonLocator = '.button-style-additional';
    }
    orderSummaryHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderSummaryHeaderLocator);
        });
    }
    welcomeMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.welcomeMessageLocator);
        });
    }
    cardholderName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cardholderNameLocator);
        });
    }
    enterCardholderName(driver, cardholderFullName) {
        return __awaiter(this, void 0, void 0, function* () {
            return helpers_1.Helpers.enterText(driver, this.cardholderNameLocator, cardholderFullName);
        });
    }
    cardTypeLocator(driver, cardType) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (cardType) {
                case 'visa':
                    return yield helpers_1.Helpers.getElement(driver, this.visaCardTypeLocator);
                case 'mastercard':
                    return yield helpers_1.Helpers.getElement(driver, this.mastercardCardTypeLocator);
                case 'amex':
                    return yield helpers_1.Helpers.getElement(driver, this.amexCardTypeLocator);
                case 'jcb':
                    return yield helpers_1.Helpers.getElement(driver, this.jcbCardTypeLocator);
                default:
                    throw new Error('Unknown card type requested');
            }
        });
    }
    selectCardType(driver, cardType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.cardTypeLocator(driver, cardType)).click();
        });
    }
    enterCardNumber(driver, cardNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return helpers_1.Helpers.enterText(driver, this.cardNumberLocator, cardNumber.toString());
        });
    }
    selectExpiryDateMonth(driver, expDateMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]');
        });
    }
    enterCardCode(driver, cardCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return helpers_1.Helpers.enterText(driver, this.cvvLocator, cardCode.toString());
        });
    }
    selectExpiryDateYear(driver, expDateYear) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]');
        });
    }
    clickTermsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.termsCheckboxLocator)).click();
        });
    }
    submitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.submitButtonLocator);
        });
    }
    selectSubmitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.executeScript(`document.querySelector('${this.submitButtonLocator}').click();`);
        });
    }
    backButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.backButtonLocator);
        });
    }
    selectBackButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.backButton(driver)).click();
        });
    }
    enterPaymentDetails(driver, customerDetails, creditCardType) {
        return __awaiter(this, void 0, void 0, function* () {
            let creditCardNumber = '';
            let creditCardCode = '';
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.cardholderNameLocator, 20 * 1000);
            yield this.enterCardholderName(driver, customerDetails.fullName);
            yield this.selectCardType(driver, creditCardType);
            switch (creditCardType) {
                case 'visa':
                    creditCardNumber = commonTestData_1.creditCardDetails.visa;
                    creditCardCode = commonTestData_1.creditCardDetails.cvv;
                    break;
                case 'mastercard':
                    creditCardNumber = commonTestData_1.creditCardDetails.mastercard;
                    creditCardCode = commonTestData_1.creditCardDetails.cvv;
                    break;
                case 'amex':
                    creditCardNumber = commonTestData_1.creditCardDetails.amex;
                    creditCardCode = commonTestData_1.creditCardDetails.cid;
                    break;
                case 'jcb':
                    creditCardNumber = commonTestData_1.creditCardDetails.jcb;
                    creditCardCode = commonTestData_1.creditCardDetails.cvv;
                    break;
                default:
                    throw new Error('Unknown credit card type specified: ' + creditCardType);
            }
            yield this.enterCardNumber(driver, creditCardNumber);
            yield this.enterCardCode(driver, creditCardCode);
            yield this.selectExpiryDateMonth(driver, commonTestData_1.creditCardDetails.expDateMonth);
            if (customerDetails.countryCode !== 'AU') {
                yield this.selectExpiryDateYear(driver, commonTestData_1.creditCardDetails.expDateYear);
            }
            else {
                yield this.selectExpiryDateYear(driver, commonTestData_1.creditCardDetails.expDateYearShort);
            }
            yield this.clickTermsCheckbox(driver);
            yield this.selectSubmitButton(driver);
        });
    }
}
exports.ElsevierECapturePage = ElsevierECapturePage;
//# sourceMappingURL=elsevierECapturePage.js.map