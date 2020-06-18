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
class PayPalLoginPage {
    constructor(testData) {
        this.testData = testData;
        this.usernameLocator = '#email';
        this.passwordLocator = '#password';
        this.loginButtonLocator = '#btnLogin';
    }
    username(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.usernameLocator);
        });
    }
    enterLoginEmail(driver, email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.username(driver)).clear();
            return yield (yield this.username(driver)).sendKeys(email);
        });
    }
    password(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.passwordLocator);
        });
    }
    enterLoginPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.password(driver)).sendKeys(password);
        });
    }
    loginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginButtonLocator);
        });
    }
    selectloginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginButton(driver)).click();
        });
    }
    enterLoginDetails(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.usernameLocator, 60 * 1000);
            yield this.enterLoginEmail(driver, this.testData.getDataFor().payPalAccount.email);
            yield this.enterLoginPassword(driver, this.testData.getDataFor().payPalAccount.password);
            yield this.selectloginButton(driver);
            return;
        });
    }
}
exports.PayPalLoginPage = PayPalLoginPage;
//# sourceMappingURL=payPalLoginPage.js.map