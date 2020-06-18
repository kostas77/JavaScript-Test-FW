import { WebDriver } from 'selenium-webdriver';
import { ITestData } from '../../support/interfaces';

export class HomePage {
    private testData: ITestData;
    public pageUrl: string;

    constructor(testData: ITestData) {
        this.testData = testData;
        this.pageUrl = this.testData.getUrlFor().HealthStore.home;
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }
}
