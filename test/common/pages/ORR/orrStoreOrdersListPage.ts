import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { CommonTestData } from '../../support/commonTestData';

const commonTestData = new CommonTestData();

export class OrrStoreOrdersListPage {

    public pageUrl: string;
    public orderLinkLocatorTemplate: string;

    constructor(orrPageId: number) {
        this.pageUrl = commonTestData.getUrlFor().orr.orrStoreSpecificOrdersPage(orrPageId);
        this.orderLinkLocatorTemplate = 'table.layout a[href="/site/' + orrPageId + '/orders/$$ORDER_NUMBER$$"]';
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public getOrderLinkLocator (orderNumber: string): string {
        return this.orderLinkLocatorTemplate.replace('$$ORDER_NUMBER$$', orderNumber);
    }

    public async getOrderLink (driver: WebDriver, orderNumber: string): Promise<WebElement|boolean> {
        try {
            return await Helpers.getElement(driver, this.getOrderLinkLocator(orderNumber));
        } catch (err) {
            // tslint:disable-next-line
            console.log(`Can't find order ${orderNumber} in orr: ${err.message}`);
            return false;
        }
    }
}
