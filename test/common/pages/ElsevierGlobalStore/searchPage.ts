import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class SearchPage {
    public pageTitle: string;
    public pageUrl: string;
    public resultTitleLocator: string;
    public searchButtonLocator: string;
    public searchResultLocator: string;
    public searchTermInputLocator: string;

    constructor(testData: ITestData) {
        this.pageTitle = 'search-results';
        this.pageUrl = testData.getUrlFor().elsevier.search;
        this.resultTitleLocator = '.text-normal .search-track';
        this.searchButtonLocator = '.submit-search';
        this.searchResultLocator = '.search-result';
        this.searchTermInputLocator = 'input[name="searchTerm"]';
    }

    public async visitSearchPage(driver: WebDriver): Promise<void> {
        await driver.get(this.pageUrl);
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.searchButtonLocator, 30 * 1000);
    }

    public async performSearch(driver: WebDriver, searchTerm: string) {
        await this.enterSearchTerm(driver, searchTerm);
        return await (await Helpers.getElement(driver, this.searchButtonLocator)).click();
    }

    public async firstSearchResultText(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.searchResultLocator)).getText();
    }

    public async numberOfVisibleResults(driver: WebDriver): Promise<number> {
        return (await Helpers.getElementsArray(driver, this.searchResultLocator)).length;
    }

    public async awaitResults(driver: WebDriver): Promise<void> {
        return await Helpers.waitUntilElementHasState(driver, 'located', this.searchResultLocator, 20 * 1000);
    }

    private async enterSearchTerm(driver: WebDriver, searchTerm: string) {
        return await (await Helpers.getElement(driver, this.searchTermInputLocator)).sendKeys(searchTerm);
    }
}
