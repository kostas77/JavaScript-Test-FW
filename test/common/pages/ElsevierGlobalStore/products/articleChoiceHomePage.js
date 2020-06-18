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
class ArticleChoiceHomePage {
    constructor(testData) {
        this.pageTitle = 'ArticleChoice® - Content - ScienceDirect - Solutions | Elsevier';
        this.pageUrl = testData.getUrlFor().elsevier.articleChoice;
        this.globalHeaderLocator = '.global-header-wrapper';
        this.countrySelectorDropdownLocator = '#country-selector';
        this.articleSelectorSliderLocator = '#slider';
        this.articleSelectorSliderPlusLocator = '.sliderMore';
        this.articleAmountLocator = '#articleAmount';
        this.totalPriceLocator = '#priceOriginal';
        this.addToCartButtonLocator = '#addToCart';
        this.footerLogoLocator = '.gh-logo';
        this.productListedPrice = '';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    globalHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.globalHeaderLocator);
        });
    }
    nonSolusLogo(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.footerLogoLocator);
        });
    }
    selectArticleAmountOption(driver, option) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < option; i++) {
                yield helpers_1.Helpers.clickElement(driver, this.articleSelectorSliderPlusLocator);
            }
            return;
        });
    }
    getArticleAmount(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.articleAmountLocator);
        });
    }
    getTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.totalPriceLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    addToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addToCartButtonLocator);
        });
    }
    clickAddToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            this.productListedPrice = yield this.getTotalPrice(driver);
            return yield helpers_1.Helpers.clickElement(driver, this.addToCartButtonLocator);
        });
    }
}
exports.ArticleChoiceHomePage = ArticleChoiceHomePage;
//# sourceMappingURL=articleChoiceHomePage.js.map