import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { DriverConfig } from '../../../../features_global/support/driverConfig';
import { ITestData } from '../../../support/interfaces';

const config = new DriverConfig();

export class CatalogPage {

    public pageUrl: string;
    public pageTitle: string;
    public allBooksAndJournalsDropdownLocator: string;
    public allSubjectAreasDropdownLocator: string;
    public relatedSubjectAreasPrimaryDropdownLocator: string;
    public relatedSubjectAreasSecondaryDropdownLocator: string;
    public publicationYearsDropdownLocator: string;
    public publicationYearsDropdownLocatorMobile: string;
    public publicationYearsOptionLocatorPrefix: string;
    public searchFieldLocator: string;
    public searchButtonLocator: string;
    public clearSearchLinkLocator: string;
    public sortByDropdownLocator: string;
    public viewProductDetailsLocator: string;
    public specificItemTitlesLocator: string;
    public pageFooterLocator: string;

    constructor(testData: ITestData) {
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

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async selectAllBooksAndJournalsCategory (driver: WebDriver, category: string): Promise<void> {
        return await Helpers.clickElement(driver, this.allBooksAndJournalsDropdownLocator + '>option[value*="' + category + '"]');
    }

    public async selectAllSubjectAreasCategory (driver: WebDriver, category: string): Promise<void> {
        return await Helpers.clickElement(driver, this.allSubjectAreasDropdownLocator + ' option[value*="' + category + '"]');
    }

    public async selectRelatedSubjectAreasPrimaryCategory (driver: WebDriver, category: string): Promise<void> {
        return await Helpers.clickElement(driver, this.relatedSubjectAreasPrimaryDropdownLocator + ' option[value*="' + category + '"]');
    }

    public async selectRelatedSubjectAreasSecondaryCategory (driver: WebDriver, category: string): Promise<void> {
        return await Helpers.clickElement(driver, this.relatedSubjectAreasSecondaryDropdownLocator + ' option[value*="' + category + '"]');
    }

    public async publicationYearsDropdown (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.publicationYearsDropdownLocator);
    }

    public async publicationYearsDropdownMobile (driver: WebDriver, category: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.publicationYearsDropdownLocatorMobile + ' option[value*="' + category + '"]');
    }

    public async publicationYearsOption (driver: WebDriver, category: string): Promise<WebElement> {
        return await Helpers.getElement(driver, this.publicationYearsOptionLocatorPrefix + '[value="' + category + '"]');
    }

    public async selectPublicationYearsDropdownCategory (driver: WebDriver, yearsArray: string[]): Promise<void> {
        if (config.platform === 'DESKTOP') {
            await (await this.publicationYearsDropdown(driver)).click();
            for (const year of yearsArray) {
                await (await this.publicationYearsOption(driver, year)).click();
            }
            return await (await this.publicationYearsDropdown(driver)).click();
        } else if (config.platform === 'MOBILE') {
            for (const year of yearsArray) {
                await (await this.publicationYearsDropdownMobile(driver, year)).click();
            }
        }
    }

    public async enterSearchQuery (driver: WebDriver, searchQuery: string): Promise<void> {
        return await Helpers.enterText(driver, this.searchFieldLocator, searchQuery);
    }

    public async clickSearchButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.searchButtonLocator);
    }

    public async clickClearSearchLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.clearSearchLinkLocator);
    }

    public async selectSortByDropdownCategory (driver: WebDriver, category: string): Promise<void> {
        return await Helpers.enterText(driver, this.sortByDropdownLocator, category, false);
    }

    public async specificItemTitles (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.specificItemTitlesLocator);
    }

    public async viewProductDetailsButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.viewProductDetailsLocator);
    }

    public async pageFooter (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.pageFooterLocator);
    }
}
