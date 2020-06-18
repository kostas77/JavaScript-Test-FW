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
class RegionalGlobalCollectPage {
    constructor() {
        this.globalCollectIFrameLocator = '#globalcollect-iframe';
        this.cardNumberLocator = '#F1009';
        this.futureMonthLocator = '#F1010_MM';
        this.futureYearLocator = '#F1010_YY';
        this.cvvLocator = '#F1136';
        this.submitButtonLocator = '#btnSubmit';
    }
    globalCollectIFrame(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.globalCollectIFrameLocator);
        });
    }
    enterCardNumber(driver, cardNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.cardNumberLocator)).sendKeys(cardNumber.toString());
        });
    }
    enterCvvNumber(driver, cvvNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.cvvLocator)).sendKeys(cvvNumber.toString());
        });
    }
    selectExpiryDateMonth(driver, expDateMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]')).click();
        });
    }
    selectExpiryDateYear(driver, expDateYear) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]')).click();
        });
    }
    submitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.submitButtonLocator);
        });
    }
    selectSubmitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.submitButton(driver)).click();
        });
    }
    enterPaymentDetails(driver, creditCardType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.switchTo().frame(yield this.globalCollectIFrame(driver));
            let creditCardNumber = '';
            switch (creditCardType) {
                case 'visa':
                    creditCardNumber = commonTestData_1.creditCardDetails.visa;
                    break;
                case 'masterCard':
                    creditCardNumber = commonTestData_1.creditCardDetails.mastercard;
                    break;
                case 'amEx':
                    creditCardNumber = commonTestData_1.creditCardDetails.amex;
                    break;
                default:
                    throw new Error('Unknown credit card type specified: ' + creditCardType);
            }
            yield this.enterCardNumber(driver, creditCardNumber);
            yield this.enterCvvNumber(driver, commonTestData_1.creditCardDetails.cvv);
            yield this.selectExpiryDateMonth(driver, commonTestData_1.creditCardDetails.expDateMonth);
            yield this.selectExpiryDateYear(driver, commonTestData_1.creditCardDetails.expDateYearShort);
            yield this.selectSubmitButton(driver);
        });
    }
}
exports.RegionalGlobalCollectPage = RegionalGlobalCollectPage;
//# sourceMappingURL=regionalGlobalCollectPage.js.map