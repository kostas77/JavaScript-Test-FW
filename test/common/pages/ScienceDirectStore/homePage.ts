import { WebDriver } from 'selenium-webdriver';
import { ITestData } from '../../support/interfaces';

export class SdHomePage {
    public pageTitle: string;
    public pageUrl: string;
    public signoutUrl: string;
    public elsevierConnectLocator: string;
    public searchBoxLocator: string;
    public searchButtonLocator: string;


    constructor(testData: ITestData) {
        this.pageTitle = 'Elsevier Home';
        this.pageUrl = testData.getUrlFor().sd.home;
        this.signoutUrl = testData.getUrlFor().sd.signout;
        this.elsevierConnectLocator = '.elsevier--fontRevert-serif';
        this.searchBoxLocator = 'input[type="search"]:nth-child(2)';
        this.searchButtonLocator = 'input[type="submit"]:nth-child(1)';
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async signout (driver: WebDriver): Promise<void> {
        return await driver.get(this.signoutUrl);
    }
}
