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
class ArticleProductPage {
    constructor() {
        this.mainTitleLocator = '.Head .title-text';
        this.getAccessLinkLocator = '.pdf-download-label.u-show-inline-from-lg';
        this.purchaseLinkLocator = '.button-secondary';
        this.productListedPrice = '';
    }
    mainTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.mainTitleLocator);
        });
    }
    clickGetAccessLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.getAccessLinkLocator);
        });
    }
    clickPurchaseLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.purchaseLinkLocator);
        });
    }
    addProductToCart(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clickGetAccessLink(driver);
            yield this.clickPurchaseLink(driver);
        });
    }
}
exports.ArticleProductPage = ArticleProductPage;
//# sourceMappingURL=articleProductPage.js.map