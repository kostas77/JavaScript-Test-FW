// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class OldSearchResultsPage {
    public pageTitle: string;
    public firstSearchResultLocator: string;
    public searchResultLocator: string;
    public searchFeedbackLocator: string;
    public resultTitleLocator: string;

    constructor() {
        this.pageTitle = 'old-search-results';
        this.firstSearchResultLocator = '.search-results .search-result:first-of-type';
        this.searchResultLocator = '.search-result';
        this.searchFeedbackLocator = '.search-result-feedback';
        this.resultTitleLocator = '.text-normal .search-track';
    }

    public async searchFeedbackText(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.searchFeedbackLocator)).getText();
    }

    public async firstSearchResultText(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.firstSearchResultLocator)).getText();
    }

    public async numberOfVisibleResults(driver: WebDriver): Promise<number> {
        return await (await Helpers.getElementsArray(driver, this.searchResultLocator)).length;
    }

    public async awaitResults(driver: WebDriver): Promise<void> {
        return await Helpers.waitUntilElementHasState(driver, 'located', this.firstSearchResultLocator, 20 * 1000);
    }
}
