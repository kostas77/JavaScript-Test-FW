import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { assert } from 'chai';
import { ITestData } from '../../support/interfaces';

export class ConnectPage {

    public pageTitle: string;
    public pageUrl: string;
    public articleActionsLocator: string;
    public connectLocator: string;

    constructor (testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.connectAccessibility;
        this.pageTitle = 'The many faces of accessibility';
        this.articleActionsLocator = '.article-actions-container-fixed';
        this.connectLocator = '.elsevier--fontRevert-serif';
    }

    public async visitPage (driver: WebDriver) {
        await driver.get(this.pageUrl);
        const actualPageTitle = await Helpers.getPageTitle(driver);
        assert.equal (actualPageTitle, this.pageTitle, 'Expected page title not found');
    }

    public async getArticleActionsBar (driver: WebDriver) {
        return await Helpers.getElement(driver, this.articleActionsLocator);
    }
}
