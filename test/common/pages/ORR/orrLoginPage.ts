import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { CommonTestData } from '../../support/commonTestData';

const commonTestData = new CommonTestData();

export class OrrLoginPage {

    public pageTitle: string;
    public pageUrl: string;
    public usernameTextBoxLocator: string;
    public passwordTextBoxLocator: string;
    public logInButtonLocator: string;
    public copyrightLocator: string;
    public mainTitleLocator: string;
    public pageTitleLocator: string;

    constructor() {
        this.pageTitle = 'Elsevier Commerce -';
        this.pageTitleLocator = 'head > title';
        this.pageUrl = commonTestData.getUrlFor().orr.home;
        this.usernameTextBoxLocator = 'input[name="username"]';
        this.passwordTextBoxLocator = 'input[name="password"]';
        this.logInButtonLocator = 'input[type="submit"][value="Log In"]';
        this.copyrightLocator = '.large-9 p';
        this.mainTitleLocator = 'h1';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async mainTitle (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.mainTitleLocator);
    }

    public async usernameTextBox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.usernameTextBoxLocator);
    }

    public async passwordTextBox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.passwordTextBoxLocator);
    }

    public async logInButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.logInButtonLocator);
    }

    public async logIn (driver: WebDriver, username: string, password: string): Promise<void> {
        await (await this.usernameTextBox(driver)).sendKeys(username);
        await (await this.passwordTextBox(driver)).sendKeys(password);
        return await (await this.logInButton(driver)).click();
    }
}
