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
class PayPalPage {
    constructor() {
        this.submitButtonLocator = '#confirmButtonTop';
        this.merchantReturnButtonLocator = '#merchantReturnBtn';
    }
    submitButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.submitButtonLocator);
        });
    }
    submitButtonClick(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.submitButton(driver)).click();
        });
    }
    merchantReturnButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.merchantReturnButtonLocator);
        });
    }
    merchantReturnButtonClick(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.merchantReturnButton(driver)).click();
        });
    }
    pay(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.submitButtonLocator, 40 * 1000);
            driver.sleep(10 * 1000);
            yield this.submitButtonClick(driver);
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.merchantReturnButtonLocator, 60 * 1000);
            driver.sleep(10 * 1000);
            yield this.merchantReturnButtonClick(driver);
        });
    }
}
exports.PayPalPage = PayPalPage;
//# sourceMappingURL=payPalPage.js.map