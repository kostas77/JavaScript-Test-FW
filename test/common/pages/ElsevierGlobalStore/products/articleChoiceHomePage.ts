import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class ArticleChoiceHomePage {
    public pageTitle: string;
    public pageUrl: string;
    public globalHeaderLocator: string;
    public countrySelectorDropdownLocator: string;
    public articleSelectorSliderLocator: string;
    public articleSelectorSliderPlusLocator: string;
    public articleAmountLocator: string;
    public totalPriceLocator: string;
    public addToCartButtonLocator: string;
    public footerLogoLocator: string;
    public productListedPrice: string;

    constructor(testData: ITestData) {
        this.pageTitle = 'ArticleChoice® - Content - ScienceDirect - Solutions | Elsevier'; // TODO - Need to deal with special character
        this.pageUrl = testData.getUrlFor().elsevier.articleChoice;
        this.globalHeaderLocator = '.global-header-wrapper';
        this.countrySelectorDropdownLocator = '#country-selector';
        this.articleSelectorSliderLocator = '#slider';
        this.articleSelectorSliderPlusLocator = '.sliderMore';
        this.articleAmountLocator = '#articleAmount';
        this.totalPriceLocator = '#priceOriginal';
        this.addToCartButtonLocator = '#addToCart';
        this.footerLogoLocator = '.gh-logo';
        this.productListedPrice = '';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async globalHeader (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.globalHeaderLocator);
    }

    public async nonSolusLogo (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.footerLogoLocator);
    }

    public async selectArticleAmountOption (driver: WebDriver, option: number): Promise<void> {
        for (let i = 0; i < option; i++) {
            await Helpers.clickElement(driver, this.articleSelectorSliderPlusLocator);
        }
        return;
    }

    public async getArticleAmount (driver: WebDriver): Promise<string> {
        return await Helpers.getText(driver, this.articleAmountLocator);
    }

    public async getTotalPrice (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.totalPriceLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async addToCartButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.addToCartButtonLocator);
    }

    public async clickAddToCartButton (driver: WebDriver): Promise<void> {
        this.productListedPrice = await this.getTotalPrice(driver);
        return await Helpers.clickElement(driver, this.addToCartButtonLocator);
    }
}
