import { defineStep } from 'cucumber';
import { CatalogPage } from '../../common/pages/ElsevierGlobalStore/products/catalogPage';
import { catalogFilters, TestData } from '../support/testData';
import { Helpers } from '../../common/support/helpers';

const testData = new TestData();
const catalogPage = new CatalogPage(testData);

defineStep(/^I search for (.*) using the following filters: (.*), (.*), (.*), (.*), (.*)$/, async function (searchQuery: string, productType: string, subjectArea: string, relatedSubjectArea: string, secondaryRelatedSubjectArea: string, publicationYears: string): Promise<void> {
    await catalogPage.selectAllBooksAndJournalsCategory(this.driver, catalogFilters[productType.replace(/ /g, '')]);
    await catalogPage.selectAllSubjectAreasCategory(this.driver, catalogFilters[subjectArea.replace(/ /g, '')]);
    await catalogPage.selectRelatedSubjectAreasPrimaryCategory(this.driver, catalogFilters[relatedSubjectArea.replace(/ /g, '')]);
    await catalogPage.selectRelatedSubjectAreasSecondaryCategory(this.driver, catalogFilters[secondaryRelatedSubjectArea.replace(/ /g, '')]);
    await catalogPage.selectPublicationYearsDropdownCategory(this.driver, publicationYears.split(';'));
    // await Helpers.driverSleep(this.driver, 2 * 1000);
    await catalogPage.enterSearchQuery(this.driver, searchQuery);
    await catalogPage.clickSearchButton(this.driver);
});

defineStep(/^I sort the results by (.*) order$/, async function (sortOrder: string): Promise<void> {
    await Helpers.driverSleep(this.driver, 5 * 1000); // TODO - Use a page loading explicit wait instead
    await catalogPage.selectSortByDropdownCategory(this.driver, sortOrder);
});

defineStep(/^I am on the Advanced Search home page$/, async function (): Promise<void> {
    console.log('pending');
});

defineStep(/^The results for the (.*) search appear as expected$/, async function (searchQuery: string): Promise<void> {
    let expectedTitles = [];
    // await Helpers.driverSleep(this.driver, 2 * 1000);
    const titleArray = await catalogPage.specificItemTitles(this.driver);
    for (const row of titleArray) {
        const titleText = await row.getText();
        await this.orderHistoryListedTitles.push(titleText);
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
