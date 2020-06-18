import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class HelpAndContactPage {
    public pageUrl: string;
    public pageTitle: string;
    public introIconLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().service.helpAndContact;
        this.pageTitle = 'Home - Ecommerce Support';
        this.introIconLocator = '.rn_IntroIcon';
    }

    public async introIcon (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.introIconLocator);
    }
}
