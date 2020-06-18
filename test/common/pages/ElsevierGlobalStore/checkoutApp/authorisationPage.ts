import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestAccountDetails, ITestData } from '../../../support/interfaces';
import { DriverConfig } from '../../../../features_global/support/driverConfig';

const config = new DriverConfig();

export class AuthorisationPage {

    public pageUrl: string;
    public pageTitle: string;
    public captchaLocator: string;
    public firstNameLocator: string;
    public lastNameLocator: string;
    public signUpEmailLocator: string;
    public signUpPasswordLocator: string;
    public confirmPasswordLocator: string;
    public termsLocator: string;
    public createAccountLocator: string;
    public signInEmailLocator: string;
    public signInPasswordLocator: string;
    public loginLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.auth;
        this.pageTitle = 'Signup | Login | Elsevier';
        this.captchaLocator = '#registration_form > div:nth-child(6) > div > div';
        this.firstNameLocator = '#signup-firstName';
        this.lastNameLocator = '#signup-lastName';
        this.signUpEmailLocator = '#signup-email';
        this.signUpPasswordLocator = '#signup-password';
        this.confirmPasswordLocator = '#signup-password-2';
        this.termsLocator = '#accept-terms';
        this.createAccountLocator = '#cd-signup [value="Create account"]';
        this.signInEmailLocator = '#signin-email';
        this.signInPasswordLocator = '#signin-password';
        this.loginLocator = '#cd-login [value="Log In"]';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async createAccountButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.createAccountLocator);
    }

    public async enterFirstName (driver: WebDriver, firstName: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.firstNameLocator)).sendKeys(firstName);
    }

    public async enterLastName (driver: WebDriver, lastName: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.lastNameLocator)).sendKeys(lastName);
    }

    public async enterSignUpEmailAddress (driver: WebDriver, emailAddress: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.signUpEmailLocator)).sendKeys(emailAddress);
    }

    public async enterSignUpPassword (driver: WebDriver, password: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.signUpPasswordLocator)).sendKeys(password);
    }

    public async confirmSignUpPassword (driver: WebDriver, password: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.confirmPasswordLocator)).sendKeys(password);
    }

    public async clickTermsCheckbox (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.termsLocator)).click();
    }

    public async selectCreateAccountButton (driver: WebDriver): Promise<void> {
        return await (await this.createAccountButton(driver)).click();
    }

    public async enterSignInEmailAddress (driver: WebDriver, emailAddress: string): Promise<void> {
        await (await Helpers.getElement(driver, this.signInEmailLocator)).sendKeys(emailAddress);
        if (config.browserName === 'ie') {
            const textValue = await driver.executeScript('return document.getElementById("signin-email").value;');
            if (textValue !== emailAddress) {
                console.log('retrying email address...');
                await (await Helpers.getElement(driver, this.signInEmailLocator)).clear();
                await (await Helpers.getElement(driver, this.signInEmailLocator)).sendKeys(emailAddress);
            }
        }
        return;
    }

    public async enterSignInPassword (driver: WebDriver, password: string): Promise<void> {
        await (await Helpers.getElement(driver, this.signInPasswordLocator)).sendKeys(password);
        if (config.browserName === 'ie') {
            const textValue = await driver.executeScript('return document.getElementById("signin-password").value;');
            if (textValue !== password) {
                console.log('retrying password...');
                await (await Helpers.getElement(driver, this.signInPasswordLocator)).clear();
                await (await Helpers.getElement(driver, this.signInPasswordLocator)).sendKeys(password);
            }
        }
        return;
    }

    public async clickLoginButton (driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.loginLocator, 10 * 1000);
        await (await Helpers.getElement(driver, this.loginLocator)).click();
        return;
    }

    public async signInAsKnownCustomer (driver: WebDriver, customerDetails: ITestAccountDetails): Promise<void> {
        await this.enterSignInEmailAddress(driver, customerDetails.emailAddress);
        await this.enterSignInPassword(driver, customerDetails.password);
        return await this.clickLoginButton(driver);
    }
}
