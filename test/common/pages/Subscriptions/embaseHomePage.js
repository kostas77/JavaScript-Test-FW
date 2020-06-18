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
const helpers_1 = require("../../support/helpers");
class EmbaseHomePage {
    constructor(testData) {
        this.pageTitle = 'Biomedical research – Embase | Elsevier';
        this.pageUrl = testData.getUrlFor().elsevier.embase;
        this.weeklySubscriptionButtonLocator = '.add-to-cart7';
        this.monthlySubscriptionButtonLocator = '.add-to-cart30';
        this.footerLogoLocator = '.gh-logo';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    nonSolusLogo(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.footerLogoLocator);
        });
    }
    subscriptionOption(driver, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (duration) {
                case '7 Day Subscription':
                    return yield helpers_1.Helpers.getElement(driver, this.weeklySubscriptionButtonLocator);
                    break;
                case '30 Day Subscription':
                    return yield helpers_1.Helpers.getElement(driver, this.monthlySubscriptionButtonLocator);
                    break;
                default:
                    throw new Error('Invalid option for Embase subscription requested');
            }
        });
    }
    clickSubscriptionOption(driver, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.subscriptionOption(driver, duration)).click();
        });
    }
}
exports.EmbaseHomePage = EmbaseHomePage;
//# sourceMappingURL=embaseHomePage.js.map