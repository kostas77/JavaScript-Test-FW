import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class SdThankYouPage {

    public pageTitle: string;
    public pageUrl: string;
    public thankYouText: string;
    public thankYouMessageLocator: string;
    public orderNumberLocator: string;
    public orderProductDetails: string;
    public confirmationEmailMessageLocator: string;
    public emailAddressLocator: string;
    public helpPagesLinkLocator: string;
    public exploreMoreArticlesButtonLocator: string;
    public articleLinksLocator: string;
    public articleTitlesLocator: string;
    public articleISSNsLocator: string;

    constructor(testData: ITestData) {
        this.pageTitle = 'Thanks for your order';
        this.pageUrl = testData.getUrlFor().sd.thanks;
        this.thankYouMessageLocator = '.thanks__header h1';
        this.thankYouText = 'Thanks for your order';
        this.orderNumberLocator = '.thanks__order-detail p strong';
        this.orderProductDetails = '.cart-prod-book-detail-item dd';
        this.confirmationEmailMessageLocator = '.';
        this.emailAddressLocator = '.list-branded strong';
        this.helpPagesLinkLocator = '.thanks__next-steps.list-branded a';
        this.exploreMoreArticlesButtonLocator = '.thanks__order-detail a.btn';
        this.articleLinksLocator = '.cart-prod__body a';
        this.articleTitlesLocator = '.cart-prod-book-detail-item > div:nth-child(1) > dd';
        this.articleISSNsLocator = '.cart-prod-book-detail-item > div:nth-child(2) > dd';
    }

    public async thankYouMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.thankYouMessageLocator);
    }

    public async orderNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderNumberLocator);
    }

    public async emailAddress (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.emailAddressLocator);
    }

    public async confirmationEmailMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.confirmationEmailMessageLocator);
    }

    public async exploreMoreArticlesButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.exploreMoreArticlesButtonLocator);
    }

    public async helpPagesLink (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.helpPagesLinkLocator);
    }

    public async articleTitles (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.articleTitlesLocator);
    }

    public async articleISSNs (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.articleISSNsLocator);
    }
}
