import { UrlData } from '../../../features_global/support/urlData';
import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class KitchenSink {
    private pageUrl: string;

    constructor() {
        this.pageUrl = new UrlData(process.env.NODE_ENV).getUrlFor().elsevier.kitchenSink;
    }

    public async visitPage(driver: WebDriver): Promise<void> {
        await driver.get(this.pageUrl);
        await Helpers.driverSleep(driver, 2000);
        await Helpers.jsWaitUntilPageLoadComplete(driver, 30000);
    }

    public async captureExpectedScrollPosition(driver: WebDriver, browserName: string): Promise<number> {
        const pageHeader = await Helpers.getElement(driver, 'header');
        const navBar = await Helpers.getElement(driver, 'nav.in-page-nav');
        const headerHeight = pageHeader ? Number(await pageHeader.getAttribute('offsetHeight')) : 0;
        const navBarHeight = navBar ? Number(await navBar.getAttribute('offsetHeight')) + 16 : 0; // Extra scroll improves apperance: https://github.com/elsevier-io/squiz-matrix/blob/develop/src/js/lib/getPageOffsetTop.js
        const navAndHeaderHeight =  headerHeight + (browserName === 'ie' ? 0 : navBarHeight);

        const headingOffset = (await Helpers.getHTMLElementPosition(driver, 'h2#typography')).y;

        return headingOffset - navAndHeaderHeight;
    }

    public async clickTypographyLink(driver: WebDriver): Promise<void> {
        await Helpers.clickElement(driver, 'a[href="#typography"]');
        await Helpers.driverSleep(driver, 2000);
    }
}
