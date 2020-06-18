import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class AmirsysProductPage {

    public trialToggleCheckboxLocator: string;
    public trialToggleCheckbox: any;

    constructor() {
        this.trialToggleCheckboxLocator = '.item-amirsys-trial';
    }

    public async subscriptionOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.trialToggleCheckboxLocator);
    }

    public async clickSubscriptionOption (driver: WebDriver, isTrial: boolean): Promise<void> {
        this.trialToggleCheckbox = await this.subscriptionOption(driver);
        if ((await this.trialToggleCheckbox.isSelected() && isTrial === false) || (!await this.trialToggleCheckbox.isSelected() && isTrial === true)) {
            return this.trialToggleCheckbox.click();
        }
    }
}
