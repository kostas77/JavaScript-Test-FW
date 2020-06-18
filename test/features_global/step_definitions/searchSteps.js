"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const basePage_1 = require("../../common/pages/ElsevierGlobalStore/basePage");
const searchPage_1 = require("../../common/pages/ElsevierGlobalStore/searchPage");
const oldSearchResultsPage_1 = require("../../common/pages/ElsevierGlobalStore/oldSearchResultsPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const basePage = new basePage_1.BasePage();
const searchPage = new searchPage_1.SearchPage(testData);
const oldSearchResultsPage = new oldSearchResultsPage_1.OldSearchResultsPage();
let expectedSearchTerm;
cucumber_1.Given(/^I have navigated to the search page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchPage.visitSearchPage(this.driver);
    });
});
cucumber_1.When(/^I perform a search for "([^"]*)" from the global header$/, function (searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        expectedSearchTerm = searchTerm;
        yield basePage.performSearch(this.driver, searchTerm);
    });
});
cucumber_1.When(/^I search for "([^"]*)"$/, function (searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        expectedSearchTerm = searchTerm;
        yield searchPage.performSearch(this.driver, searchTerm);
    });
});
cucumber_1.Then(/^there (?:is|are) at least (\d+) search results?$/, function (minimumNumberOfResults) {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchPage.awaitResults(this.driver);
        const numberOfVisibleResults = yield searchPage.numberOfVisibleResults(this.driver);
        this.assert.isAtLeast(numberOfVisibleResults, minimumNumberOfResults, `There are not at least ${minimumNumberOfResults} search results`);
    });
});
cucumber_1.Then(/^the first search result includes the search term$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchPage.awaitResults(this.driver);
        const actualFirstSearchResultText = yield searchPage.firstSearchResultText(this.driver);
        this.assert.include(actualFirstSearchResultText.toLowerCase(), expectedSearchTerm.toLowerCase().replace('#', ''), 'The first search result does not include expected search term without hashes');
    });
});
cucumber_1.Then(/^the returned search item total includes the search term \(old search\)$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield oldSearchResultsPage.awaitResults(this.driver);
        const actualSearchResultsTotalMessage = yield oldSearchResultsPage.searchFeedbackText(this.driver);
        this.assert.include(actualSearchResultsTotalMessage, expectedSearchTerm, 'Search results total message does not include expected search term');
    });
});
cucumber_1.Then(/^the first search result includes the search term without hashes \(old search\)$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield oldSearchResultsPage.awaitResults(this.driver);
        const actualFirstSearchResultText = yield oldSearchResultsPage.firstSearchResultText(this.driver);
        this.assert.include(actualFirstSearchResultText.toLowerCase(), expectedSearchTerm.toLowerCase().replace('#', ''), 'The first search result does not include expected search term without hashes');
    });
});
cucumber_1.Then(/^there (?:is|are) at least (\d+) search results? \(old search\)$/, function (minimumNumberOfResults) {
    return __awaiter(this, void 0, void 0, function* () {
        yield oldSearchResultsPage.awaitResults(this.driver);
        const numberOfVisibleResults = yield oldSearchResultsPage.numberOfVisibleResults(this.driver);
        this.assert.isAtLeast(numberOfVisibleResults, minimumNumberOfResults, `There are not at least ${minimumNumberOfResults} search results`);
    });
});
//# sourceMappingURL=searchSteps.js.map