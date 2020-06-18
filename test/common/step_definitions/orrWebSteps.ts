import { defineStep } from 'cucumber';
import { orrAccountDetails } from '../support/commonTestData';
import { OrrLoginPage } from '../pages/ORR/orrLoginPage';
import { OrrOrderPage } from '../pages/ORR/orrOrderPage';
import { OrrStoreOrdersListPage } from '../pages/ORR/orrStoreOrdersListPage';
import { Helpers } from '../support/helpers';
import { ITestData } from '../support/interfaces';

export function OrrWebSteps(testData: ITestData) {
    const orrLoginPage = new OrrLoginPage();
    const orrOrderPage = new OrrOrderPage();
    const orrOrderListPage = new OrrStoreOrdersListPage(testData.getDataFor().orrStoreId);

    // TODO:refactor to only use once
    defineStep(/^I login into ORR$/, { timeout: 2 * 60 * 1000 }, async function (): Promise<void> {
        await orrLoginPage.visitPage(this.driver);
        await Helpers.waitUntilElementHasState(this.driver, 'located', orrLoginPage.logInButtonLocator, 20000);
        await orrLoginPage.logIn(this.driver, orrAccountDetails.orrUsername, orrAccountDetails.orrPassword);
    });

    defineStep(/^The order is displayed in ORR$/, { timeout: 8 * 60 * 1000 }, async function (): Promise<void> {
        await orrOrderListPage.getPage(this.driver);

        console.log('- Waiting for order ' + this.orderDetails.orderNumberText + ' to arrive in ORR (could take up to 8 minutes)');
        await Helpers.refreshPageUntilElementPresent(this.driver, orrOrderListPage.getOrderLinkLocator(this.orderDetails.orderNumberText), (30 * 1000), 14, 'the order: ' + this.orderDetails.orderNumberText);
        this.assert.isNotFalse(orrOrderListPage.getOrderLink(this.driver, this.orderDetails.orderNumberText), `Order ${this.orderDetails.orderNumberText} did not arrive in orr`);
        console.log(orrOrderListPage.pageUrl + '/' + this.orderDetails.orderNumberText);
    });

    defineStep(/^The order is valid in ORR$/, { timeout: 8 * 60 * 1000 }, async function (): Promise<void> {

        let pageTitle = await Helpers.getPageTitle(this.driver);
        console.log('  - Is order valid? (' + pageTitle + ')');

//        await Helpers.driverSleep(this.driver, 60 * 1000); // TODO: Replace this with a function that waits for relevant final successful ORR events
        const orderNumber: string = this.orderDetails.orderNumberText;

        await orrOrderPage.visitPage(this.driver, orderNumber);
        await Helpers.waitUntilElementHasState(this.driver, 'located', orrOrderPage.copyrightLocator, 15 * 1000);
        await Helpers.driverSleep(this.driver, 15 * 1000); // TODO: Replace with an explicit wait
        pageTitle = await Helpers.getPageTitle(this.driver);
        console.log('  - Looking for page titled "' + orrOrderPage.pageTitle + orderNumber + '"');
        this.assert.equal(pageTitle, orrOrderPage.pageTitle + orderNumber, 'Expected ORR order page title not found');

        // Validate order number is correctly displayed
        const orrOrderNumber = await orrOrderPage.orderNumber(this.driver);
        const orrOrderNumberText = await orrOrderNumber.getText();
        const expectedOrderNumber: string = this.orderDetails.orderNumberText;

        console.log('  - Is order number as expected? "' + orrOrderNumberText + '"');
        this.assert.equal(orrOrderNumberText, expectedOrderNumber, 'Expected order number not found');

        const orrOrderTotalItems = await orrOrderPage.orderTotalItems(this.driver);
        const orrOrderTotalItemsText = Number(await orrOrderTotalItems.getText());
        const expectedItemCount  = Number(this.orderDetails.orderTotalItems);

        console.log('  - Is line count as expected? "' + orrOrderTotalItemsText + '"');
        this.assert.equal(orrOrderTotalItemsText, expectedItemCount, 'Expected total item count not found');

        // Validate correct customer email is displayed
        if (this.testEnv === 'production') { // Not validating customer email in Prod as do not wish to store personal information as test data
        } else {
            const orrCustomerEmail = await orrOrderPage.customerEmail(this.driver);
            const orrCustomerEmailText = await orrCustomerEmail.getText();
            console.log('  - Is email as expected? "' + orrCustomerEmailText + '"');
            this.assert.equal(orrCustomerEmailText, this.customerDetails.emailAddress, 'Expected customer email not found');
        }

        // Validate correct gross total is displayed
        const paymentGrossTotal = Number(Helpers.getCleanPrice(await (await orrOrderPage.paymentGrossTotal(this.driver)).getText()));
        const expectedGrossTotal: number = Number(Helpers.getCleanPrice(this.orderDetails.orderTotal));
        console.log('  - Is grand total as expected? "' + paymentGrossTotal + '"');
        this.assert.equal(paymentGrossTotal, expectedGrossTotal, 'Expected payment grand total not found');

        // Get ePay UID for checking order xml against in subsequent step
        if (this.testEnv === 'production') { // Not validating this in Prod as we do not wish to store Prod values of this type in test data
        } else {
            const creditCardToken = await orrOrderPage.creditCardToken(this.driver);
            this.orderDetails.creditCardToken = await creditCardToken.getText();
        }

        const orderItemIsbnsArray = await orrOrderPage.orderItemIsbns(this.driver);
        for (const isbnElement of orderItemIsbnsArray) {
            const isbnText = await isbnElement.getText();
            await this.orrListedOrderedIsbns.push(isbnText);
        }
        const expectedIsbns: string = JSON.stringify(this.orderDetails.orderIsbns.sort().map(item => item.trim().replace(/[^0-9]/g, '')));
        console.log('  - Correct ISBNs?');
        this.assert.equal(JSON.stringify(this.orrListedOrderedIsbns.sort().map(item => item.trim().replace(/[^0-9]/g, ''))), expectedIsbns, 'Incorrect ISBNs found');
    });

    enum OrderEventType { SuccessfullyRoutedToFulfiller, SuccessfullyFulfilledByFulfiller }

    defineStep(/^ORR has routed or sent the order for fulfillment$/, { timeout: 20 * 1000 }, async function(): Promise<void> {
        if (this.testEnv === 'production') { // Not validating ORR activity log for Prod order as know was successful - need to include when begin placing test orders in Prod
        } else {
            const activityLogArray = await orrOrderPage.activityLogEntries(this.driver);
            if (activityLogArray.length === 0) {
                throw new Error('No Activity log entries found on ORR order page');
            } else {
                for (const row in activityLogArray) {
                    const activityText = await activityLogArray[row].getText();
                    await this.orderActivityLogText.push(activityText);
                }
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentCheckActivityText, 'Successful payment check message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulOrderReceiptActivityText, 'Successful order received message not found');
                this.assert.include(JSON.stringify(this.orderActivityLogText), orrOrderPage.successfulPaymentSendActivityText, 'Successful payment sent message not shown');

                const results = [];
                const matches = this.orderActivityLogText.map((activityText) => {

                    const [match, service]: RegExpMatchArray = activityText.match(/Routing to ([a-zA-Z-_]*) - Success/) || [];
                    if (match) {
                        return service;
                    }
                }).filter((value) => value !== undefined);

                for (const service of matches) {
                    const needle = getLastSuccessfulEventType(service) === OrderEventType.SuccessfullyFulfilledByFulfiller ? `Sending to ${service} - Success` : 'Identifying Fulfilment Provider - Success';
                    const message = getLastSuccessfulEventType(service) === OrderEventType.SuccessfullyFulfilledByFulfiller ? `Successfully sent to ${service} message not shown` : 'Successfully Routed order to fulfiller';
                    this.assert.include(JSON.stringify(this.orderActivityLogText), needle, message);
                    results.push(service);
                }
            }
        }
    });

    function  getLastSuccessfulEventType(service: string): OrderEventType {
        switch (service.toUpperCase()) {
            case 'DELTA_FRANCE':
            case 'ARGI':
                return OrderEventType.SuccessfullyRoutedToFulfiller;
            default:
                return OrderEventType.SuccessfullyFulfilledByFulfiller;
        }
    }
}
