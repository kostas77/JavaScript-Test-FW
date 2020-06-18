import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class EmailVerificationPage {
    public pageUrl: string;
    public pageTitle: string;
    public confirmationMessageLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.verification;
        this.pageTitle = 'Verify Email | Elsevier';
        this.confirmationMessageLocator = '#maincontent p';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async confirmationMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.confirmationMessageLocator);
    }
}
