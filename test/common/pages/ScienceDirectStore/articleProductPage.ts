import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class ArticleProductPage {
    public mainTitleLocator: string;
    public threeYearSubscriptionOptionLocator: string;
    public getAccessLinkLocator: string;
    public purchaseLinkLocator: string;
    public productListedPrice: string;

    constructor() {
        this.mainTitleLocator = '.Head .title-text';
        this.getAccessLinkLocator = '.pdf-download-label.u-show-inline-from-lg';
        this.purchaseLinkLocator = '.button-secondary';
        this.productListedPrice = '';
    }

    public async mainTitle (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.mainTitleLocator);
    }

    public async clickGetAccessLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.getAccessLinkLocator);
    }

    public async clickPurchaseLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.purchaseLinkLocator);
    }

    public async addProductToCart (driver: WebDriver): Promise<void> {
        // this.productListedPrice = await this.getArticlePrice(driver);
        await this.clickGetAccessLink(driver);
        await this.clickPurchaseLink(driver);
    }
}
