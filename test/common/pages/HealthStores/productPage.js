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
class ProductPage {
    constructor() {
        this.mainTitleLocator = 'div.product-name > h1:nth-child(1)';
        this.isbnLocator = 'tr.first > td:nth-child(2)';
        this.addToCartButtonLocator = 'div.add-to-cart-buttons:nth-child(1) > button:nth-child(1)';
        this.printPriceLocator = '.price-box > .regular-price > span.price';
        this.printSpecialPriceLocator = '.price-box > .special-price > span.price';
        this.journalPriceLocator = '.add-to-cart .regular-price';
        this.journalStatusSelectorLocator = '#attribute177';
        this.journalCountrySelectorLocator = '#attribute178';
        this.journalSubscriptionTermSelectorLocator = '#attribute179';
        this.productListedPrice = '';
    }
    mainTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.mainTitleLocator);
        });
    }
    isbn(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.isbnLocator);
        });
    }
    addToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addToCartButtonLocator);
        });
    }
    selectAddProductToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.addToCartButton(driver)).click();
        });
    }
    printPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield helpers_1.Helpers.getElement(driver, this.printPriceLocator);
            }
            catch (err) {
                return yield helpers_1.Helpers.getElement(driver, this.printSpecialPriceLocator);
            }
        });
    }
    journalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.journalPriceLocator);
        });
    }
    journalStatusSelector(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.journalStatusSelectorLocator);
        });
    }
    journalCountrySelector(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.journalCountrySelectorLocator);
        });
    }
    journalSubscriptionTermSelector(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.journalSubscriptionTermSelectorLocator);
        });
    }
    fillJournalSelectors(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield (yield this.journalStatusSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
            yield (yield (yield this.journalCountrySelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
            yield (yield (yield this.journalSubscriptionTermSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
        });
    }
    getPrintPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.printPrice(driver)).getText();
        });
    }
    getJournalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.journalPrice(driver)).getText();
        });
    }
    addProductToCart(driver, isJournal = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isJournal) {
                this.productListedPrice = yield this.getJournalPrice(driver);
            }
            else {
                this.productListedPrice = yield this.getPrintPrice(driver);
            }
            yield this.selectAddProductToCartButton(driver);
        });
    }
}
exports.ProductPage = ProductPage;
//# sourceMappingURL=productPage.js.map