import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class SdOrderHistoryPage {

    public pageUrl: string;
    public pageTitle: string;
    public orderHistoryHeaderLocator: string;
    public topOrderHeaderLocator: string;
    public topOrderTotalLocator: string;
    public topOrderShowReceiptLinkLocator: string;
    public specificOrderShowReceiptLinkLocatorPrefix: string;
    public specificOrderShowReceiptLinkLocatorSuffix: string;
    public specificOrderTotalLocatorSuffix: string;
    public specificOrderItemTitlesLocatorSuffix: string;

    constructor(testData: ITestData) {
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

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async waitForOrder(driver: WebDriver, orderNumber: string): Promise<void> {
        return await Helpers.refreshPageUntilElementPresent(driver, this.getReceiptLink(orderNumber), 10 * 1000);
    }

    public async specificOrderShowReceiptLink (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.getReceiptLink(orderNumber));
    }

    public async clickSpecificOrderShowReceiptLink (driver: WebDriver, orderNumber: string): Promise<void> {
        return await (await this.specificOrderShowReceiptLink(driver, orderNumber)).click();
    }

    private getReceiptLink(orderNumber: string): string {
        return this.specificOrderShowReceiptLinkLocatorPrefix + orderNumber + this.specificOrderShowReceiptLinkLocatorSuffix;
    }

}
