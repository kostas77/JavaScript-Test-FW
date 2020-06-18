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
class SdThankYouPage {
    constructor(testData) {
        this.pageTitle = 'Thanks for your order';
        this.pageUrl = testData.getUrlFor().sd.thanks;
        this.thankYouMessageLocator = '.thanks__header h1';
        this.thankYouText = 'Thanks for your order';
        this.orderNumberLocator = '.thanks__order-detail p strong';
        this.orderProductDetails = '.cart-prod-book-detail-item dd';
        this.confirmationEmailMessageLocator = '.';
        this.emailAddressLocator = '.list-branded strong';
        this.helpPagesLinkLocator = '.thanks__next-steps.list-branded a';
        this.exploreMoreArticlesButtonLocator = '.thanks__order-detail a.btn';
        this.articleLinksLocator = '.cart-prod__body a';
        this.articleTitlesLocator = '.cart-prod-book-detail-item > div:nth-child(1) > dd';
        this.articleISSNsLocator = '.cart-prod-book-detail-item > div:nth-child(2) > dd';
    }
    thankYouMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.thankYouMessageLocator);
        });
    }
    orderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderNumberLocator);
        });
    }
    emailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.emailAddressLocator);
        });
    }
    confirmationEmailMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.confirmationEmailMessageLocator);
        });
    }
    exploreMoreArticlesButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.exploreMoreArticlesButtonLocator);
        });
    }
    helpPagesLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.helpPagesLinkLocator);
        });
    }
    articleTitles(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.articleTitlesLocator);
        });
    }
    articleISSNs(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.articleISSNsLocator);
        });
    }
}
exports.SdThankYouPage = SdThankYouPage;
//# sourceMappingURL=thankYouPage.js.map