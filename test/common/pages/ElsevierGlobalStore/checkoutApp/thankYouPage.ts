import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';

export class ThankYouPage {

    public pageTitle: string;
    public thankYouText: string;
    public thankYouMessageLocator: string;
    public orderNumberMessageLocator: string;
    public orderNumberLocator: string;
    public confirmationEmailMessageLocator: string;
    public emailAddressLocator: string;

    constructor() {
        this.pageTitle = 'Thank you | Elsevier';
        this.thankYouText = 'Thank you for your order!';
        this.thankYouMessageLocator = '#maincontent > div > div > h2';
        this.orderNumberMessageLocator = '#maincontent > div > div > div > h3';
        this.orderNumberLocator = '.order-number';
        this.confirmationEmailMessageLocator = '#maincontent > div > div > div > p';
        this.emailAddressLocator = '.email';
    }

    public async thankYouMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.thankYouMessageLocator);
    }

    public async orderNumberMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderNumberMessageLocator);
    }

    public async confirmationEmailMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.confirmationEmailMessageLocator);
    }

    public async emailAddress (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.emailAddressLocator);
    }

    public async orderNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderNumberLocator);
    }
}
