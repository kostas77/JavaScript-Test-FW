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
const cucumber_1 = require("cucumber");
const helpers_1 = require("../../common/support/helpers");
const moment = require("moment");
const testData_1 = require("../support/testData");
const orrLoginPage_1 = require("../../common/pages/ORR/orrLoginPage");
const orrOrderPage_1 = require("../../common/pages/ORR/orrOrderPage");
const bunyan_1 = require("bunyan");
const internal_order_api_client_1 = require("@elsevier/internal-order-api-client");
const orrOrderFlowSteps_1 = require("../../integration_ecom/step_definitions/orrOrderFlowSteps");
const userData_1 = require("../support/userData");
const orrLoginPage = new orrLoginPage_1.OrrLoginPage();
const orrOrderPage = new orrOrderPage_1.OrrOrderPage();
cucumber_1.Then(/^I login into ORR$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            yield orrLoginPage.visitPage(this.driver);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.logInButtonLocator, 20 * 1000);
            yield orrLoginPage.logIn(this.driver, userData_1.orrAccountDetails.orrUsername, userData_1.orrAccountDetails.orrPassword);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.pageTitleLocator, 20 * 1000);
            const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
            this.assert.equal(pageTitle, 'Elsevier Commerce - Home', 'Failed to log in in ORR');
        }
        else {
            console.log('- Use of ORR-web page is only performed for MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^The order is displayed in ORR$/, { timeout: 8 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        let orderNumber;
        if (this.testEnv === 'production') {
            orderNumber = testData_1.knownProdOrder.orderNumber;
            console.log('- ORR-web order page:', 'https://orr-web.prod.ecommerce.elsevier.com/orders/' + orderNumber);
        }
        else {
            orderNumber = this.orderDetails.orderNumberText;
            console.log('- ORR-web order page:', 'https://orr-web.staging.ecommerce.elsevier.com/orders/' + orderNumber);
        }
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            yield helpers_1.Helpers.driverSleep(this.driver, 60 * 1000);
            yield orrOrderPage.visitPage(this.driver, orderNumber);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', orrOrderPage.copyrightLocator, 15 * 1000);
            yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 15 * 1000);
            const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
            this.assert.equal(pageTitle, orrOrderPage.pageTitle + orderNumber, 'Expected ORR order page title not found');
            const orrOrderNumber = yield orrOrderPage.orderNumber(this.driver);
            const orrOrderNumberText = yield orrOrderNumber.getText();
            let expectedOrderNumber;
            if (this.testEnv === 'production') {
                expectedOrderNumber = testData_1.knownProdOrder.orderNumber;
            }
            else {
                expectedOrderNumber = this.orderDetails.orderNumberText;
            }
            this.assert.equal(orrOrderNumberText, expectedOrderNumber, 'Expected order number not found');
            const orrOrderTotalItems = yield orrOrderPage.orderTotalItems(this.driver);
            const orrOrderTotalItemsText = yield orrOrderTotalItems.getText();
            let expectedItemCount;
            if (this.testEnv === 'production') {
                expectedItemCount = testData_1.knownProdOrder.totalItemCount;
            }
            else {
                expectedItemCount = this.orderDetails.orderTotalItems;
            }
            this.assert.equal(orrOrderTotalItemsText, expectedItemCount, 'Expected total item count not found');
            if (this.testEnv === 'production') {
            }
            else {
                const orrCustomerEmail = yield orrOrderPage.customerEmail(this.driver);
                const orrCustomerEmailText = yield orrCustomerEmail.getText();
                this.assert.equal(orrCustomerEmailText, this.customerDetails.emailAddress, 'Expected customer email not found');
            }
            const orrOrderTotal = yield orrOrderPage.orderTotalPrice(this.driver);
            const orrOrderTotalText = helpers_1.Helpers.removeCurrencySymbol(yield orrOrderTotal.getText());
            let expectedOrderTotal;
            if (this.testEnv === 'production') {
                expectedOrderTotal = testData_1.knownProdOrder.orderTotalPrice;
            }
            else {
                expectedOrderTotal = this.orderDetails.orderTotalPrice;
            }
            this.assert.equal(orrOrderTotalText, expectedOrderTotal, 'Expected order total not found');
            const paymentTaxTotal = yield orrOrderPage.paymentTaxTotal(this.driver);
            const paymentTaxTotalText = helpers_1.Helpers.removeCurrencySymbol(yield paymentTaxTotal.getText());
            let expectedTaxTotal;
            if (this.testEnv === 'production') {
            }
            else {
                expectedTaxTotal = this.orderDetails.taxPrice;
            }
            this.assert.equal(paymentTaxTotalText, expectedTaxTotal, 'Expected payment tax total not found');
            const paymentGrossTotal = yield orrOrderPage.paymentGrossTotal(this.driver);
            const paymentGrossTotalText = helpers_1.Helpers.removeCurrencySymbol(yield paymentGrossTotal.getText());
            let expectedGrossTotal;
            if (this.testEnv === 'production') {
                expectedGrossTotal = testData_1.knownProdOrder.orderTotalPrice;
            }
            else {
                expectedGrossTotal = this.orderDetails.orderTotalPrice;
            }
            this.assert.equal(paymentGrossTotalText, expectedGrossTotal, 'Expected payment gross total not found');
            if (this.testEnv === 'production') {
            }
            else {
                const creditCardToken = yield orrOrderPage.creditCardToken(this.driver);
                this.orderDetails.creditCardToken = yield creditCardToken.getText();
            }
            if (this.testEnv === 'production') {
            }
            else {
                const activityLogArray = yield orrOrderPage.activityLogEntries(this.driver);
                if (activityLogArray.length === 0) {
                    throw new Error('No Activity log entries found on ORR order page');
                }
                else {
                    for (const row in activityLogArray) {
                        const activityText = yield activityLogArray[row].getText();
                        yield this.orderActivityLogText.push(activityText);
                    }
                }
            }
            if (this.testEnv === 'production') {
            }
            else {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentCheckActivityText, 'Successful payment check message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulOrderReceiptActivityText, 'Successful order received message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentSendActivityText, 'Successful payment sent message not shown');
            }
            if (this.orderDetails.productTypes.includes('vstEBook')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulCalculateTaxActivityText, 'Successful tax calculated message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToVstFulfilmentText, 'Successful order sent to VST fulfilment message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentTakenActivityText, 'Successful payment taken message not shown');
            }
            if (this.orderDetails.productTypes.includes('sdrmEBook')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulCalculateTaxActivityText, 'Successful tax calculated message not shown');
                this.assert.notInclude(JSON.stringify(this.orderActivityLogText), orrOrderPage.failedSDRMOrderActivityText, 'SDRM fulfilment has failed');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToSdrmActivityText, 'Successful order sent to SDRM fulfilment message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToDeltaActivityText, 'Successful Delta fulfillment message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentTakenActivityText, 'Successful payment taken message not shown');
            }
            if (this.orderDetails.productTypes.includes('deltaJournal')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToDeltaActivityText, 'Successful Delta fulfillment message not shown');
            }
            if (this.orderDetails.productTypes.includes('argiJournal')) {
            }
            if (this.orderDetails.productTypes.includes('articleChoice')) {
                this.assert.notInclude(JSON.stringify(this.orderActivityLogText), orrOrderPage.failedSentToCrmActivityText, 'Sending to CRM has failed');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToCrmActivityText, 'Successfully sent to CRM message not shown');
            }
            if (this.orderDetails.productTypes.includes('articleChoice') && !(this.orderDetails.productTypes.includes('ck')) && !(this.orderDetails.productTypes.includes('vstEBook')) && !(this.orderDetails.productTypes.includes('sdrmEBook'))) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulNoPaymentToProcessActivityText, 'Successful no payment to process message not shown');
            }
            if (this.orderDetails.productTypes.includes('printBook') && this.customerDetails.countryCode === 'AU') {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulRoutingToBookmasterActivityText, 'Successful routing to Bookmaster message not shown');
            }
            if (this.orderDetails.productTypes.includes('ck')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulCalculateTaxActivityText, 'Successful tax calculated message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentTakenActivityText, 'Successful payment taken message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToAnEActivityText, 'Successfully sent to A&E message not shown');
                this.assert.notInclude(JSON.stringify(this.orderActivityLogText), orrOrderPage.failedSentToCrmActivityText, 'Sending to CRM has failed');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToCrmActivityText, 'Successfully sent to CRM message not shown');
            }
            if (this.orderDetails.productTypes.includes('amirsys')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulCalculateTaxActivityText, 'Successful tax calculated message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentTakenActivityText, 'Successful payment taken message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToAnEActivityAmirsysText, 'Successfully sent to Ane message not shown');
                this.assert.notInclude(JSON.stringify(this.orderActivityLogText), orrOrderPage.failedSentToCrmActivityText, 'Sending to CRM has failed');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToCrmActivityText, 'Successfully sent to CRM message not shown');
            }
            if (this.orderDetails.productTypes.includes('embase')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulCalculateTaxActivityText, 'Successful tax calculated message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentTakenActivityText, 'Successful payment taken message not shown');
                this.assert.notInclude(JSON.stringify(this.orderActivityLogText), orrOrderPage.failedSentToCrmActivityText, 'Sending to CRM has failed');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToCrmActivityText, 'Successfully sent to CRM message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToSubscriptionActivityText, 'Successfully sent to Subscription message not shown');
            }
            if (this.orderDetails.productTypes.includes('article')) {
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulEntitlementText, 'Successful Entitlement message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSDTransactionReportText, 'Successful SD transaction report created message not shown');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSDFinancialFulfilmentText, 'Successfully SD financial fulfilment message not shown');
            }
        }
        else {
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- ORR logs validation is only performed for MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^I cancel the subscription in ORR$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 10 * 1000);
        const subOrderNumber = yield this.orderDetails.orderNumberText;
        if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
            yield orrOrderPage.visitPage(this.driver, subOrderNumber);
            yield helpers_1.Helpers.refreshPageUntilElementPresent(this.driver, orrOrderPage.cancelSubscriptionButtonLocator, 5 * 1000);
            yield (yield orrOrderPage.cancelSubscriptionButton(this.driver)).click();
            yield this.driver.switchTo().alert().accept();
        }
        else {
            yield helpers_1.Helpers.cancelSubscriptionOrder(subOrderNumber);
            console.log('\x1b[34m\x1b[1m%s\x1b[0m', '- Subscription order is cancelled using the ORR API for non-MAC/chrome tests');
        }
    });
});
cucumber_1.Then(/^all recent SDRM orders have been processed successfully$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = bunyan_1.createLogger({ name: 'ORR-SDRM-validation', level: 'info' });
        const apiClient = new internal_order_api_client_1.OrdersAPIClient(logger, orrOrderFlowSteps_1.ordersAPI);
        const orders = yield apiClient.getOrders({
            orderDate: {
                start: moment().startOf('day').toDate(),
                end: moment().toDate()
            },
            status: 'OK'
        });
        logger.debug({ numOrders: orders.length }, 'Orders returned from API');
        const ordersBefore = moment().subtract(10, 'minutes');
        const ordersBeforeDate = orders.filter(order => moment(order.orderDate).isBefore(ordersBefore));
        logger.debug({ numOrders: ordersBeforeDate.length }, 'Orders filtered older than 10 minutes');
        const sdrmOrders = ordersBeforeDate.filter(order => {
            return order.items.filter(item => item.fulfillerName === 'SDRM').length > 0;
        });
        if (sdrmOrders.length === 0) {
            logger.info('No recent SDRM orders found');
            return;
        }
        for (const sdrmOrder of sdrmOrders) {
            const events = yield apiClient.getEventsForOrder(sdrmOrder.elsevierOrderNo);
            const sdrmSuccess = events.find(event => event.status === 'Success' && event.type === 'SEND_TO_SDRM');
            if (!sdrmSuccess) {
                throw new Error('No SDRM success event for: ' + sdrmOrder.elsevierOrderNo);
            }
        }
        return;
    });
});
//# sourceMappingURL=orrWebSteps.js.map