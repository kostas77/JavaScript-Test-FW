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
const helpers_1 = require("../../../support/helpers");
class CheckoutPage {
    constructor() {
        this.pageTitle = 'Checkout | Elsevier';
        this.backToCartLocator = '#back_to_cart';
        this.cartTotalPriceLocator = '.subtotal_figure';
        this.discountPriceLocator = '.discount_figure';
        this.subTotalPriceLocator = '.discounted_figure';
        this.taxPriceLocator = '.tax_figure:not(.loading-price)';
        this.taxLoadingLocator = '.loading-price';
        this.orderTotalPriceLocator = '.grandtotal_figure';
        this.termsCheckboxLocator = '#ts-and-cs-checkbox';
        this.payButtonLocator = '#pay-button';
        this.billingFirstNameLocator = '#billing-firstName';
        this.billingLastNameLocator = '#billing-lastName';
        this.billingAddress1Locator = '#billing-street1';
        this.billingAddress2Locator = '#billing-street2';
        this.billingCityLocator = '#billing-city';
        this.billingRegionSelectorLocator = '#billing-region-select';
        this.billingRegionLocator = '#billing-region';
        this.billingPostcodeLocator = '#billing-postcode';
        this.billingCountryLocator = '#billing_country';
        this.billingPhoneLocator = '#billing-phone';
        this.registerPasswordLocator = '#password';
        this.sameAddressCheckboxLocator = '#billing_shipping_same';
        this.shippingAddressLabelLocator = '.checkout-address h3:first-of-type';
        this.shippingFirstNameLocator = '#shipping-firstName';
        this.shippingLastNameLocator = '#shipping-lastName';
        this.shippingAddress1Locator = '#shipping-street1';
        this.shippingAddress2Locator = '#shipping-street2';
        this.shippingCityLocator = '#shipping-city';
        this.shippingRegionSelectorLocator = '#shipping-region-select';
        this.shippingRegionLocator = '#shipping-region';
        this.shippingPostcodeLocator = '#shipping-postcode';
        this.shippingCountryLocator = '#shipping_country';
        this.shippingPhoneLocator = '#shipping-phone';
        this.shippingEmailLocator = '#email';
        this.loginButtonLocator = '.login-button';
        this.signInButtonLocator = '#signin-button';
        this.loginEmailLocator = '#signin-email';
        this.loginPasswordLocator = '#signin-password';
        this.accountNeededMessageLocator = '.account-needed-message';
    }
    billingAddress1(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingAddress1Locator);
        });
    }
    selectBillingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.billingRegionSelectorLocator + '>option[value="' + region + '"]')).click();
        });
    }
    selectBillingCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]')).click();
        });
    }
    sameAddressCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.sameAddressCheckboxLocator);
        });
    }
    selectSameAddressCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.sameAddressCheckbox(driver)).click();
        });
    }
    shippingAddress1(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingAddress1Locator);
        });
    }
    selectShippingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.shippingRegionSelectorLocator + '>option[value="' + region + '"]')).click();
        });
    }
    selectShippingCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.shippingCountryLocator + '>option[value="' + countryCode + '"]')).click();
        });
    }
    shippingPhoneNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingPhoneLocator);
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
    taxLoading(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.taxLoadingLocator);
        });
    }
    orderTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalPriceLocator);
        });
    }
    termsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.termsCheckboxLocator);
        });
    }
    acceptTerms(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.termsCheckbox(driver)).click();
        });
    }
    payButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.payButtonLocator);
        });
    }
    selectPayButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.payButton(driver)).click();
        });
    }
    loginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginButtonLocator);
        });
    }
    selectLoginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginButton(driver)).click();
        });
    }
    signInButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.signInButtonLocator);
        });
    }
    selectSignInButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.signInButton(driver)).click();
        });
    }
    loginEmail(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginEmailLocator);
        });
    }
    enterLoginEmail(driver, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginEmail(driver)).sendKeys(email);
        });
    }
    loginPassword(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginPasswordLocator);
        });
    }
    enterLoginPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginPassword(driver)).sendKeys(password);
        });
    }
    enterLoginDetails(driver, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterLoginEmail(driver, email);
            yield this.enterLoginPassword(driver, password);
            yield this.selectSignInButton(driver);
            return;
        });
    }
    accountNeededMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.accountNeededMessageLocator);
        });
    }
}
exports.CheckoutPage = CheckoutPage;
//# sourceMappingURL=checkoutPage.js.map