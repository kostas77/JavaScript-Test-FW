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
const helpers_1 = require("../../../common/support/helpers");
const driverConfig_1 = require("../../../features_global/support/driverConfig");
const config = new driverConfig_1.DriverConfig();
class RenewalsDetailPage {
    constructor() {
        this.pageTitle = 'Your Journal subscriptions for renewal | Elsevier';
        this.cartTotalPriceLocator = '.item-cart-total';
        this.discountPriceLocator = '.item-discount';
        this.subTotalPriceLocator = '.item-sub-total';
        this.taxPriceLocator = '.item-tax:not(.loading-price)';
        this.orderTotalPriceLocator = '.total';
        this.tAndCCheckboxLocator = '[data-e2e-terms-and-conditions]';
        this.selectAllRenewalsCheckboxLocator = '.address .checkbox__delivery:not(.checked)';
        this.proceedToCheckoutButtonLocator = '#checkout-button';
    }
    selectAllRenewalsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.platform === 'MOBILE') {
                return driver.executeScript('$(\'.address .checkbox__delivery input[type="checkbox"]:not("checked")\').click()');
            }
            else {
                return yield helpers_1.Helpers.clickElement(driver, this.selectAllRenewalsCheckboxLocator);
            }
        });
    }
    cartTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartTotalPriceLocator);
        });
    }
    discountPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.discountPriceLocator);
        });
    }
    subTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.subTotalPriceLocator);
        });
    }
    taxPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.taxPriceLocator);
        });
    }
    orderTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalPriceLocator);
        });
    }
    TermsAndConditionsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.tAndCCheckboxLocator);
        });
    }
    selectTermsAndConditionsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.platform === 'MOBILE') {
                yield helpers_1.Helpers.jsScrollToElementAlignTop(driver, yield this.TermsAndConditionsCheckbox(driver));
                return yield helpers_1.Helpers.jsClickOnElement(driver, yield this.TermsAndConditionsCheckbox(driver));
            }
            else {
                return yield helpers_1.Helpers.clickElement(driver, this.tAndCCheckboxLocator);
            }
        });
    }
    ProceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.proceedToCheckoutButtonLocator);
        });
    }
    clickProceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.platform === 'MOBILE') {
                yield helpers_1.Helpers.jsScrollToElementAlignTop(driver, yield this.ProceedToCheckoutButton(driver));
                return yield helpers_1.Helpers.jsClickOnElement(driver, yield this.ProceedToCheckoutButton(driver));
            }
            else {
                return yield helpers_1.Helpers.clickElement(driver, this.proceedToCheckoutButtonLocator);
            }
        });
    }
}
exports.RenewalsDetailPage = RenewalsDetailPage;
//# sourceMappingURL=renewalsDetailPage.js.map