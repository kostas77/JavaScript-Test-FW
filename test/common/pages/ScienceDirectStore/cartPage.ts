import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class SdCartPage {
    public pageUrl: string;
    public pageTitle: string;
    public emptyCartLocator: string;
    public lineItemShortTitleLocator: string;
    public lineItemISSNLocator: string;
    public lineItemUnitPriceLocator: string;
    public deleteLineItemLocator: string;
    public cartTotalLocator: string;
    public findMoreArticlesLinkLocator: string;
    public proceedToCheckoutLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().sd.cart;
        this.pageTitle = 'Cart';
        this.emptyCartLocator = '.cart-empty__icon';
        this.lineItemShortTitleLocator = 'cart-prod-book-detail-item > div:nth-child(1) > dd';
        this.lineItemISSNLocator = 'cart-prod-book-detail-item > div:nth-child(2) > dd';
        this.lineItemUnitPriceLocator = '.cart-prod__price';
        this.deleteLineItemLocator = '.cart-prod__remove';
        this.cartTotalLocator = '.cart-total__value';
        this.findMoreArticlesLinkLocator = '.cart__continue a';
        this.proceedToCheckoutLocator = '.cart__proceed';
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async lineItemShortTitles (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemShortTitleLocator);
    }

    public async lineItemUnitPrices (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemUnitPriceLocator);
    }

    public async deleteLineItemOptions (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.deleteLineItemLocator);
    }

    public async cartTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartTotalLocator);
    }

    public async clickFindMoreArticlesLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.findMoreArticlesLinkLocator);
    }

    public async clickProceedToCheckoutButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.proceedToCheckoutLocator);
    }

}
