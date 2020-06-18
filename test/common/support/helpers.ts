import { until, WebDriver, WebElement, Key } from 'selenium-webdriver';
import * as Logger from 'bunyan';
import { Subscription, SubscriptionsAPIClient } from '@elsevier/internal-order-api-client';
import { DriverConfig } from '../../features_global/support/driverConfig';

const logger = Logger.createLogger({
    name: 'ECOM-E2E-tests',
    level: 'info'
});
const config = new DriverConfig();
const subsAPIClient = new SubscriptionsAPIClient(logger, 'https://orr-api.staging.ecommerce.elsevier.com/', 10000);

type ElementState = 'located' | 'enabled' | 'disabled' | 'selected' | 'notSelected' | 'visible' | 'notVisible' | 'clickable' | 'stale';

export class Helpers {

    // Basic UI Helpers

    public static async visit (driver: WebDriver, url: string): Promise<void> {
        return await driver.get(url);
    }

    public static async getElement (driver: WebDriver, locator: string, timeout: number = 5 * 1000): Promise<WebElement> {
        await this.waitUntilElementHasState(driver, 'located', locator, timeout);
        return driver.findElement({ css: locator });
    }

    public static async getElementsArray (driver: WebDriver, locator: string): Promise<WebElement[]> {
        // await this.waitUntilElementHasState(driver, 'located', locator, timeout);
        return driver.findElements({ css: locator });
    }

    public static async clickElement (driver: WebDriver, locator: string, timeout: number = 5 * 1000): Promise<void> {
        const webElement: WebElement = await this.getElement(driver, locator, timeout);
        await this.waitUntilElementHasState(driver, 'clickable', locator, timeout);
        return await webElement.click();
    }

    public static async enterText (driver: WebDriver, locator: string, inputText: string, clearElement: boolean = true, timeout: number = 5 * 1000): Promise<void> {
        const webElement = await this.getElement(driver, locator, timeout);
        if (clearElement) {
            await webElement.clear();
        }
        await webElement.click();
        return await webElement.sendKeys(inputText);
    }

    public static async getText (driver: WebDriver, locator: string, timeout: number = 5 * 1000): Promise<string> {
        return await (await this.getElement(driver, locator, timeout)).getText();
    }

    public static async isDisplayed (driver: WebDriver, selector: string, timeout: number = 5 * 1000): Promise<boolean> {
        try {
            return await (await this.getElement(driver, selector, timeout)).isDisplayed();
        } catch (error) {
            return false; // TODO - Need to be more specific with the exception in order to use the false option (i.e. negative testing)
        }
    }

    public static async getPageTitle (driver: WebDriver): Promise<string> {
        return await driver.getTitle();
    }

    public static async sendKeyToElement (driver: WebDriver, selector: string, key: 'ENTER' | 'TAB'): Promise<void> {
        const element = await this.getElement(driver, selector);
        await element.sendKeys(Key[key]);
    }

    // Explicit Wait helpers

    public static async waitUntilElementHasState (driver: WebDriver,  state: ElementState, elementLocator: string, timeout: number = 10 * 1000): Promise<void> {
        await driver.wait(until.elementLocated({ css: elementLocator }), timeout);
        if (state === 'located') {
            return;
        }
        const element: WebElement = await driver.findElement({ css: elementLocator });
        switch (state) {
            case 'enabled':
                await driver.wait(until.elementIsEnabled(element), timeout);
                break;
            case 'disabled':
                await driver.wait(until.elementIsDisabled(element), timeout);
                break;
            case 'visible':
                await driver.wait(until.elementIsVisible(element), timeout);
                break;
            case 'notVisible':
                await driver.wait(until.elementIsNotVisible(element), timeout);
                break;
            case 'selected':
                await driver.wait(until.elementIsSelected(element), timeout);
                break;
            case 'notSelected':
                await driver.wait(until.elementIsNotSelected(element), timeout);
                break;
            case 'clickable':
                await driver.wait(until.elementIsVisible(element), timeout);
                await driver.wait(until.elementIsEnabled(element), timeout);
                break;
            case 'stale':
                await driver.wait(until.stalenessOf(element), timeout);
                break;
            default:
        }
        return;
    }

    public static async waitUntilPageTitleIs (driver: WebDriver, title: string, timeout: number) {
        await driver.wait(until.titleIs(title), timeout);
        return;
    }

    public static async waitUntilPageTitleContains (driver: WebDriver, title: string, timeout: number) {
        await driver.wait(until.titleContains(title), timeout);
        return;
    }

    public static async waitUntilPageUrlContains (driver: WebDriver, substrUrl: string, timeout: number) {
        await driver.wait(until.urlContains(substrUrl), timeout);
        return;
    }

    public static async waitUntilPageUrlIs (driver: WebDriver, url: string, timeout: number) {
        await driver.wait(until.urlContains(url), timeout);
        return;
    }

    // Common helpers

    public static async driverSleep (driver: WebDriver, delay: number) {
        return await driver.sleep(delay);
    }

    public static async waitUntilElementLocatedBy (driver: WebDriver, by: Function, elementLocator: string, timeout: number) {
        await driver.wait(until.elementLocated(by(elementLocator)), timeout);
        return;
    }

    public static async waitUntilElementVisible (driver: WebDriver, element: WebElement, timeout: number) {
        await driver.wait(until.elementIsVisible(element), timeout);
        return;
    }

    public static async isElementPresent (driver: WebDriver, locator: string) {
        const elementArray = await this.getElementsArray(driver, locator);
        return (elementArray.length > 0);
    }

    public static async getElementAttribute (webElement: WebElement, elementAttribute: string) {
        return webElement.getAttribute(elementAttribute);
    }

    public static async hasClass (driver: WebDriver, selector: string, classNeedle: string) {
        const element = await this.getElement(driver, selector, 5000);
        const elementClass = await element.getAttribute('class');
        const classHaystack = elementClass.split(' ');
        const resultIndex = classHaystack.indexOf(classNeedle);
        return resultIndex >= 0;
    }

    public static async setFocusOnElement (webElement: WebElement) {
        return await webElement.sendKeys('');
    }

    // JS helpers

    public static async getCurrentUrl(driver: WebDriver): Promise<string> {
        return await driver.executeScript('return window.location.href;');
    }

    public static async removeSurveyPopupElement (driver: WebDriver) {
        await driver.executeScript('if (document.getElementById(\'surveyPopup\')) { document.getElementById(\'surveyPopup\').parentNode.removeChild(document.getElementById(\'surveyPopup\')); }');
        return;
    }

    public static async removeCkSurveyPopupElement (driver: WebDriver) {
        await driver.executeScript('if (document.getElementById(\'acsMainInvite\')) { document.getElementsByClassName(\'__acs\')[0].parentNode.removeChild(document.getElementsByClassName(\'__acs\')[0]); }');
        return;
    }

    public static async getHTMLElementPosition (driver: WebDriver, cssSelector: string): Promise<{ x: number; y: number; }> {
        const el = await this.getElement(driver, cssSelector);
        const x = Number(await el.getAttribute('offsetLeft')) - Number(await driver.executeScript('return window.pageXOffset'));
        const y = Number(await el.getAttribute('offsetTop')) - Number(await driver.executeScript('return window.pageYOffset'));
        return { x, y };
    }

    public static async scrollY (driver: WebDriver, direction: 'up' | 'down', amount: number): Promise<void> {
        await driver.executeScript(`window.scroll(0, window.pageYOffset ${direction === 'up' ? '-' : '+'} ${amount})`);
        return;
    }

    public static async getCurrentScroll (driver: WebDriver): Promise<number> {
        const element = ['edge', 'ipad', 'iphone', 'safari'].includes(config.browserName) ? 'body' : 'documentElement';
        return await driver.executeScript(`return document.${element}.scrollTop`);
    }

    public static async scrollToElement (driver: WebDriver, elementLocator: string) {
        const yPosition = (await this.getHTMLElementPosition(driver, elementLocator)).y;
        await driver.executeScript(`window.scroll(0, ${yPosition})`);
        return;
    }

    public static async jsScrollToElementAlignTop (driver: WebDriver, webElement: WebElement) {
        await driver.executeScript('arguments[0].scrollIntoView(true);', webElement);
        return;
    }

    public static async jsScrollToElementAlignBottom (driver: WebDriver, webElement: WebElement) {
        await driver.executeScript('arguments[0].scrollIntoView(false);', webElement);
        return;
    }

    public static async jsClickOnElement (driver: WebDriver, webElement: WebElement) {
        await driver.executeScript('arguments[0].click();', webElement);
        return;
    }

    public static jsWaitUntilPageLoadComplete = async function (driver: WebDriver, timeout: number) {
        let totalTime = 0;
        let documentReadyState = await driver.executeScript('return document.readyState;');
        let jQueryActive = await driver.executeScript('return jQuery.active;');
        while (!(documentReadyState === 'complete') && (jQueryActive === 0) && (totalTime < timeout)) {
            await Helpers.driverSleep(driver, 1000);
            documentReadyState = await driver.executeScript('return document.readyState;');
            jQueryActive = await driver.executeScript('return jQuery.active;');
            totalTime = totalTime + 1000;
        }
        return;
    };

    public static async highlightElement (driver: WebDriver, webElement: WebElement) {
        return await driver.executeScript('arguments[0].setAttribute(`style`, arguments[1]);', webElement, 'background-color: red; border: 1px solid red;');
    }

    // Miscellaneous helpers

    public static refreshPageUntilElementPresent = async function (driver: WebDriver, cssElementLocator: string, timeout: number, maxRefreshcount: number = 6, legend: string = '\'Cancel Subscription\' button') {
        console.log('- Refreshing page until ' + legend + ' becomes visible');
        let refreshCounter = 0;
        while (!(await this.isElementPresent(driver, cssElementLocator)) && (refreshCounter < maxRefreshcount)) {
            await driver.navigate().refresh();
            refreshCounter++;
            await Helpers.driverSleep(driver, timeout);
        }
        return;
    };

    public static cancelSubscriptionOrder = async function (subOrderNumber: string) {
        const maxAttempts = 15;
        let currentAttempt = 0;
        const subInfo: Subscription[] = await subsAPIClient.getSubscriptionsByOrder(subOrderNumber);
        const webUserId = subInfo[0].webUserId;
        console.log(`- Cancelling subscription order using an ORR API call (webUserID: ${webUserId}, subOrderNumber: ${subOrderNumber})`);
        const subscriptionId = String(subInfo[0].id);
        let result;
        let isSubCancelled: boolean = false;
        while (!isSubCancelled && (currentAttempt < maxAttempts)) {
            try {
                result = await subsAPIClient.deleteSubscription(webUserId, subscriptionId);
                isSubCancelled = result.isCancelled;
            } catch (e) {
                console.log('e', e);
            }
            currentAttempt ++;
        }
        if (!isSubCancelled) {
            throw new Error('Subscription could not be cancelled using an ORR API call');
        } else {
            console.log(`- Subscription cancelled using an ORR API call (webUserID: ${webUserId}, subOrderNumber: ${subOrderNumber})`);
            return;
        }
    };

    public static getCleanPrice (price: string): string {
        if (typeof price === 'string') {
            return (Number(price.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
        }
        return;
    }

    public static removeCurrencySymbol (value: string): string {
        return value.replace(/[^\d\.\s]+/g, '');
    }

    // do not delete (placeholder for a future function)
    // public static async highlightElement(el: ElementFinder) {
    //     return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "background-color: red; color: red; border: 1px solid red;").then(function (resp) {
    //         return el;
    //     }, function (err) {
    //         console.log("error is :" + err);
    //     });
    // }
}
