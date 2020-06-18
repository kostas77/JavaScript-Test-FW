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
class CartPage {
    constructor(testData) {
        this.testData = testData;
        this.pageUrl = this.testData.getUrlFor().HealthStore.cart;
        this.titleLocator = 'h1';
        this.removeButtonsLocator = '#shopping-cart-table tbody tr a.btn-remove';
    }
    getPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    title(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.titleLocator);
        });
    }
    clearCart(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.titleLocator, 20 * 1000);
            const title = yield (yield helpers_1.Helpers.getElement(driver, this.titleLocator)).getText();
            if (title.toLowerCase() === this.testData.getTitles().emptyCart.toLowerCase()) {
                return;
            }
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.removeButtonsLocator, 20 * 1000);
            const removeButtons = yield helpers_1.Helpers.getElementsArray(driver, this.removeButtonsLocator);
            yield removeButtons[0].click();
            yield this.clearCart(driver);
            return;
        });
    }
}
exports.CartPage = CartPage;
//# sourceMappingURL=cartPage.js.map