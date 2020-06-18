import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class CkProductPage {
    public annualSubscriptionButtonLocator: string;
    public monthlySubscriptionButtonLocator: string;

    constructor() {
        this.annualSubscriptionButtonLocator = '.purchase-button-annual';
        this.monthlySubscriptionButtonLocator = '.purchase-button-monthly';
    }

    public async subscriptionOption (driver: WebDriver, duration: string): Promise<WebElement> {
        switch (duration) {
            case '1 Year Subscription':
                return await Helpers.getElement(driver, this.annualSubscriptionButtonLocator);
            case '30 Day Subscription':
                return await Helpers.getElement(driver, this.monthlySubscriptionButtonLocator);
            default:
                throw new Error('Invalid option for CK subscription requested');
        }
    }

    public async clickSubscriptionOption (driver: WebDriver, duration: string): Promise<void> {
        return await (await this.subscriptionOption(driver, duration)).click();
    }
}
