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
const commonTestData_1 = require("../../support/commonTestData");
const commonTestData = new commonTestData_1.CommonTestData();
class OrrOrderPage {
    constructor() {
        this.pageTitle = 'Elsevier Commerce - Order Details: ';
        this.pageUrl = commonTestData.getUrlFor().orr.orders;
        this.cancelSubscriptionButtonLocator = '.cancel-subscription-button';
        this.copyrightLocator = '.large-9 p';
        this.backToTopLocator = '.back-to-top';
        this.mainTitleLocator = 'h1';
        this.orderNumberLocator = '#orderNumber';
        this.orderTotalPriceLocator = '#orderTotal';
        this.orderTotalItemsLocator = '#orderNumItems';
        this.customerEmailLocator = '#orderCustomerEmail';
        this.paymentGrossTotalLocator = '#paymentTotalGross';
        this.paymentDiscountTotalLocator = '#paymentTotalDiscount';
        this.paymentTaxTotalLocator = '#paymentTotalTax';
        this.activityLogEntryLocator = '.activity-log-entry';
        this.creditCardTokenLocator = '#paymentCardToken';
        this.orderIsbnsLocator = '.order-item__isbn';
        this.successfulOrderReceiptActivityText = 'Order Received - Success';
        this.successfulPaymentCheckActivityText = 'Payment Check - Success';
        this.successfulPaymentSendActivityText = 'Send To Payment - Success';
        this.successfulPaymentTakenActivityText = 'Taking Payment - Success';
        this.successfulNoPaymentToProcessActivityText = 'No payment to process - Success';
        this.successfulCalculateTaxActivityText = 'Calculating Tax - Success';
        this.successfulSentToAnEActivityText = 'Sending to A&E - Success';
        this.successfulSentToAnEActivityAmirsysText = 'Sending to Ane - Success';
        this.successfulSentToDeltaActivityText = 'Sending to Delta - Success';
        this.successfulSentToSdrmActivityText = 'Sending to SDRM - Success';
        this.successfulSentToVstFulfilmentText = 'Sending to VST Fulfilment - Success';
        this.failedSDRMOrderActivityText = 'Sending to SDRM - Error';
        this.successfulSentToCrmActivityText = 'Sending to CRM - Success';
        this.successfulRoutingToBookmasterActivityText = 'Routing to Bookmaster - Success';
        this.failedSentToCrmActivityText = 'Sending to CRM - Error';
        this.successfulSentToSubscriptionActivityText = 'Sending to Subscription - Success';
        this.successfulEntitlementText = 'Entitlement - Success';
        this.successfulSDTransactionReportText = 'Science Direct Transaction Report Created - Success';
        this.successfulSDFinancialFulfilmentText = 'SEND_TO_SD_FINANCIAL_FULFILMENT - Success';
    }
    visitPage(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl + '/' + orderNumber);
        });
    }
    cancelSubscriptionButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cancelSubscriptionButtonLocator);
        });
    }
    orderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderNumberLocator);
        });
    }
    orderTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalPriceLocator);
        });
    }
    orderTotalItems(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalItemsLocator);
        });
    }
    customerEmail(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.customerEmailLocator);
        });
    }
    paymentGrossTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.paymentGrossTotalLocator);
        });
    }
    paymentDiscountTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.paymentDiscountTotalLocator);
        });
    }
    paymentTaxTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.paymentTaxTotalLocator);
        });
    }
    activityLogEntries(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.activityLogEntryLocator);
        });
    }
    creditCardToken(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.creditCardTokenLocator);
        });
    }
    orderItemIsbns(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.orderIsbnsLocator);
        });
    }
}
exports.OrrOrderPage = OrrOrderPage;
//# sourceMappingURL=orrOrderPage.js.map