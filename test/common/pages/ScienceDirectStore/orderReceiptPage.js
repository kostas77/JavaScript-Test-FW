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
class SdOrderReceiptPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().sd.orderHistory;
        this.pageTitle = 'Receipt';
        this.returnToOrderHistoryLinkLocator = '.order__return-link';
        this.orderNumberLocator = '.order__details > .order__summary > div:nth-child(1) > div:nth-child(2)';
        this.cardTypeLocator = '.order__details > .order__summary > div:nth-child(2) > div:nth-child(2)';
        this.nameOnCardLocator = '.order__details > .order__summary > div:nth-child(3) > div:nth-child(2)';
        this.emailAddressLocator = '.order__details > .order__summary > div:nth-child(4) > div:nth-child(2)';
        this.subTotalLocator = '.order__products-footer-subtotal .order__products-price';
        this.taxLocator = '.order__products-footer-tax .order__products-price';
        this.orderTotalLocator = '.order__products-footer-total .order__products-price';
    }
    visitPage(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl + '/' + orderNumber);
        });
    }
    orderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderNumberLocator);
        });
    }
    getOrderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.orderNumberLocator);
        });
    }
    getCardType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.cardTypeLocator);
        });
    }
    getNameOnCard(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.nameOnCardLocator);
        });
    }
    emailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.emailAddressLocator);
        });
    }
    getEmailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getText(driver, this.emailAddressLocator);
        });
    }
    subTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.subTotalLocator);
        });
    }
    getSubTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.subTotalLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    taxTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.taxLocator);
        });
    }
    getTaxTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.taxLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    orderTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalLocator);
        });
    }
    getOrderTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.orderTotalLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
}
exports.SdOrderReceiptPage = SdOrderReceiptPage;
//# sourceMappingURL=orderReceiptPage.js.map