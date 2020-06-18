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
class OrderHistoryPage {
    constructor(variant, testData) {
        if (variant === 'Elsevier') {
            this.pageUrl = testData.getUrlFor().elsevier.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        }
        else if (variant === 'CK') {
            this.pageUrl = testData.getUrlFor().ck.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        }
        else if (variant === 'Amirsys') {
            this.pageUrl = testData.getUrlFor().amirsys.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        }
        else if (variant === 'Subscriptions') {
            this.pageUrl = testData.getUrlFor().elsevier.subscriptions;
            this.pageTitle = 'Online Subscriptions | Elsevier';
        }
        this.orderHistoryHeaderLocator = '.inline-header';
        this.orderHistoryOrderHeaderLocator = '.order-header';
        this.topOrderNumberLocator = '.order:nth-child(1) .order-id';
        this.topOrderTotalLocator = '.order:nth-child(1) .order-total-price';
        this.topOrderMoreInfoArrowLocator = '.order:nth-child(1) .icon-arrow-down';
        this.specificOrderLocatorPrefix = '#order-';
        this.specificOrderNumberLocatorSuffix = ' .order-id';
        this.specificOrderTotalLocatorSuffix = ' .order-total-price';
        this.specificOrderMoreInfoArrowLocatorSuffix = ' .icon-arrow-down';
        this.specificOrderMoreInfoLinkLocatorSuffix = ' .order-info-button span:nth-child(1)';
        this.specificOrderMoreInfoLinkLocatorSuffixMobile = ' .primary-button';
        this.specificOrderItemTitlesLocatorSuffix = ' .order-item-title strong';
        this.specificOrderItemDownloadMessageLocatorSuffix = ' em';
        this.specificOrderItemSdrmLinkLocatorSuffix = ' .order-item-downloads a.download-link';
        this.specificOrderItemISBNsLocatorSuffix = ' .order-item-isbn';
        this.vstDownloadLinkText = 'View your eBook on VitalSource Bookshelf';
        this.sdrmDownloadText = 'Download processing. Please check again later.';
        this.sdrmDownloadUrlPrefix = 'http://bookmark-api.elsevieremea.com/download/';
        this.vstDownloadUrlRegExp = /^https:\/\/checkout.staging.ecommerce.elsevier.com\/order\/item\/redirect\/[a-z0-9]{32}$/;
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    topOrderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.topOrderNumberLocator);
        });
    }
    getTopOrderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.topOrderNumber(driver)).getText();
        });
    }
    topOrderTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.topOrderTotalLocator);
        });
    }
    topOrderMoreInfoArrow(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.topOrderMoreInfoArrowLocator);
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
    getSpecificOrderTotal(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.specificOrderTotal(driver, orderNumber)).getText();
        });
    }
    specificOrderMoreInfoArrow(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoArrowLocatorSuffix);
        });
    }
    specificOrderMoreInfoLink(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoLinkLocatorSuffix);
        });
    }
    specificOrderMoreInfoLinkMobile(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoLinkLocatorSuffixMobile);
        });
    }
    specificOrderItemTitles(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemTitlesLocatorSuffix);
        });
    }
    specificOrderItemDownloadMessages(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemDownloadMessageLocatorSuffix);
        });
    }
    specificOrderItemSdrmDownloadLinks(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemSdrmLinkLocatorSuffix);
        });
    }
    specificOrderItemVstDownloadLinks(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, `#order-${orderNumber} .order-item-downloads > p a[href*="\/order\/item\/redirect\/"]`);
        });
    }
    specificOrderItemIsbns(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemISBNsLocatorSuffix);
        });
    }
    allOrdersItemTitles(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificOrderItemTitlesLocatorSuffix);
        });
    }
    orderHistoryOrderHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderHistoryOrderHeaderLocator);
        });
    }
    orderHistoryHeader(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderHistoryHeaderLocator);
        });
    }
}
exports.OrderHistoryPage = OrderHistoryPage;
//# sourceMappingURL=orderHistoryPage.js.map