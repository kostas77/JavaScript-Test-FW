import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class RenewalsHomePage {
    public pageUrl: string;
    public pageTitle: string;
    public invoiceNumberLocator: string;
    public billingAccountLocator: string;
    public accountNumberLocator: string;
    public publicationCodeLocator: string;
    public submitButtonLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().renewals.home;
        this.pageTitle = 'Enter your renewal references | Elsevier';
        this.invoiceNumberLocator = '#renewals-delta-invoice';
        this.billingAccountLocator = '#renewals-delta-billing-id';
        this.accountNumberLocator = '#renewals-argi-reference';
        this.publicationCodeLocator = '#renewals-argi-pubcode';
        this.submitButtonLocator = '#update-form-submit';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async enterInvoiceNumber (driver: WebDriver, invoiceNumber: string): Promise<void> {
        return await Helpers.enterText(driver, this.invoiceNumberLocator, invoiceNumber);
    }

    public async enterBillingAccount (driver: WebDriver, billingAccount: string): Promise<void> {
        return await Helpers.enterText(driver, this.billingAccountLocator, billingAccount);
    }

    public async enterAccountNumber (driver: WebDriver, accountNumber: string): Promise<void> {
        return await Helpers.enterText(driver, this.accountNumberLocator, accountNumber);
    }

    public async enterPublicationCode (driver: WebDriver, publicationCode: string): Promise<void> {
        return await Helpers.enterText(driver, this.publicationCodeLocator, publicationCode);
    }

    public async clickSubmitButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.submitButtonLocator);
    }

    public async enterDeltaRenewalDetails (driver: WebDriver, invoiceNumber: string, billingAccount: string): Promise<void> {
        await this.enterInvoiceNumber(driver, invoiceNumber);
        await this.enterBillingAccount(driver, billingAccount);
        return await this.clickSubmitButton(driver);
    }

    public async enterArgiOrAirBusinessRenewalDetails (driver: WebDriver, accountNumber: string, publicationCode: string): Promise<void> {
        await this.enterAccountNumber(driver, accountNumber);
        await this.enterPublicationCode(driver, publicationCode);
        return await this.clickSubmitButton(driver);
    }
}
