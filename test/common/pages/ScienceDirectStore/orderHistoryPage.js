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
class SdOrderHistoryPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().sd.orderHistory;
        this.pageTitle = 'Purchase History';
        this.orderHistoryHeaderLocator = '.order-history-header';
        this.topOrderHeaderLocator = '.order-history__order:nth-child(1) > .order-history__order-header';
        this.topOrderTotalLocator = '.order-history__order:nth-child(1) > .order-history__orders__order-item .price';
        this.topOrderShowReceiptLinkLocator = '.order-history__order:nth-child(1) > .order-history__order-header a';
        this.specificOrderShowReceiptLinkLocatorPrefix = '.order-history__order a[href*=';
        this.specificOrderShowReceiptLinkLocatorSuffix = ']';
        this.specificOrderTotalLocatorSuffix = ' .order-total-price';
        this.specificOrderItemTitlesLocatorSuffix = ' .order-item-title strong';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    orderHistoryHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderHistoryHeaderLocator);
        });
    }
    getTopOrderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.topOrderHeaderLocator);
        });
    }
    getTopOrderTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.topOrderTotalLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    topOrderShowReceiptLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.topOrderShowReceiptLinkLocator);
        });
    }
    topOrderItemTitles(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemTitlesLocatorSuffix);
        });
    }
    specificOrderNumber(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderNumberLocatorSuffix);
        });
    }
    specificOrderTotal(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderTotalLocatorSuffix);
        });
    }
    specificOrderShowReceiptLink(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderShowReceiptLinkLocatorPrefix + orderNumber + this.specificOrderShowReceiptLinkLocatorSuffix);
        });
    }
    clickSpecificOrderShowReceiptLink(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.specificOrderShowReceiptLink(driver, orderNumber)).click();
        });
    }
    specificOrderItemTitles(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemTitlesLocatorSuffix);
        });
    }
}
exports.SdOrderHistoryPage = SdOrderHistoryPage;
//# sourceMappingURL=orderHistoryPage.js.map