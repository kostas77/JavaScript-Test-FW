import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { DriverConfig } from '../../../../features_global/support/driverConfig';

const config = new DriverConfig();

export class JournalProductPage {
    public mainTitleLocator: string;
    public countrySelectorDropdownLocator: string;
    public threeYearSubscriptionOptionLocator: string;
    public addToCartButtonLocator: string;
    public headerPrintIsbnLocator: string;
    public printPricesLocator: string;
    public rollingPrintPricesLocator: string;
    public productListedPrice: string;
    public requestAQuoteButtonLocator: string;
    public quoteModalLocator: string;
    public closeQuoteModalButtonLocator: string;
    public taxExemptLinkLocator: string;
    public taxExemptModalLocator: string;
    public closeTaxExemptModalButtonLocator: string;

    constructor() {
        this.mainTitleLocator = '.main-title';
        this.countrySelectorDropdownLocator = '#country-selector';
        this.threeYearSubscriptionOptionLocator = 'label~ label+ label .no-margin';
        this.addToCartButtonLocator = '.addToCart-btn';
        this.printPricesLocator = '.format-price:not(.hide) .price-value';
        this.rollingPrintPricesLocator = '.format-price:not(.hide)';
        this.productListedPrice = '';
        this.requestAQuoteButtonLocator = '.quote-button';
        this.quoteModalLocator = '#quote-modal:not(.hide)';
        this.closeQuoteModalButtonLocator = '.quote-close-button';
        this.taxExemptLinkLocator = '#taxexempt';
        this.taxExemptModalLocator = '#tax-exempt-modal:not(.hide)';
        this.closeTaxExemptModalButtonLocator = '.tax-exempt-close-button';
    }

    public async mainTitle (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.mainTitleLocator);
    }

    public async headerPrintIsbn (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.headerPrintIsbnLocator);
    }

    public async selectThreeYearSubscriptionOption (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.threeYearSubscriptionOptionLocator);
    }

    public async selectCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await Helpers.clickElement(driver, this.countrySelectorDropdownLocator + '>option[value*="' + countryCode + '"]');
    }

    public async AddToCartButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.addToCartButtonLocator);
    }

    public async selectAddToCartButton (driver: WebDriver): Promise<void> {
        if (config.browserName.toLowerCase() === 'android') {
            return await Helpers.jsClickOnElement(driver, await this.AddToCartButton(driver));
        }
        return await Helpers.clickElement(driver, this.addToCartButtonLocator);
    }

    public async printPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.printPricesLocator);
    }

    public async getPrintPrice (driver: WebDriver): Promise<string> {
        return await (await this.printPrice(driver)).getText();
    }

    public async rollingPrintPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.rollingPrintPricesLocator);
    }

    public async getRollingPrintPrice (driver: WebDriver): Promise<string> {
        return await (await this.rollingPrintPrice(driver)).getText();
    }

    public async addProductToCart (driver: WebDriver, productName: string): Promise<void> {
        switch (productName) {
            case 'Delta personal journal':
                this.productListedPrice = await this.getPrintPrice(driver);
                await this.selectAddToCartButton(driver);
                break;
            case 'Delta institutional journal':
            case 'Institutional journal - GBP, EUR, JPY':
                this.productListedPrice = await this.getPrintPrice(driver);
                await this.selectAddToCartButton(driver);
                break;
            case 'ARGI personal journal (1 year)':
            case 'Personal journal - GBP, EUR, JPY':
                this.productListedPrice = await this.getPrintPrice(driver);
                await this.selectAddToCartButton(driver);
                break;
            case 'ARGI institutional journal (3 years)':
                await this.selectThreeYearSubscriptionOption(driver);
                this.productListedPrice = await this.getRollingPrintPrice(driver);
                await this.selectAddToCartButton(driver);
                break;
            default:
                throw new Error('Unknown product specified: ' + productName);
        }
    }

    public async selectRequestAQuoteButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.requestAQuoteButtonLocator);
    }

    public async selectCloseQuoteButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.closeQuoteModalButtonLocator);
    }

    public async selectTaxExemptLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.taxExemptLinkLocator);
    }

    public async selectCloseTaxExemptButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.closeTaxExemptModalButtonLocator);
    }

}
