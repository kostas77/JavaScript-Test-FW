import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class PayPalLoginPage {

    protected testData: ITestData;
    public locators = {
        acceptCookiesButtonLocator: '#acceptAllButton',
        usernameLocator: '#email',
        passwordLocator: '#password',
        loginButtonLocator: '#btnLogin'
    };

    constructor(testData: ITestData) {
        this.testData = testData;
        this.locators = { ...this.locators, ...testData.getSelectorOverrides().payPalLoginPage };
    }

    public async acceptCookiesButton(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.acceptCookiesButtonLocator);
    }

    public async acceptCookiesButtonClick(driver: WebDriver): Promise<void> {
        return await (await this.acceptCookiesButton(driver)).click();
    }

    public async username (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.usernameLocator);
    }

    public async enterLoginEmail (driver: WebDriver, email: string): Promise<void> {
        await (await this.username(driver)).clear();
        return await (await this.username(driver)).sendKeys(email);
    }

    public async password (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.passwordLocator);
    }

    public async enterLoginPassword (driver: WebDriver, password: string): Promise<void> {
        return await (await this.password(driver)).sendKeys(password);
    }

    public async loginButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.loginButtonLocator);
    }

    public async selectloginButton (driver: WebDriver): Promise<void> {
        return await (await this.loginButton(driver)).click();
    }

    public async enterLoginDetails (driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.locators.usernameLocator, 60 * 1000);
        await this.acceptCookiesButtonClick(driver);
        await this.enterLoginEmail(driver, this.testData.getDataFor().payPalAccount.email);
        await this.enterLoginPassword(driver, this.testData.getDataFor().payPalAccount.password);
        await this.selectloginButton(driver);
        return;
    }
}
