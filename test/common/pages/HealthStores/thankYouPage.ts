import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { assert } from 'chai';
import { ITestData } from '../../support/interfaces';

export class ThankYouPage {

    private readonly pageTitle: string;
    private readonly prefix: string;
    public pageTitleLocator: string;

    constructor(testData: ITestData) {
        this.pageTitle = testData.getTitles().thankYouPage;
        this.prefix = testData.getDataFor().orderNumberPrefix;
        this.pageTitleLocator = '.sub-title';
    }

    public async getOrderNumber (driver: WebDriver): Promise<string> {
        let orderNumber: string;
        let orderNumberMessage: string;
        switch (this.prefix) {
            case 'h':
                orderNumberMessage = await (await Helpers.getElement(driver, '.sub-title')).getText();
                orderNumber = orderNumberMessage.split(': ')[1];
                break;
            case 'MS':
            case 'MX':
                orderNumberMessage = await (await Helpers.getElement(driver, '.col-main > p:nth-child(3) > a:nth-child(1)')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            case 'MF':
                orderNumberMessage = await (await Helpers.getElement(driver, '.col-main > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1) > a:nth-child(1)')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            case 'MD':
                orderNumberMessage = await (await Helpers.getElement(driver, 'body > div.wrapper > div > section > div > aside > table:nth-child(3) > tbody > tr > td:nth-child(1) > p:nth-child(1) > strong > a')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            case 'MU':
                orderNumberMessage = await (await Helpers.getElement(driver, '.col-main > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1) > a:nth-child(1)')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            case 'MM':
                orderNumberMessage = await (await Helpers.getElement(driver, '.col-main > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1) > a:nth-child(1)')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            case 'ME':
                orderNumberMessage = await (await Helpers.getElement(driver, '.col-main > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1) > a:nth-child(1)')).getText();
                orderNumber = this.prefix + orderNumberMessage;
                break;
            default:
                throw new Error('Unrecognised orderNumber prefix: ' + this.prefix);
        }
        return orderNumber;
    }

    public async verifyPageTitle(driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.pageTitleLocator, 60 * 1000);
        assert(await (await Helpers.getElement(driver, this.pageTitleLocator)).getAttribute('textContent'), this.pageTitle);
    }
}
