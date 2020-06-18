import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class CartPage {
    protected testData: ITestData;
    public pageUrl: string;
    public titleLocator: string;
    public removeButtonsLocator: string;

    constructor(testData: ITestData) {
        this.testData = testData;
        this.pageUrl = this.testData.getUrlFor().HealthStore.cart;
        this.titleLocator = 'h1';
        this.removeButtonsLocator = '#shopping-cart-table tbody tr a.btn-remove';
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async title (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.titleLocator);
    }

    public async clearCart (driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.titleLocator, 20 * 1000);
        const title = await (await Helpers.getElement(driver, this.titleLocator)).getText();
        if (title.toLowerCase() === this.testData.getTitles().emptyCart.toLowerCase()) {
            return;
        }
        await Helpers.waitUntilElementHasState(driver, 'located', this.removeButtonsLocator, 20 * 1000);
        const removeButtons = await Helpers.getElementsArray(driver, this.removeButtonsLocator);
        await removeButtons[0].click();
        await this.clearCart(driver);
        return;
    }

}
