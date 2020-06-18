import { defineStep } from 'cucumber';
import { BasePage } from '../../common/pages/ElsevierGlobalStore/basePage';
import { SearchPage } from '../../common/pages/ElsevierGlobalStore/searchPage';
// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
import { OldSearchResultsPage } from '../../common/pages/ElsevierGlobalStore/oldSearchResultsPage';
import { TestData } from '../support/testData';

const testData = new TestData();
const basePage = new BasePage();
const searchPage = new SearchPage(testData);
// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
const oldSearchResultsPage = new OldSearchResultsPage();

let expectedSearchTerm: string;

defineStep(/^I have navigated to the search page$/, async function () {
    await searchPage.visitSearchPage(this.driver);
});

defineStep(/^I perform a search for "([^"]*)" from the global header$/, async function (searchTerm: string): Promise<void> {
    expectedSearchTerm = searchTerm;
    await basePage.performSearch(this.driver, searchTerm);
});

defineStep(/^I search for "([^"]*)"$/, async function (searchTerm: string): Promise<void> {
    expectedSearchTerm = searchTerm;
    await searchPage.performSearch(this.driver, searchTerm);
});

defineStep(/^there (?:is|are) at least (\d+) search results?$/, async function (minimumNumberOfResults) {
    await searchPage.awaitResults(this.driver);
    const numberOfVisibleResults = await searchPage.numberOfVisibleResults(this.driver);
    this.assert.isAtLeast(
        numberOfVisibleResults,
        minimumNumberOfResults,
        `There are not at least ${minimumNumberOfResults} search results`
    );
});

defineStep(/^the first search result includes the search term$/, async function (): Promise<void> {
    await searchPage.awaitResults(this.driver);
    const actualFirstSearchResultText = await searchPage.firstSearchResultText(this.driver);
    this.assert.include(
        actualFirstSearchResultText.toLowerCase(),
        expectedSearchTerm.toLowerCase().replace('#', ''),
        'The first search result does not include expected search term without hashes'
    );
});

// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
defineStep(/^the returned search item total includes the search term \(old search\)$/, async function (): Promise<void> {
    await oldSearchResultsPage.awaitResults(this.driver);
    const actualSearchResultsTotalMessage = await oldSearchResultsPage.searchFeedbackText(this.driver);
    this.assert.include(actualSearchResultsTotalMessage, expectedSearchTerm, 'Search results total message does not include expected search term');
});

// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
defineStep(/^the first search result includes the search term without hashes \(old search\)$/, async function (): Promise<void> {
    await oldSearchResultsPage.awaitResults(this.driver);
    const actualFirstSearchResultText = await oldSearchResultsPage.firstSearchResultText(this.driver);
    this.assert.include(
        actualFirstSearchResultText.toLowerCase(),
        expectedSearchTerm.toLowerCase().replace('#', ''),
        'The first search result does not include expected search term without hashes'
    );
});

// ToDo: ELSE-160 Remove once Old Site Search is decommissioned
defineStep(/^there (?:is|are) at least (\d+) search results? \(old search\)$/, async function (minimumNumberOfResults) {
    await oldSearchResultsPage.awaitResults(this.driver);
    const numberOfVisibleResults = await oldSearchResultsPage.numberOfVisibleResults(this.driver);
    this.assert.isAtLeast(
        numberOfVisibleResults,
        minimumNumberOfResults,
        `There are not at least ${minimumNumberOfResults} search results`
    );
});
