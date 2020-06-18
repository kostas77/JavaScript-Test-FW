import { WebDriver } from 'selenium-webdriver';
import { ITestData } from '../../support/interfaces';

export class HomePage {
    public pageUrl: string;
    public pageTitle: string;
    public elsevierConnectLocator: string;
    public searchBoxLocator: string;
    public searchButtonLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.home;
        this.pageTitle = 'Elsevier Home';
        this.elsevierConnectLocator = '.elsevier--fontRevert-serif';
        this.searchBoxLocator = 'input[type="search"]:nth-child(2)';
        this.searchButtonLocator = 'input[type="submit"]:nth-child(1)';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }
}
