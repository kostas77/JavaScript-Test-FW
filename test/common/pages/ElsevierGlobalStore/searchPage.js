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
const helpers_1 = require("../../support/helpers");
class SearchPage {
    constructor(testData) {
        this.pageTitle = 'search-results';
        this.pageUrl = testData.getUrlFor().elsevier.search;
        this.resultTitleLocator = '.text-normal .search-track';
        this.searchButtonLocator = '.submit-search';
        this.searchResultLocator = '.search-result';
        this.searchTermInputLocator = 'input[name="searchTerm"]';
    }
    visitSearchPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.get(this.pageUrl);
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.searchButtonLocator, 30 * 1000);
        });
    }
    performSearch(driver, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterSearchTerm(driver, searchTerm);
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchButtonLocator)).click();
        });
    }
    firstSearchResultText(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchResultLocator)).getText();
        });
    }
    numberOfVisibleResults(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElementsArray(driver, this.searchResultLocator)).length;
        });
    }
    awaitResults(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.searchResultLocator, 20 * 1000);
        });
    }
    enterSearchTerm(driver, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchTermInputLocator)).sendKeys(searchTerm);
        });
    }
}
exports.SearchPage = SearchPage;
//# sourceMappingURL=searchPage.js.map