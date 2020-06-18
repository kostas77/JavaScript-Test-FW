import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class PayPalPage {

    protected testData: ITestData;
    public locators = {
        continueButtonLocator: '#confirmButtonTop',
        merchantReturnButtonLocator: '#merchantReturnBtn'
    };

    constructor(testData: ITestData) {
        this.testData = testData;
        this.locators = { ...this.locators, ...testData.getSelectorOverrides().payPalPage };
    }

    public async continueButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.continueButtonLocator);
    }

    public async continueButtonClick (driver: WebDriver): Promise<void> {
        return await (await this.continueButton(driver)).click();
    }

    public async merchantReturnButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.merchantReturnButtonLocator);
    }

    public async merchantReturnButtonClick (driver: WebDriver): Promise<void> {
        return await (await this.merchantReturnButton(driver)).click();
    }

    public async pay (driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.locators.continueButtonLocator, 60 * 1000);
        await driver.sleep(6 * 1000); // element appears before the wait spinner disappear
        await this.continueButtonClick(driver);
    }

    public async returnToMerchant(driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.locators.merchantReturnButtonLocator, 60 * 1000);
        await driver.sleep(2 * 1000); // element appears before the wait spinner disappear
        await this.merchantReturnButtonClick(driver);
    }
}
