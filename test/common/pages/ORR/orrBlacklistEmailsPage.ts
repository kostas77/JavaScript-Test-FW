import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { CommonTestData } from '../../support/commonTestData';

const commonTestData = new CommonTestData();

export class OrrBlacklistEmailsPage {
    public pageUrl: string;
    public pageTitle: string;
    public blacklistEmailHeaderLocator: string;

    constructor() {
        this.pageUrl = commonTestData.getUrlFor().orr.blacklistEmails;
        this.pageTitle = 'My Account | Elsevier';
        this.blacklistEmailHeaderLocator = 'h1';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async blacklistEmailHeader (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.blacklistEmailHeaderLocator);
    }
}
