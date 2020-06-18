import { WebDriver, WebElement } from 'selenium-webdriver';

export class RenewalsThankYouPage {

    public pageTitle: string;
    public thankYouText: string;
    public thankYouMessageLocator: string;
    public orderNumberLocator: string;
    public confirmationEmailMessageLocator: string;
    public emailAddressLocator: string;

    constructor() {
        this.pageTitle = 'Thank you for your subscription renewals | Elsevier';
        this.thankYouText = 'Thank you for your renewal!';
        this.thankYouMessageLocator = '.page-header';
        this.orderNumberLocator = '#maincontent > div > div > h2 > span > strong';
        this.confirmationEmailMessageLocator = '#maincontent > div > div > div > p';
        this.emailAddressLocator = '.email';
    }

    public async thankYouMessage (driver: WebDriver): Promise<WebElement> {
        return driver.findElement({ css: this.thankYouMessageLocator });
    }

    public async confirmationEmailMessage (driver: WebDriver): Promise<WebElement> {
        return driver.findElement({ css: this.confirmationEmailMessageLocator });
    }

    public async emailAddress (driver: WebDriver): Promise<WebElement> {
        return driver.findElement({ css: this.emailAddressLocator });
    }

    public async orderNumber (driver: WebDriver): Promise<WebElement> {
        return driver.findElement({ css: this.orderNumberLocator });
    }
}
