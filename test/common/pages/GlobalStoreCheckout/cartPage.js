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
class GscCartPage {
    constructor(testData) {
        this.pageTitle = 'Shopping Cart | Elsevier';
        this.titleLocator = 'h1';
        this.loginLinkLocator = '.header-item--account';
        this.cartHeaderLocator = '.cart__header';
        this.removeButtonsLocator = '.cart-prod__remove';
        this.proceedToCheckoutLocator = '.cart__proceed';
        this.continueShoppingLocator = '.cart__continue';
        this.testData = testData;
    }
    title(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.titleLocator);
        });
    }
    cartHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartHeaderLocator);
        });
    }
    loginLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginLinkLocator);
        });
    }
    selectLoginLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginLink(driver)).click();
        });
    }
    proceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.proceedToCheckoutLocator);
        });
    }
    clickProceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.proceedToCheckoutButton(driver)).click();
        });
    }
    continueShoppingButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.continueShoppingLocator);
        });
    }
    clickContinueShoppingLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.continueShoppingButton(driver)).click();
        });
    }
}
exports.GscCartPage = GscCartPage;
//# sourceMappingURL=cartPage.js.map