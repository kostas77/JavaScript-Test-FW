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
class OldSearchResultsPage {
    constructor() {
        this.pageTitle = 'old-search-results';
        this.firstSearchResultLocator = '.search-results .search-result:first-of-type';
        this.searchResultLocator = '.search-result';
        this.searchFeedbackLocator = '.search-result-feedback';
        this.resultTitleLocator = '.text-normal .search-track';
    }
    searchFeedbackText(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchFeedbackLocator)).getText();
        });
    }
    firstSearchResultText(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.firstSearchResultLocator)).getText();
        });
    }
    numberOfVisibleResults(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElementsArray(driver, this.searchResultLocator)).length;
        });
    }
    awaitResults(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.firstSearchResultLocator, 20 * 1000);
        });
    }
}
exports.OldSearchResultsPage = OldSearchResultsPage;
//# sourceMappingURL=oldSearchResultsPage.js.map