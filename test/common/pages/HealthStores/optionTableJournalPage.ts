import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class OptionTableJournalPage {
    public mainTitleLocator: string;
    public addToCartButtonLocator: string;

    constructor() {
        this.mainTitleLocator = 'div.product-name > h1:nth-child(1)';
        this.addToCartButtonLocator = 'div.small-5:nth-child(2) > div:nth-child(2) > button:nth-child(1)';
    }

    public async addToCartButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.addToCartButtonLocator);
    }

    public async addProductToCart (driver: WebDriver): Promise<void> {
        return await (await this.addToCartButton(driver)).click();
    }
}
