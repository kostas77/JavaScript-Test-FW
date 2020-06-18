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
const cucumber_1 = require("cucumber");
const helpers_1 = require("../../common/support/helpers");
const urlData_1 = require("../support/urlData");
const driverConfig_1 = require("../support/driverConfig");
const config = new driverConfig_1.DriverConfig();
const backToTopSelector = '.back-to-top';
cucumber_1.Given(/^the back to top button is not visible$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'notVisible', backToTopSelector, 2000);
    });
});
cucumber_1.When(/^I scroll to the bottom of the page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.scrollToElement(this.driver, 'footer');
    });
});
cucumber_1.Then(/^the scroll to top button is visible$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', backToTopSelector, 2000);
    });
});
cucumber_1.When(/^I click the scroll to top button$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.clickElement(this.driver, backToTopSelector);
        yield helpers_1.Helpers.driverSleep(this.driver, 2000);
    });
});
cucumber_1.Then(/^I have scrolled to the top of the page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const scrollPosition = yield helpers_1.Helpers.getCurrentScroll(this.driver);
        this.assert.equal(scrollPosition, 0, 'Scroll position does not match the expected value');
    });
});
const a11yClass = 'accessibility-link';
const a11ySelector = '.accessibility-link';
cucumber_1.When(/^I press the tab key$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.sendKeyToElement(this.driver, 'html', 'TAB');
    });
});
cucumber_1.Then(/^the skip to content link is focused$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const activeElement = yield this.driver.switchTo().activeElement();
        this.assert.equal(yield activeElement.getAttribute('class'), a11yClass, 'Accessibility link is not focused');
    });
});
cucumber_1.When(/^I press enter on the skip to content link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.sendKeyToElement(this.driver, a11ySelector, 'ENTER');
    });
});
cucumber_1.Then(/^the main page content is focused$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedElement = yield helpers_1.Helpers.getElement(this.driver, 'main > div');
        const activeElement = yield this.driver.switchTo().activeElement();
        this.assert.equal(yield activeElement.getAttribute('class'), yield expectedElement.getAttribute('class'), 'Active element is not equal to the expected element');
    });
});
cucumber_1.Given(/^I have navigated to the kitchen sink page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const kitchenSinkUrl = new urlData_1.UrlData(this.testEnv).getUrlFor().elsevier.kitchenSink;
        yield this.driver.get(kitchenSinkUrl);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'clickable', 'footer', 30 * 1000);
    });
});
cucumber_1.Given(/^I have captured the expected scroll position of the typography heading$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const header = yield helpers_1.Helpers.getElement(this.driver, 'header');
        const nav = yield helpers_1.Helpers.getElement(this.driver, '.in-page-nav');
        const headerHeight = header ? Number(yield header.getAttribute('offsetHeight')) : 0;
        const navHeight = nav ? Number(yield nav.getAttribute('offsetHeight')) + 16 : 0;
        const navAndHeaderHeight = headerHeight + (config.browserName === 'ie' ? 0 : navHeight);
        const headingOffset = (yield helpers_1.Helpers.getHTMLElementPosition(this.driver, 'h2#typography')).y;
        this.expectedPosition = headingOffset - navAndHeaderHeight;
        console.log('- Expected scroll position captured', headingOffset);
    });
});
cucumber_1.When(/^I click the typography link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.clickElement(this.driver, 'a[href="#typography"]');
        yield helpers_1.Helpers.driverSleep(this.driver, 2000);
    });
});
cucumber_1.Then(/^the page scrolls to the expected position$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const scrollPosition = yield helpers_1.Helpers.getCurrentScroll(this.driver);
        this.assert.equal(scrollPosition, this.expectedPosition, 'Scroll position does not match the expected value');
    });
});
//# sourceMappingURL=accessibilityFunctionalitySteps.js.map