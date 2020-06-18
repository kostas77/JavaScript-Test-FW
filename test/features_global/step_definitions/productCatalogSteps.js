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
const catalogPage_1 = require("../../common/pages/ElsevierGlobalStore/products/catalogPage");
const testData_1 = require("../support/testData");
const helpers_1 = require("../../common/support/helpers");
const testData = new testData_1.TestData();
const catalogPage = new catalogPage_1.CatalogPage(testData);
cucumber_1.When(/^I search for (.*) using the following filters: (.*), (.*), (.*), (.*), (.*)$/, function (searchQuery, productType, subjectArea, relatedSubjectArea, secondaryRelatedSubjectArea, publicationYears) {
    return __awaiter(this, void 0, void 0, function* () {
        yield catalogPage.selectAllBooksAndJournalsCategory(this.driver, testData_1.catalogFilters[productType.replace(/ /g, '')]);
        yield catalogPage.selectAllSubjectAreasCategory(this.driver, testData_1.catalogFilters[subjectArea.replace(/ /g, '')]);
        yield catalogPage.selectRelatedSubjectAreasPrimaryCategory(this.driver, testData_1.catalogFilters[relatedSubjectArea.replace(/ /g, '')]);
        yield catalogPage.selectRelatedSubjectAreasSecondaryCategory(this.driver, testData_1.catalogFilters[secondaryRelatedSubjectArea.replace(/ /g, '')]);
        yield catalogPage.selectPublicationYearsDropdownCategory(this.driver, publicationYears.split(';'));
        yield catalogPage.enterSearchQuery(this.driver, searchQuery);
        yield catalogPage.clickSearchButton(this.driver);
    });
});
cucumber_1.When(/^I sort the results by (.*) order$/, function (sortOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
        yield catalogPage.selectSortByDropdownCategory(this.driver, sortOrder);
    });
});
cucumber_1.When(/^I am on the Advanced Search home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pending');
    });
});
cucumber_1.Then(/^The results for the (.*) search appear as expected$/, function (searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        let expectedTitles = [];
        const titleArray = yield catalogPage.specificItemTitles(this.driver);
        for (const row of titleArray) {
            const titleText = yield row.getText();
            yield this.orderHistoryListedTitles.push(titleText);
        }
        switch (searchQuery) {
            case 'MATLAB':
                expectedTitles = ['Interval Finite Element Method with MATLAB', 'Computational Methods in Engineering', 'Computational Materials Engineering'];
                break;
            case 'Catalysis':
                expectedTitles = ['Chinese Journal of Catalysis', 'Journal of Catalysis'];
                break;
            case 'Encyclopedia':
                expectedTitles = ['Encyclopedia of Microbiology, Four-Volume Set', 'Encyclopedia of Cancer', 'Encyclopedia of Cell Biology'];
                break;
            default:
                throw new Error('Invalid Search query');
        }
        this.assert.equal(JSON.stringify(this.orderHistoryListedTitles.sort()), JSON.stringify(expectedTitles.sort()), 'Incorrect title(s) found on Catalog Search Results page');
    });
});
//# sourceMappingURL=productCatalogSteps.js.map