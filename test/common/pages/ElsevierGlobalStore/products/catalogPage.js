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
const helpers_1 = require("../../../support/helpers");
const driverConfig_1 = require("../../../../features_global/support/driverConfig");
const config = new driverConfig_1.DriverConfig();
class CatalogPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.catalog;
        this.pageTitle = 'Shop and Discover over 51,000 Books and Journals - Elsevier';
        this.allBooksAndJournalsDropdownLocator = '#listing-form-filters-type';
        this.allSubjectAreasDropdownLocator = '.listing-form-filters-categories--1';
        this.relatedSubjectAreasPrimaryDropdownLocator = '.listing-form-filters-categories--2';
        this.relatedSubjectAreasSecondaryDropdownLocator = '.listing-form-filters-categories--3';
        this.publicationYearsDropdownLocator = '.ms-choice';
        this.publicationYearsDropdownLocatorMobile = '#listing-form-filters-years';
        this.publicationYearsOptionLocatorPrefix = '.not-enum input[type=\"checkbox\"]';
        this.searchFieldLocator = '#search-filter-query';
        this.searchButtonLocator = '.search-button button';
        this.clearSearchLinkLocator = '#listing-form-filters a';
        this.sortByDropdownLocator = '#listing-form-filters-results-sort';
        this.viewProductDetailsLocator = '';
        this.specificItemTitlesLocator = '.listing-products-info-text-title a';
        this.pageFooterLocator = '.bottom';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    selectAllBooksAndJournalsCategory(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.allBooksAndJournalsDropdownLocator + '>option[value*="' + category + '"]');
        });
    }
    selectAllSubjectAreasCategory(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.allSubjectAreasDropdownLocator + ' option[value*="' + category + '"]');
        });
    }
    selectRelatedSubjectAreasPrimaryCategory(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.relatedSubjectAreasPrimaryDropdownLocator + ' option[value*="' + category + '"]');
        });
    }
    selectRelatedSubjectAreasSecondaryCategory(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.relatedSubjectAreasSecondaryDropdownLocator + ' option[value*="' + category + '"]');
        });
    }
    publicationYearsDropdown(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.publicationYearsDropdownLocator);
        });
    }
    publicationYearsDropdownMobile(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.publicationYearsDropdownLocatorMobile + ' option[value*="' + category + '"]');
        });
    }
    publicationYearsOption(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.publicationYearsOptionLocatorPrefix + '[value="' + category + '"]');
        });
    }
    selectPublicationYearsDropdownCategory(driver, yearsArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.platform === 'DESKTOP') {
                yield (yield this.publicationYearsDropdown(driver)).click();
                for (const year of yearsArray) {
                    yield (yield this.publicationYearsOption(driver, year)).click();
                }
                return yield (yield this.publicationYearsDropdown(driver)).click();
            }
            else if (config.platform === 'MOBILE') {
                for (const year of yearsArray) {
                    yield (yield this.publicationYearsDropdownMobile(driver, year)).click();
                }
            }
        });
    }
    enterSearchQuery(driver, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.searchFieldLocator, searchQuery);
        });
    }
    clickSearchButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.searchButtonLocator);
        });
    }
    clickClearSearchLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.clearSearchLinkLocator);
        });
    }
    selectSortByDropdownCategory(driver, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.sortByDropdownLocator, category, false);
        });
    }
    specificItemTitles(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.specificItemTitlesLocator);
        });
    }
    viewProductDetailsButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.viewProductDetailsLocator);
        });
    }
    pageFooter(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.pageFooterLocator);
        });
    }
}
exports.CatalogPage = CatalogPage;
//# sourceMappingURL=catalogPage.js.map