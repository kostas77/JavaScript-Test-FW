import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class GscCartPage {
    protected testData: ITestData;
    // public pageUrl: string;
    public pageTitle: string = 'Shopping Cart | Elsevier';
    public titleLocator: string = 'h1';
    public loginLinkLocator: string = '.header-item--account';
    public cartHeaderLocator: string = '.cart__header';
    public removeButtonsLocator: string = '.cart-prod__remove';
    public proceedToCheckoutLocator: string = '.cart__proceed';
    public continueShoppingLocator: string = '.cart__continue';

    constructor(testData: ITestData) {
        this.testData = testData;
        // this.pageUrl = this.testData.getUrlFor().GlobalStore.addToCart;
    }

    // public async getPage(driver: WebDriver): Promise<void> {
    //     return await driver.get(this.pageUrl);
    // }

    public async title(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.titleLocator);
    }

    public async cartHeader(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartHeaderLocator);
    }

    public async loginLink (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.loginLinkLocator);
    }

    public async selectLoginLink (driver: WebDriver): Promise<void> {
        return await (await this.loginLink(driver)).click();
    }

    public async proceedToCheckoutButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.proceedToCheckoutLocator);
    }

    public async clickProceedToCheckoutButton (driver: WebDriver): Promise<void> {
        return await (await this.proceedToCheckoutButton(driver)).click();
    }

    public async continueShoppingButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.continueShoppingLocator);
    }

    public async clickContinueShoppingLink (driver: WebDriver): Promise<void> {
        return await (await this.continueShoppingButton(driver)).click();
    }

}
