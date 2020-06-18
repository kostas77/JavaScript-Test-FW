import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import * as moment from 'moment';
import { knownProdOrder } from '../support/testData';
import { OrrLoginPage } from '../../common/pages/ORR/orrLoginPage';
import { OrrOrderPage } from '../../common/pages/ORR/orrOrderPage';
import { createLogger } from 'bunyan';
import { OrdersAPIClient } from '@elsevier/internal-order-api-client';
import { ordersAPI } from '../../integration_ecom/step_definitions/orrOrderFlowSteps';
import { orrAccountDetails } from '../support/userData';

const orrLoginPage = new OrrLoginPage();
const orrOrderPage = new OrrOrderPage();

defineStep(/^I login into ORR$/, async function (): Promise<void> {
    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        await orrLoginPage.visitPage(this.driver);
        await Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.logInButtonLocator, 20 * 1000);
        await orrLoginPage.logIn(this.driver, orrAccountDetails.orrUsername, orrAccountDetails.orrPassword);
        await Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.pageTitleLocator, 20 * 1000);
        const pageTitle = await Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, 'Elsevier Commerce - Home', 'Failed to log in in ORR');
    } else {
        console.log ('- Use of ORR-web page is only performed for MAC/chrome tests');
    }
});

defineStep(/^The order is displayed in ORR$/, { timeout: 8 * 60 * 1000 }, async function (): Promise<void> {
    let orderNumber: string;
    if (this.testEnv === 'production') {
        orderNumber = knownProdOrder.orderNumber;
        console.log ('- ORR-web order page:', 'https://orr-web.prod.ecommerce.elsevier.com/orders/' + orderNumber);
    } else {
        orderNumber = this.orderDetails.orderNumberText;
        console.log ('- ORR-web order page:', 'https://orr-web.staging.ecommerce.elsevier.com/orders/' + orderNumber);
    }

    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        await Helpers.driverSleep(this.driver, 60 * 1000); // TODO: Replace this with a function that waits for the relevant successful ORR events, to determine completion of order fulfilment.
        await orrOrderPage.visitPage(this.driver, orderNumber);
        await Helpers.waitUntilElementHasState(this.driver, 'visible', orrOrderPage.copyrightLocator, 15 * 1000);
        await Helpers.jsWaitUntilPageLoadComplete(this.driver, 15 * 1000);
        const pageTitle = await Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, orrOrderPage.pageTitle + orderNumber, 'Expected ORR order page title not found');

        // Validate correct order number is displayed
        const orrOrderNumber = await orrOrderPage.orderNumber(this.driver);
        const orrOrderNumberText = await orrOrderNumber.getText();
        let expectedOrderNumber: string;
        if (this.testEnv === 'production') {
            expectedOrderNumber = knownProdOrder.orderNumber;
        } else {
            expectedOrderNumber = this.orderDetails.orderNumberText;
        }
        this.assert.equal(orrOrderNumberText, expectedOrderNumber, 'Expected order number not found');

        // Validate correct order item count is displayed
        const orrOrderTotalItems = await orrOrderPage.orderTotalItems(this.driver);
        const orrOrderTotalItemsText = await orrOrderTotalItems.getText();
        let expectedItemCount: string;
        if (this.testEnv === 'production') {
            expectedItemCount = knownProdOrder.totalItemCount;
        } else {
            expectedItemCount = this.orderDetails.orderTotalItems;
        }
        this.assert.equal(orrOrderTotalItemsText, expectedItemCount, 'Expected total item count not found');

        // Validate correct customer email is displayed
        if (this.testEnv === 'production') {
            // Not validating customer email in Prod as do not wish to store personal information as test data
        } else {
            const orrCustomerEmail = await orrOrderPage.customerEmail(this.driver);
            const orrCustomerEmailText = await orrCustomerEmail.getText();
            this.assert.equal(orrCustomerEmailText, this.customerDetails.emailAddress, 'Expected customer email not found');
        }

        // Validate correct order total is displayed
        const orrOrderTotal = await orrOrderPage.orderTotalPrice(this.driver);
        const orrOrderTotalText = Helpers.removeCurrencySymbol(await orrOrderTotal.getText());
        let expectedOrderTotal: string;
        if (this.testEnv === 'production') {
            expectedOrderTotal = knownProdOrder.orderTotalPrice;
        } else {
            expectedOrderTotal = this.orderDetails.orderTotalPrice;
        }
        this.assert.equal(orrOrderTotalText, expectedOrderTotal, 'Expected order total not found');

        // // Validate correct discount total is displayed TODO - Need to re-enable when bug is fixed (ELSEC-2742)
        // if (this.orderDetails.discountedOrder) {
        //     const paymentDiscountTotal = await orrOrderPage.paymentDiscountTotal(this.driver);
        //     const paymentDiscountTotalText = Helpers.removeCurrencySymbol(await paymentDiscountTotal.getText());
        //     let expectedDiscountTotal: string;
        //     if (this.testEnv === 'production') {
        //         // expectedDiscountTotal = knownProdOrder.orderTotalPrice;
        //     } else {
        //         expectedDiscountTotal = this.orderDetails.discountPrice;
        //     }
        //     this.assert.equal(paymentDiscountTotalText, expectedDiscountTotal, 'Expected payment discount total not found');
        // }

        // Validate correct tax total is displayed
        const paymentTaxTotal = await orrOrderPage.paymentTaxTotal(this.driver);
        const paymentTaxTotalText = Helpers.removeCurrencySymbol(await paymentTaxTotal.getText());
        let expectedTaxTotal: string;
        if (this.testEnv === 'production') {
            // expectedTaxTotal = knownProdOrder.orderTotalPrice;
        } else {
            expectedTaxTotal = this.orderDetails.taxPrice;
        }
        this.assert.equal(paymentTaxTotalText, expectedTaxTotal, 'Expected payment tax total not found');

        // Validate correct gross total is displayed
        const paymentGrossTotal = await orrOrderPage.paymentGrossTotal(this.driver);
        const paymentGrossTotalText = Helpers.removeCurrencySymbol(await paymentGrossTotal.getText());
        let expectedGrossTotal: string;
        if (this.testEnv === 'production') {
            expectedGrossTotal = knownProdOrder.orderTotalPrice;
        } else {
            expectedGrossTotal = this.orderDetails.orderTotalPrice;
        }
        this.assert.equal(paymentGrossTotalText, expectedGrossTotal, 'Expected payment gross total not found');

        // Get ePay UID for checking order xml against in subsequent step // TODO - This is not being validated atm
        if (this.testEnv === 'production') {
            // Not validating this in Prod
        } else {
            const creditCardToken = await orrOrderPage.creditCardToken(this.driver);
            this.orderDetails.creditCardToken = await creditCardToken.getText();
        }

        // // Validate correct ISBNs/ISSNs are displayed TODO - Need to re-enable when bug is fixed (ELSEC-2743)
        // let expectedIsbns: string;
        // if (this.testEnv === 'production') {
        //     expectedIsbns = JSON.stringify(knownProdOrder.orderItemISBN.sort().map(item => item.trim()));
        // } else {
        //     expectedIsbns = JSON.stringify(this.orderDetails.orderIsbns.sort().map(item => item.trim()));
        // }
        // this.assert.equal(JSON.stringify(this.orrListedOrderedIsbns.sort().map(item => item.trim())), expectedIsbns, 'Incorrect ISBNs found');

        // Get ORR activity log messages
        if (this.testEnv === 'production') {
            // Not validating ORR activity log for Prod
        } else {
            const activityLogArray = await orrOrderPage.activityLogEntries(this.driver);
            if (activityLogArray.length === 0) {
                throw new Error('No Activity log entries found on ORR order page');
            } else {
                for (const row in activityLogArray) {
                    const activityText = await activityLogArray[row].getText();
                    await this.orderActivityLogText.push(activityText);
                }
            }
        }

        // Validate ORR events for different product types
        if (this.testEnv === 'production') {
            // Not validating ORR activity log for Prod
        } else {
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
            // this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulNoPaymentToProcessActivityText, 'Successful no payment to process message not shown');
        }
        if (this.orderDetails.productTypes.includes('argiJournal')) {
            // this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulSentToDeltaActivityText, 'Successful Delta fulfillment message not shown');
            // this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulNoPaymentToProcessActivityText, 'Successful no payment to process message not shown');
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
    } else {
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- ORR logs validation is only performed for MAC/chrome tests');
    }
});

defineStep(/^I cancel the subscription in ORR$/, async function (): Promise<void> {
    await Helpers.driverSleep(this.driver, 10 * 1000);
    const subOrderNumber: string = await this.orderDetails.orderNumberText;
    if (this.osName === 'MAC' || this.osName === 'OS X' && this.browserName.toLowerCase() === 'chrome') {
        await orrOrderPage.visitPage(this.driver, subOrderNumber);
        await Helpers.refreshPageUntilElementPresent(this.driver, orrOrderPage.cancelSubscriptionButtonLocator, 5 * 1000);
        await (await orrOrderPage.cancelSubscriptionButton(this.driver)).click();
        // Need to find alternative way to cancel Subs for mobile due to: https://github.com/appium/appium/issues/9405
        await this.driver.switchTo().alert().accept();
    } else {
        await Helpers.cancelSubscriptionOrder(subOrderNumber);
        console.log ('\x1b[34m\x1b[1m%s\x1b[0m', '- Subscription order is cancelled using the ORR API for non-MAC/chrome tests');
    }
});

defineStep(/^all recent SDRM orders have been processed successfully$/, async function () {
    const logger = createLogger({ name: 'ORR-SDRM-validation', level: 'info' });
    const apiClient = new OrdersAPIClient(logger, ordersAPI);
    const orders = await apiClient.getOrders({
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
        const events = await apiClient.getEventsForOrder(sdrmOrder.elsevierOrderNo);
        const sdrmSuccess = events.find(event => event.status === 'Success' && event.type === 'SEND_TO_SDRM');
        if (!sdrmSuccess) {
            throw new Error('No SDRM success event for: ' + sdrmOrder.elsevierOrderNo);
        }
    }
    return;
});
