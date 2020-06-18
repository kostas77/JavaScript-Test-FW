import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { CommonTestData } from '../../support/commonTestData';

const commonTestData = new CommonTestData();

export class OrrOrderPage {

    public pageTitle: string;
    public pageUrl: string;
    public cancelSubscriptionButtonLocator: string;
    public copyrightLocator: string;
    public backToTopLocator: string;
    public mainTitleLocator: string;
    public orderNumberLocator: string;
    public orderTotalPriceLocator: string;
    public orderTotalItemsLocator: string;
    public customerEmailLocator: string;
    public paymentGrossTotalLocator: string;
    public paymentDiscountTotalLocator: string;
    public paymentTaxTotalLocator: string;
    public activityLogEntryLocator: string;
    public creditCardTokenLocator: string;
    public orderIsbnsLocator: string;
    public successfulOrderReceiptActivityText: string;
    public successfulPaymentCheckActivityText: string;
    public successfulPaymentSendActivityText: string;
    public successfulSentToAnEActivityText: string;
    public successfulSentToAnEActivityAmirsysText: string;
    public successfulSentToDeltaActivityText: string;
    public successfulSentToSdrmActivityText: string;
    public successfulSentToVstFulfilmentText: string;
    public successfulPaymentTakenActivityText: string;
    public successfulNoPaymentToProcessActivityText: string;
    public successfulCalculateTaxActivityText: string;
    public failedSDRMOrderActivityText: string;
    public successfulSentToCrmActivityText: string;
    public successfulRoutingToBookmasterActivityText: string;
    public failedSentToCrmActivityText: string;
    public successfulSentToSubscriptionActivityText: string;
    public successfulEntitlementText: string;
    public successfulSDTransactionReportText: string;
    public successfulSDFinancialFulfilmentText: string;

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
        this.activityLogEntryLocator = '.activity-log-entry'; // Would '.medium-8:nth-child(1)' also work?
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

    public async visitPage (driver: WebDriver, orderNumber: string): Promise<void> {
        return await driver.get(this.pageUrl + '/' + orderNumber);
    }

    public async cancelSubscriptionButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cancelSubscriptionButtonLocator);
    }

    public async orderNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderNumberLocator);
    }

    public async orderTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalPriceLocator);
    }

    public async orderTotalItems (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalItemsLocator);
    }

    public async customerEmail (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.customerEmailLocator);
    }

    public async paymentGrossTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.paymentGrossTotalLocator);
    }

    public async paymentDiscountTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.paymentDiscountTotalLocator);
    }

    public async paymentTaxTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.paymentTaxTotalLocator);
    }

    public async activityLogEntries (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.activityLogEntryLocator);
    }

    public async creditCardToken (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.creditCardTokenLocator);
    }

    public async orderItemIsbns (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.orderIsbnsLocator);
    }
}
