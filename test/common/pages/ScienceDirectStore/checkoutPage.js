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
class SdCheckoutPage {
    constructor() {
        this.pageTitle = 'Checkout';
        this.backToCartLocator = '.nuxt-link-active';
        this.subTotalPriceLocator = '.checkout-sub-total .money';
        this.taxPriceLocator = '.checkout-taxes .money';
        this.orderTotalPriceLocator = '.checkout-grandTotal .money';
        this.termsLinkLocator = 'terms-and-conditions__hyperlink';
        this.payNowButtonLocator = '.checkout-proceed';
        this.shippingAddressLabelLocator = '.h3:first-of-type';
        this.shippingFirstNameLocator = '#shipping-firstName';
        this.shippingLastNameLocator = '#shipping-lastName';
        this.shippingAddress1Locator = '#shipping-street1';
        this.shippingAddress2Locator = '#shipping-street2';
        this.shippingCityLocator = '#shipping-city';
        this.shippingRegionLocator = '#shipping-region';
        this.shippingPostcodeLocator = '#shipping-postcode';
        this.shippingCountryLocator = '#shipping-country';
        this.shippingVatNumberLocator = '#vatNumber';
        this.sameAddressCheckboxLocator = '#billing_shipping_same';
        this.billingFirstNameLocator = '#billing-firstName';
        this.billingLastNameLocator = '#billing-lastName';
        this.billingAddress1Locator = '#billing-street1';
        this.billingAddress2Locator = '#billing-street2';
        this.billingCityLocator = '#billing-city';
        this.billingRegionLocator = '#billing-region';
        this.billingPostcodeLocator = '#billing-postcode';
        this.billingCountryLocator = '#billing-country';
    }
    billingPostcode(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingPostcodeLocator);
        });
    }
    selectBillingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.billingRegionLocator + '>option[value="' + region + '"]');
        });
    }
    selectBillingCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]');
        });
    }
    sameAddressCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.sameAddressCheckboxLocator);
        });
    }
    selectShippingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.shippingRegionLocator + '>option[value="' + region + '"]');
        });
    }
    selectShippingCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.shippingCountryLocator + '>option[value="' + countryCode + '"]');
        });
    }
    subTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.subTotalPriceLocator);
        });
    }
    taxTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.taxPriceLocator);
        });
    }
    orderTotalPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalPriceLocator);
        });
    }
    payNowButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.payNowButtonLocator);
        });
    }
    selectPayNowButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.payNowButtonLocator);
        });
    }
}
exports.SdCheckoutPage = SdCheckoutPage;
//# sourceMappingURL=checkoutPage.js.map