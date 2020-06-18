import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';

export class GooglePreviewPage {
    public IFrameLocator: string;
    public buyThisBookDropdownLocator: string;

    constructor() {
        this.IFrameLocator = '#destination_publishing_iframe_elsevier_0';
        this.buyThisBookDropdownLocator = '[title="Buy this book"]';
    }

    public async IFrame (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.IFrameLocator);
    }

    public async selectBuyThisBookDropdown (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.buyThisBookDropdownLocator);
    }

}
