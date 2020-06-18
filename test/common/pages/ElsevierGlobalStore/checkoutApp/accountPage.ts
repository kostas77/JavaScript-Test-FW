import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class AccountPage {
    public pageUrl: string;
    public pageTitle: string;
    public contactInformationHeaderLocator: string;
    public personalDetailsOptionLocator: string;
    public addressBookOptionLocator: string;
    public changePasswordOptionLocator: string;
    public onlineSubscriptionOptionLocator: string;
    public orderHistoryOptionLocator: string;
    public customerDetailsLocator: string;
    public sendVerificationEmailLocator: string;
    public editAddressesLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.account;
        this.pageTitle = 'My Account | Elsevier';
        this.contactInformationHeaderLocator = 'h4#contact-info-heading';
        this.personalDetailsOptionLocator = '#cd-main-nav > ul > li:nth-child(1) > a';
        this.addressBookOptionLocator = '#cd-main-nav > ul > li:nth-child(2) > a';
        this.changePasswordOptionLocator = '#cd-main-nav > ul > li:nth-child(3) > a';
        this.onlineSubscriptionOptionLocator = '#cd-main-nav > ul > li:nth-child(4) > a';
        this.orderHistoryOptionLocator = '#cd-main-nav > ul > li:nth-child(5) > a';
        this.customerDetailsLocator = '#dashboard > div:nth-child(2) > p:nth-child(3)';
        this.sendVerificationEmailLocator = '#dashboard > div:nth-child(2) > p:nth-child(3) a';
        this.editAddressesLocator = '.account-addresses+ .columns a';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async personalDetailsOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.personalDetailsOptionLocator);
    }

    public async selectPersonalDetailsOption (driver: WebDriver): Promise<void> {
        return await (await this.personalDetailsOption(driver)).click();
    }

    public async sendVerificationEmailLink (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.sendVerificationEmailLocator);
    }

    public async clickSendVerificationEmailLink (driver: WebDriver): Promise<void> {
        return await (await this.sendVerificationEmailLink(driver)).click();
    }

    public async addressBookOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.addressBookOptionLocator);
    }

    public async selectAddressBookOption (driver: WebDriver): Promise<void> {
        return await (await this.addressBookOption(driver)).click();
    }

    public async changePasswordOption (driver: WebDriver): Promise<WebElement> {
        return Helpers.getElement(driver, this.changePasswordOptionLocator);
    }

    public async selectChangePasswordOption (driver: WebDriver): Promise<void> {
        return await (await this.changePasswordOption(driver)).click();
    }

    public async onlineSubscriptionOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.onlineSubscriptionOptionLocator);
    }

    public async selectOnlineSubscriptionOption (driver: WebDriver): Promise<void> {
        return await (await this.onlineSubscriptionOption(driver)).click();
    }

    public async orderHistoryOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderHistoryOptionLocator);
    }

    public async selectOrderHistoryOption (driver: WebDriver): Promise<void> {
        return await (await this.orderHistoryOption(driver)).click();
    }

    public async customerDetails (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.customerDetailsLocator);
    }

    public async selectEditAddressesLink (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.editAddressesLocator)).click();
    }
}
