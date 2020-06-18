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
const commonTestData_1 = require("../support/commonTestData");
const orrLoginPage_1 = require("../pages/ORR/orrLoginPage");
const orrOrderPage_1 = require("../pages/ORR/orrOrderPage");
const orrStoreOrdersListPage_1 = require("../pages/ORR/orrStoreOrdersListPage");
const helpers_1 = require("../support/helpers");
function OrrWebSteps(testData) {
    const orrLoginPage = new orrLoginPage_1.OrrLoginPage();
    const orrOrderPage = new orrOrderPage_1.OrrOrderPage();
    const orrOrderListPage = new orrStoreOrdersListPage_1.OrrStoreOrdersListPage(testData.getDataFor().orrStoreId);
    cucumber_1.Then(/^I login into ORR$/, { timeout: 2 * 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield orrLoginPage.visitPage(this.driver);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.logInButtonLocator, 20000);
            yield orrLoginPage.logIn(this.driver, commonTestData_1.orrAccountDetails.orrUsername, commonTestData_1.orrAccountDetails.orrPassword);
        });
    });
    cucumber_1.Then(/^The order is displayed in ORR$/, { timeout: 8 * 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield orrOrderListPage.getPage(this.driver);
            console.log('- Waiting for order ' + this.orderDetails.orderNumberText + ' to arrive in ORR (could take up to 8 minutes)');
            yield helpers_1.Helpers.refreshPageUntilElementPresent(this.driver, orrOrderListPage.getOrderLinkLocator(this.orderDetails.orderNumberText), (30 * 1000), 14, 'the order: ' + this.orderDetails.orderNumberText);
            this.assert.isNotFalse(orrOrderListPage.getOrderLink(this.driver, this.orderDetails.orderNumberText), `Order ${this.orderDetails.orderNumberText} did not arrive in orr`);
            console.log(orrOrderListPage.pageUrl + '/' + this.orderDetails.orderNumberText);
        });
    });
    cucumber_1.Then(/^The order is valid in ORR$/, { timeout: 8 * 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.driverSleep(this.driver, 60 * 1000);
            const orderNumber = this.orderDetails.orderNumberText;
            yield orrOrderPage.visitPage(this.driver, orderNumber);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', orrOrderPage.copyrightLocator, 5 * 1000);
            yield helpers_1.Helpers.driverSleep(this.driver, 15 * 1000);
            const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
            this.assert.equal(pageTitle, orrOrderPage.pageTitle + orderNumber, 'Expected ORR order page title not found');
            const orrOrderNumber = yield orrOrderPage.orderNumber(this.driver);
            const orrOrderNumberText = yield orrOrderNumber.getText();
            const expectedOrderNumber = this.orderDetails.orderNumberText;
            this.assert.equal(orrOrderNumberText, expectedOrderNumber, 'Expected order number not found');
            const orrOrderTotalItems = yield orrOrderPage.orderTotalItems(this.driver);
            const orrOrderTotalItemsText = Number(yield orrOrderTotalItems.getText());
            const expectedItemCount = Number(this.orderDetails.orderTotalItems);
            this.assert.equal(orrOrderTotalItemsText, expectedItemCount, 'Expected total item count not found');
            if (this.testEnv === 'production') {
            }
            else {
                const orrCustomerEmail = yield orrOrderPage.customerEmail(this.driver);
                const orrCustomerEmailText = yield orrCustomerEmail.getText();
                this.assert.equal(orrCustomerEmailText, this.customerDetails.emailAddress, 'Expected customer email not found');
            }
            const paymentGrossTotal = Number(helpers_1.Helpers.getCleanPrice(yield (yield orrOrderPage.paymentGrossTotal(this.driver)).getText()));
            const expectedGrossTotal = Number(helpers_1.Helpers.getCleanPrice(this.orderDetails.orderTotal));
            this.assert.equal(paymentGrossTotal, expectedGrossTotal, 'Expected payment gross total not found');
            if (this.testEnv === 'production') {
            }
            else {
                const creditCardToken = yield orrOrderPage.creditCardToken(this.driver);
                this.orderDetails.creditCardToken = yield creditCardToken.getText();
            }
            const orderItemIsbnsArray = yield orrOrderPage.orderItemIsbns(this.driver);
            for (const isbnElement of orderItemIsbnsArray) {
                const isbnText = yield isbnElement.getText();
                yield this.orrListedOrderedIsbns.push(isbnText);
            }
            const expectedIsbns = JSON.stringify(this.orderDetails.orderIsbns.sort().map(item => item.trim().replace(/[^0-9]/g, '')));
            this.assert.equal(JSON.stringify(this.orrListedOrderedIsbns.sort().map(item => item.trim().replace(/[^0-9]/g, ''))), expectedIsbns, 'Incorrect ISBNs found');
        });
    });
    let OrderEventType;
    (function (OrderEventType) {
        OrderEventType[OrderEventType["SuccessfullyRoutedToFulfiller"] = 0] = "SuccessfullyRoutedToFulfiller";
        OrderEventType[OrderEventType["SuccessfullyFulfilledByFulfiller"] = 1] = "SuccessfullyFulfilledByFulfiller";
    })(OrderEventType || (OrderEventType = {}));
    cucumber_1.Then(/^ORR has routed or sent the order for fulfillment$/, { timeout: 20 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
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
                    this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentCheckActivityText, 'Successful payment check message not found');
                    this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulOrderReceiptActivityText, 'Successful order received message not found');
                    this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentSendActivityText, 'Successful payment sent message not shown');
                    const results = [];
                    for (const result of JSON.stringify(this.orderActivityLogText).match(/Routing to ([a-zA-Z-]*) - Success/g)) {
                        const [match, service] = result.match(/Routing to ([a-zA-Z-]*) - Success/) || [];
                        if (match) {
                            const needle = getLastSuccessfulEventType(service) === OrderEventType.SuccessfullyFulfilledByFulfiller ? `Sending to ${service} - Success` : 'Identifying Fulfilment Provider - Success';
                            const message = getLastSuccessfulEventType(service) === OrderEventType.SuccessfullyFulfilledByFulfiller ? `Successfully sent to ${service} message not shown` : 'Successfully Routed order to fulfiller';
                            this.assert.include(JSON.stringify(this.orderActivityLogText), needle, message);
                            results.push(service);
                        }
                    }
                }
            }
        });
    });
    function getLastSuccessfulEventType(service) {
        switch (service.toUpperCase()) {
            case 'ARGI':
                return OrderEventType.SuccessfullyRoutedToFulfiller;
            default:
                return OrderEventType.SuccessfullyFulfilledByFulfiller;
        }
    }
}
exports.OrrWebSteps = OrrWebSteps;
//# sourceMappingURL=orrWebSteps.js.map