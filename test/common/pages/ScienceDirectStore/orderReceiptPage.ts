import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class SdOrderReceiptPage {

    public pageUrl: string;
    public pageTitle: string;
    public returnToOrderHistoryLinkLocator: string;
    public orderNumberLocator: string;
    public cardTypeLocator: string;
    public nameOnCardLocator: string;
    public emailAddressLocator: string;
    public subTotalLocator: string;
    public taxLocator: string;
    public orderTotalLocator: string;

    constructor(testData: ITestData) {
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

    public async visitPage (driver: WebDriver, orderNumber: string): Promise<void> {
        return await driver.get(this.pageUrl + '/' + orderNumber);
    }

    public async orderNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderNumberLocator);
    }

    public async getOrderNumber (driver: WebDriver): Promise<string> {
        return await Helpers.getText(driver, this.orderNumberLocator);
    }

    public async getCardType (driver: WebDriver): Promise<string> {
        return await Helpers.getText(driver, this.cardTypeLocator);
    }

    public async getNameOnCard (driver: WebDriver): Promise<string> {
        return await Helpers.getText(driver, this.nameOnCardLocator);
    }

    public async emailAddress (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.emailAddressLocator);
    }

    public async getEmailAddress (driver: WebDriver): Promise<string> {
        return await Helpers.getText(driver, this.emailAddressLocator);
    }

    public async subTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.subTotalLocator);
    }

    public async getSubTotal (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.subTotalLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async taxTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.taxLocator);
    }

    public async getTaxTotal (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.taxLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async orderTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalLocator);
    }

    public async getOrderTotal (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.orderTotalLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    // public async orderItemsTitles (driver: WebDriver): Promise<WebElement[]> {
    //     return await driver.findElements({ css: this.specificOrderItemTitlesLocatorSuffix });
    // }

}
