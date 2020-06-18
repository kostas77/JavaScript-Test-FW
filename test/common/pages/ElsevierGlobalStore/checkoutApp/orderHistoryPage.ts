import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class OrderHistoryPage {

    public pageUrl: string;
    public pageTitle: string;
    public orderHistoryHeaderLocator: string;
    public orderHistoryOrderHeaderLocator: string;
    public topOrderNumberLocator: string;
    public topOrderTotalLocator: string;
    public topOrderMoreInfoArrowLocator: string;
    public specificOrderLocatorPrefix: string;
    public specificOrderNumberLocatorSuffix: string;
    public specificOrderTotalLocatorSuffix: string;
    public specificOrderMoreInfoArrowLocatorSuffix: string;
    public specificOrderMoreInfoLinkLocatorSuffix: string;
    public specificOrderMoreInfoLinkLocatorSuffixMobile: string;
    public specificOrderItemTitlesLocatorSuffix: string;
    public specificOrderItemDownloadMessageLocatorSuffix: string;
    public specificOrderItemSdrmLinkLocatorSuffix: string;
    public specificOrderItemISBNsLocatorSuffix: string;
    public vstDownloadLinkText: string;
    public sdrmDownloadText: string;
    public sdrmDownloadUrlPrefix: string;
    public vstDownloadUrlRegExp: RegExp;

    constructor(variant: string, testData: ITestData) {
        if (variant === 'Elsevier') {
            this.pageUrl = testData.getUrlFor().elsevier.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        } else if (variant === 'GSC') {
            this.pageUrl = testData.getUrlFor().gsc.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        } else if (variant === 'CK') {
            this.pageUrl = testData.getUrlFor().ck.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        } else if (variant === 'Amirsys') {
            this.pageUrl = testData.getUrlFor().amirsys.orderHistory;
            this.pageTitle = 'Order History | Elsevier';
        } else if (variant === 'Subscriptions') {
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

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async topOrderNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.topOrderNumberLocator);
    }

    public async getTopOrderNumber (driver: WebDriver): Promise<string> {
        return await (await this.topOrderNumber(driver)).getText();
    }

    public async topOrderTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.topOrderTotalLocator);
    }

    public async topOrderMoreInfoArrow (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.topOrderMoreInfoArrowLocator);
    }

    public async specificOrderNumber (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderNumberLocatorSuffix);
    }

    public async specificOrderTotal (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderTotalLocatorSuffix);
    }

    public async getSpecificOrderTotal (driver: WebDriver, orderNumber: string): Promise<string> {
        return await (await this.specificOrderTotal(driver, orderNumber)).getText();
    }

    public async specificOrderMoreInfoArrow (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoArrowLocatorSuffix);
    }

    public async specificOrderMoreInfoLink (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoLinkLocatorSuffix);
    }

    public async specificOrderMoreInfoLinkMobile (driver: WebDriver, orderNumber: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderMoreInfoLinkLocatorSuffixMobile);
    }

    public async specificOrderItemTitles (driver: WebDriver, orderNumber: string): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemTitlesLocatorSuffix);
    }

    public async specificOrderItemDownloadMessages (driver: WebDriver, orderNumber: string): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemDownloadMessageLocatorSuffix);
    }

    public async specificOrderItemSdrmDownloadLinks (driver: WebDriver, orderNumber: string): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemSdrmLinkLocatorSuffix);
    }

    public async specificOrderItemVstDownloadLinks (driver: WebDriver, orderNumber: string): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, `#order-${orderNumber} .order-item-downloads > p a[href*="\/order\/item\/redirect\/"]`);
    }

    public async specificOrderItemIsbns (driver: WebDriver, orderNumber: string): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificOrderLocatorPrefix + orderNumber + this.specificOrderItemISBNsLocatorSuffix);
    }

    public async allOrdersItemTitles (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificOrderItemTitlesLocatorSuffix);
    }

    public async orderHistoryOrderHeader (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderHistoryOrderHeaderLocator);
    }

    public async orderHistoryHeader (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderHistoryHeaderLocator);
    }

}
