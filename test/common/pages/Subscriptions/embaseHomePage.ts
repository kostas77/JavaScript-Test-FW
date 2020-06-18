import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class EmbaseHomePage {
    public pageTitle: string;
    public pageUrl: string;
    public weeklySubscriptionButtonLocator: string;
    public monthlySubscriptionButtonLocator: string;
    public footerLogoLocator: string;

    constructor(testData: ITestData) {
        this.pageTitle = 'Biomedical research – Embase | Elsevier';
        this.pageUrl = testData.getUrlFor().elsevier.embase;
        this.weeklySubscriptionButtonLocator = '.add-to-cart7';
        this.monthlySubscriptionButtonLocator = '.add-to-cart30';
        this.footerLogoLocator = '.gh-logo';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async nonSolusLogo (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.footerLogoLocator);
    }

    public async subscriptionOption (driver: WebDriver, duration: string): Promise<WebElement> {
        switch (duration) {
            case '7 Day Subscription':
                return await Helpers.getElement(driver, this.weeklySubscriptionButtonLocator);
            case '30 Day Subscription':
                return await Helpers.getElement(driver, this.monthlySubscriptionButtonLocator);
            default:
                throw new Error('Invalid option for Embase subscription requested');
        }
    }

    public async clickSubscriptionOption (driver: WebDriver, duration: string): Promise<void> {
        return await (await this.subscriptionOption(driver, duration)).click();
    }
}
