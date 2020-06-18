import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class AccountPage {
    public pageTitle: string;
    public contactInformationHeaderLocator: string;
    public pageUrl: string;
    public personalDetailsOptionLocator: string;
    public addressBookOptionLocator: string;
    public changePasswordOptionLocator: string;
    public onlineSubscriptionOptionLocator: string;
    public orderHistoryOptionLocator: string;
    public customerDetailsLocator: string;
    public editAddressesLocator: string;

    constructor() {
        this.pageTitle = 'My Account | Elsevier';
        this.contactInformationHeaderLocator = 'header-item__text';
        this.personalDetailsOptionLocator = '#cd-main-nav > ul > li:nth-child(1) > a';
        this.addressBookOptionLocator = '#cd-main-nav > ul > li:nth-child(2) > a';
        this.changePasswordOptionLocator = '#cd-main-nav > ul > li:nth-child(3) > a';
        this.onlineSubscriptionOptionLocator = '#cd-main-nav > ul > li:nth-child(4) > a';
        this.orderHistoryOptionLocator = '#cd-main-nav > ul > li:nth-child(5) > a';
        this.customerDetailsLocator = '#dashboard > div:nth-child(2) > p:nth-child(3)';
        this.editAddressesLocator = '.account-addresses+ .columns a';
    }

    // public async getPage (driver: WebDriver): Promise<void> {
    //     return await driver.get(this.pageUrl);
    // }

    public async clickPersonalDetailsOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.personalDetailsOptionLocator);
    }

    public async clickAddressBookOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.addressBookOptionLocator);
    }

    public async clickChangePasswordOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.changePasswordOptionLocator);
    }

    public async clickOnlineSubscriptionOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.onlineSubscriptionOptionLocator);
    }

    public async clickOrderHistoryOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.orderHistoryOptionLocator);
    }

    public async customerDetails (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.customerDetailsLocator);
    }

    public async clickEditAddressesLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.editAddressesLocator);
    }
}
