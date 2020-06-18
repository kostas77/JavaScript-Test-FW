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
const urlData_1 = require("../../../features_global/support/urlData");
const helpers_1 = require("../../support/helpers");
class KitchenSink {
    constructor() {
        this.pageUrl = new urlData_1.UrlData(process.env.NODE_ENV).getUrlFor().elsevier.kitchenSink;
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.get(this.pageUrl);
            yield helpers_1.Helpers.driverSleep(driver, 2000);
            yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(driver, 30000);
        });
    }
    captureExpectedScrollPosition(driver, browserName) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageHeader = yield helpers_1.Helpers.getElement(driver, 'header');
            const navBar = yield helpers_1.Helpers.getElement(driver, '.in-page-nav');
            const headerHeight = pageHeader ? Number(yield pageHeader.getAttribute('offsetHeight')) : 0;
            const navBarHeight = navBar ? Number(yield navBar.getAttribute('offsetHeight')) + 16 : 0;
            const navAndHeaderHeight = headerHeight + (browserName === 'ie' ? 0 : navBarHeight);
            const headingOffset = (yield helpers_1.Helpers.getHTMLElementPosition(driver, 'h2#typography')).y;
            return headingOffset - navAndHeaderHeight;
        });
    }
    clickTypographyLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.clickElement(driver, 'a[href="#typography"]');
            yield helpers_1.Helpers.driverSleep(driver, 2000);
        });
    }
}
exports.KitchenSink = KitchenSink;
//# sourceMappingURL=kitchenSink.js.map