import { UrlData } from '../../../features_global/support/urlData';
import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

const urlData = new UrlData(process.env.NODE_ENV);

export class LocationSelector {
    private pageUrl: string;
    private globalUrl: string;
    private spanishUrl: string;
    private spanishSite: string;

    constructor() {
        this.pageUrl = urlData.getUrlFor().elsevier.locationSelector;
        this.globalUrl = urlData.getUrlFor().elsevier.home;
        this.spanishUrl = urlData.getUrlFor().elsevier.spanishSite;
        this.spanishSite = 'a[href^="/es-es"]';
    }

    public async visitPage(driver: WebDriver): Promise<void> {
        await driver.get(this.pageUrl);
        await Helpers.driverSleep(driver, 2000);
        await Helpers.jsWaitUntilPageLoadComplete(driver, 30000);
    }

    public async visitGlobalHome(driver: WebDriver): Promise<void> {
        await driver.get(this.globalUrl);
        await Helpers.driverSleep(driver, 2000);
        await Helpers.jsWaitUntilPageLoadComplete(driver, 30000);
    }

    public async visitSpanishSite(driver: WebDriver): Promise<void> {
        await driver.get(this.spanishUrl);
        await Helpers.driverSleep(driver, 2000);
        await Helpers.jsWaitUntilPageLoadComplete(driver, 30000);
    }

    public async clickSpanishSiteLink(driver: WebDriver): Promise<void> {
        await Helpers.clickElement(driver, this.spanishSite);
        await Helpers.driverSleep(driver, 2000);
    }

}
