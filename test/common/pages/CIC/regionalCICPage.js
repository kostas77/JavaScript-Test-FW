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
class RegionalCICPage {
    constructor() {
        this.cardNumberLocator = '#Ecom_Payment_Card_Number';
        this.cvvLocator = '#Ecom_Payment_Card_Verification';
        this.futureMonthLocator = '#Ecom_Payment_Card_ExpDate_Month';
        this.futureYearLocator = '#Ecom_Payment_Card_ExpDate_Year';
        this.submitButtonLocator = '.blocboutons .image';
    }
    enterCardNumber(driver, cardNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.cardNumberLocator)).sendKeys(cardNumber.toString());
        });
    }
    selectExpiryDateMonth(driver, expDateMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]')).click();
        });
    }
    enterCardCode(driver, cardCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.cvvLocator)).sendKeys(cardCode.toString());
        });
    }
    selectExpiryDateYear(driver, expDateYear) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]')).click();
        });
    }
    selectSubmitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.submitButtonLocator)).click();
        });
    }
    enterPaymentDetails(driver, creditCardType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.submitButtonLocator, 40 * 1000);
            let creditCardNumber = '';
            let creditCardCode = '';
            switch (creditCardType) {
                case 'visa':
                    creditCardNumber = commonTestData_1.CICDebitCard.visa;
                    creditCardCode = commonTestData_1.CICDebitCard.cvv;
                    break;
                default:
                    throw new Error('Unknown credit card type specified: ' + creditCardType);
            }
            yield this.enterCardNumber(driver, creditCardNumber);
            yield this.enterCardCode(driver, creditCardCode);
            yield this.selectExpiryDateMonth(driver, commonTestData_1.CICDebitCard.expDateMonth);
            yield this.selectExpiryDateYear(driver, commonTestData_1.CICDebitCard.expDateYear);
            yield this.selectSubmitButton(driver);
        });
    }
}
exports.RegionalCICPage = RegionalCICPage;
//# sourceMappingURL=regionalCICPage.js.map