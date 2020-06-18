"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const Logger = require("bunyan");
const internal_order_api_client_1 = require("@elsevier/internal-order-api-client");
const logger = Logger.createLogger({
    name: 'ECOM-E2E-tests',
    level: 'info'
});
const subsAPIClient = new internal_order_api_client_1.SubscriptionsAPIClient(logger, 'https://orr-api.staging.ecommerce.elsevier.com/', 10000);
class Helpers {
    static visit(driver, url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(url);
        });
    }
    static getElement(driver, locator, timeout = 5 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitUntilElementHasState(driver, 'located', locator, timeout);
            return driver.findElement({ css: locator });
        });
    }
    static getElementsArray(driver, locator) {
        return __awaiter(this, void 0, void 0, function* () {
            return driver.findElements({ css: locator });
        });
    }
    static clickElement(driver, locator, timeout = 5 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.getElement(driver, locator, timeout);
            yield this.waitUntilElementHasState(driver, 'clickable', locator, timeout);
            return yield webElement.click();
        });
    }
    static enterText(driver, locator, inputText, clearElement = true, timeout = 5 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            const webElement = yield this.getElement(driver, locator, timeout);
            if (clearElement) {
                yield webElement.clear();
            }
            yield webElement.click();
            return yield webElement.sendKeys(inputText);
        });
    }
    static getText(driver, locator, timeout = 5 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.getElement(driver, locator, timeout)).getText();
        });
    }
    static isDisplayed(driver, selector, timeout = 5 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (yield this.getElement(driver, selector, timeout)).isDisplayed();
            }
            catch (error) {
                return false;
            }
        });
    }
    static getPageTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.getTitle();
        });
    }
    static sendKeyToElement(driver, selector, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement(driver, selector);
            yield element.sendKeys(selenium_webdriver_1.Key[key]);
        });
    }
    static waitUntilElementHasState(driver, state, elementLocator, timeout = 10 * 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.elementLocated({ css: elementLocator }), timeout);
            if (state === 'located') {
                return;
            }
            const element = yield driver.findElement({ css: elementLocator });
            switch (state) {
                case 'enabled':
                    yield driver.wait(selenium_webdriver_1.until.elementIsEnabled(element), timeout);
                    break;
                case 'disabled':
                    yield driver.wait(selenium_webdriver_1.until.elementIsDisabled(element), timeout);
                    break;
                case 'visible':
                    yield driver.wait(selenium_webdriver_1.until.elementIsVisible(element), timeout);
                    break;
                case 'notVisible':
                    yield driver.wait(selenium_webdriver_1.until.elementIsNotVisible(element), timeout);
                    break;
                case 'selected':
                    yield driver.wait(selenium_webdriver_1.until.elementIsSelected(element), timeout);
                    break;
                case 'notSelected':
                    yield driver.wait(selenium_webdriver_1.until.elementIsNotSelected(element), timeout);
                    break;
                case 'clickable':
                    yield driver.wait(selenium_webdriver_1.until.elementIsVisible(element), timeout);
                    yield driver.wait(selenium_webdriver_1.until.elementIsEnabled(element), timeout);
                    break;
                case 'stale':
                    yield driver.wait(selenium_webdriver_1.until.stalenessOf(element), timeout);
                    break;
                default:
            }
            return;
        });
    }
    static waitUntilPageTitleIs(driver, title, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.titleIs(title), timeout);
            return;
        });
    }
    static waitUntilPageTitleContains(driver, title, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.titleContains(title), timeout);
            return;
        });
    }
    static waitUntilPageUrlContains(driver, substrUrl, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.urlContains(substrUrl), timeout);
            return;
        });
    }
    static waitUntilPageUrlIs(driver, url, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.urlContains(url), timeout);
            return;
        });
    }
    static driverSleep(driver, delay) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.sleep(delay);
        });
    }
    static waitUntilElementLocatedBy(driver, by, elementLocator, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.elementLocated(by(elementLocator)), timeout);
            return;
        });
    }
    static waitUntilElementVisible(driver, element, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.wait(selenium_webdriver_1.until.elementIsVisible(element), timeout);
            return;
        });
    }
    static isElementPresent(driver, locator) {
        return __awaiter(this, void 0, void 0, function* () {
            const elementArray = yield this.getElementsArray(driver, locator);
            return (elementArray.length > 0);
        });
    }
    static getElementAttribute(webElement, elementAttribute) {
        return __awaiter(this, void 0, void 0, function* () {
            return webElement.getAttribute(elementAttribute);
        });
    }
    static hasClass(driver, selector, classNeedle) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement(driver, selector, 5000);
            const elementClass = yield element.getAttribute('class');
            const classHaystack = elementClass.split(' ');
            const resultIndex = classHaystack.indexOf(classNeedle);
            return resultIndex >= 0;
        });
    }
    static setFocusOnElement(webElement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield webElement.sendKeys('');
        });
    }
    static removeSurveyPopupElement(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript('if (document.getElementById(\'surveyPopup\')) { document.getElementById(\'surveyPopup\').parentNode.removeChild(document.getElementById(\'surveyPopup\')); }');
            return;
        });
    }
    static removeCkSurveyPopupElement(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript('if (document.getElementById(\'acsMainInvite\')) { document.getElementsByClassName(\'__acs\')[0].parentNode.removeChild(document.getElementsByClassName(\'__acs\')[0]); }');
            return;
        });
    }
    static getHTMLElementPosition(driver, cssSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.getElement(driver, cssSelector);
            const x = Number(yield el.getAttribute('offsetLeft')) - Number(yield driver.executeScript('return window.pageXOffset'));
            const y = Number(yield el.getAttribute('offsetTop')) - Number(yield driver.executeScript('return window.pageYOffset'));
            return { x, y };
        });
    }
    static scrollY(driver, direction, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript(`window.scroll(0, window.pageYOffset ${direction === 'up' ? '-' : '+'} ${amount})`);
            return;
        });
    }
    static getCurrentScroll(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.executeScript('return document.documentElement.scrollTop');
        });
    }
    static scrollToElement(driver, elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            const yPosition = (yield this.getHTMLElementPosition(driver, elementLocator)).y;
            yield driver.executeScript(`window.scroll(0, ${yPosition})`);
            return;
        });
    }
    static jsScrollToElementAlignTop(driver, webElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript('arguments[0].scrollIntoView(true);', webElement);
            return;
        });
    }
    static jsScrollToElementAlignBottom(driver, webElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript('arguments[0].scrollIntoView(false);', webElement);
            return;
        });
    }
    static jsClickOnElement(driver, webElement) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript('arguments[0].click();', webElement);
            return;
        });
    }
    static highlightElement(driver, webElement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.executeScript('arguments[0].setAttribute(`style`, arguments[1]);', webElement, 'background-color: red; border: 1px solid red;');
        });
    }
    static getCleanPrice(price) {
        if (typeof price === 'string') {
            return (Number(price.replace(/[^0-9]+/g, '')) / 100).toFixed(2);
        }
        return;
    }
    static removeCurrencySymbol(value) {
        return value.replace(/[^\d\.\s]+/g, '');
    }
}
exports.Helpers = Helpers;
Helpers.jsWaitUntilPageLoadComplete = function (driver, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        let totalTime = 0;
        let documentReadyState = yield driver.executeScript('return document.readyState;');
        let jQueryActive = yield driver.executeScript('return jQuery.active;');
        while (!(documentReadyState === 'complete') && (jQueryActive === 0) && (totalTime < timeout)) {
            yield Helpers.driverSleep(driver, 1000);
            documentReadyState = yield driver.executeScript('return document.readyState;');
            jQueryActive = yield driver.executeScript('return jQuery.active;');
            totalTime = totalTime + 1000;
        }
        return;
    });
};
Helpers.refreshPageUntilElementPresent = function (driver, cssElementLocator, timeout, maxRefreshcount = 6, legend = '\'Cancel Subscription\' button') {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- Refreshing page until ' + legend + ' becomes visible');
        let refreshCounter = 0;
        while (!(yield this.isElementPresent(driver, cssElementLocator)) && (refreshCounter < maxRefreshcount)) {
            yield driver.navigate().refresh();
            refreshCounter++;
            yield Helpers.driverSleep(driver, timeout);
        }
        return;
    });
};
Helpers.cancelSubscriptionOrder = function (subOrderNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxAttempts = 15;
        let currentAttempt = 0;
        const subInfo = yield subsAPIClient.getSubscriptionsByOrder(subOrderNumber);
        const webUserId = subInfo[0].webUserId;
        console.log(`- Cancelling subscription order using an ORR API call (webUserID: ${webUserId}, subOrderNumber: ${subOrderNumber})`);
        const subscriptionId = String(subInfo[0].id);
        let result;
        let isSubCancelled = false;
        while (!isSubCancelled && (currentAttempt < maxAttempts)) {
            try {
                result = yield subsAPIClient.deleteSubscription(webUserId, subscriptionId);
                isSubCancelled = result.isCancelled;
            }
            catch (e) {
                console.log('e', e);
            }
            currentAttempt++;
        }
        if (!isSubCancelled) {
            throw new Error('Subscription could not be cancelled using an ORR API call');
        }
        else {
            console.log(`- Subscription cancelled using an ORR API call (webUserID: ${webUserId}, subOrderNumber: ${subOrderNumber})`);
            return;
        }
    });
};
//# sourceMappingURL=helpers.js.map