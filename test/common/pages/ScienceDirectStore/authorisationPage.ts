import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestAccountDetails } from '../../support/interfaces';

export class SdAuthorisationPage {

    // public pageUrl: string;
    public pageTitle: string;
    public signInEmailLocator: string;
    public signInPasswordLocator: string;
    public continueButtonLocator: string;
    public signInButtonLocator: string;
    public staySignedInLocator: string;

    constructor() {
        // this.pageUrl = workingEnv.checkoutUrl + '/auth';
        this.pageTitle = 'ScienceDirect Sign in';
        this.signInEmailLocator = '#bdd-email';
        this.signInPasswordLocator = '#bdd-password';
        this.continueButtonLocator = '#bdd-elsPrimaryBtn';
        this.signInButtonLocator = '#bdd-elsPrimaryBtn';
        this.staySignedInLocator = '#rememberMe';
    }

    // public async getPage (driver: WebDriver): Promise<void> {
    //     return await driver.get(this.pageUrl);
    // }

    public async enterSignInEmailAddress (driver: WebDriver, emailAddress: string): Promise<void> {
        return await Helpers.enterText(driver, this.signInEmailLocator, emailAddress);
    }

    public async clickContinueButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.continueButtonLocator);
    }

    public async enterSignInPassword (driver: WebDriver, password: string): Promise<void> {
        return await Helpers.enterText(driver, this.signInPasswordLocator, password);
    }

    public async clickSignInButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.signInButtonLocator);
    }

    public async clickStaySignedInCheckbox (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.staySignedInLocator);
    }

    public async signInAsKnownCustomer (driver: WebDriver, customerDetails: ITestAccountDetails): Promise<void> {
        await this.enterSignInEmailAddress(driver, customerDetails.emailAddress);
        await this.clickContinueButton(driver);
        await this.enterSignInPassword(driver, customerDetails.password);
        return await this.clickSignInButton(driver);
    }
}
