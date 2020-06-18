import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class CkHomePage {
    public pageTitle: string;
    public pageUrl: string;
    public logoutUrl: string;
    public packages: string;

    constructor(testData: ITestData) {
        this.pageTitle = 'ClinicalKey - ClinicalKey';
        this.pageUrl = testData.getUrlFor().ck.home;
        this.logoutUrl = testData.getUrlFor().ck.logout;
        this.packages = '#packages';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async logout (driver: WebDriver): Promise<void> {
        return await driver.get(this.logoutUrl);
    }

    public async productItem (driver: WebDriver, productCode: string): Promise<WebElement> {
        return await Helpers.getElement(driver, `.products-grid a[href*="${productCode}"]`);
    }

    public async productItemClick (driver: WebDriver, productCode: string): Promise<void> {
        return await (await this.productItem(driver, productCode)).click();
    }
}
