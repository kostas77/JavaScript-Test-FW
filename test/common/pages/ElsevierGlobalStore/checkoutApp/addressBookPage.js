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
class AddressBookPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.address;
        this.pageTitle = 'My Account - Address | Elsevier';
        this.billingAddressLabelLocator = '#address-form-billing .columns.no-margin';
        this.billingFirstNameLocator = '#billing-firstName';
        this.billingLastNameLocator = '#billing-lastName';
        this.billingAddress1Locator = '#billing-street1';
        this.billingAddress2Locator = '#billing-street2';
        this.billingCityLocator = '#billing-city';
        this.billingRegionLocator = '#billing-region';
        this.billingPostcodeLocator = '#billing-postcode';
        this.billingCountryLocator = '#billing_country';
        this.billingPhoneLocator = '#billing-phone';
        this.sameAddressCheckboxLocator = '#billing_shipping_same';
        this.shippingFirstNameLocator = '#shipping-firstName';
        this.shippingLastNameLocator = '#shipping-lastName';
        this.shippingAddress1Locator = '#shipping-street1';
        this.shippingAddress2Locator = '#shipping-street2';
        this.shippingCityLocator = '#shipping-city';
        this.shippingRegionLocator = '#shipping-region';
        this.shippingPostcodeLocator = '#shipping-postcode';
        this.shippingCountryLocator = '#shipping_country';
        this.shippingPhoneLocator = '#shipping-phone';
        this.updateButtonLocator = '#update-form-submit';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    billingFirstName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingFirstNameLocator);
        });
    }
    billingLastName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingLastNameLocator);
        });
    }
    billingAddress1(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingAddress1Locator);
        });
    }
    billingAddress2(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingAddress2Locator);
        });
    }
    billingCity(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingCityLocator);
        });
    }
    selectBillingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.billingRegionLocator + '>option[value="' + region + '"]')).click();
        });
    }
    billingPostcode(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingPostcodeLocator);
        });
    }
    billingCountry(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingCountryLocator);
        });
    }
    selectBillingCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]')).click();
        });
    }
    billingPhoneNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingPhoneLocator);
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
    shippingFirstName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingFirstNameLocator);
        });
    }
    shippingLastName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingLastNameLocator);
        });
    }
    shippingAddress1(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingAddress1Locator);
        });
    }
    shippingAddress2(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingAddress2Locator);
        });
    }
    shippingCity(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingCityLocator);
        });
    }
    selectShippingRegion(driver, region) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.shippingRegionLocator + '>option[value="' + region + '"]')).click();
        });
    }
    shippingPostcode(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingPostcodeLocator);
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
    submitForm(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.updateButtonLocator)).click();
        });
    }
}
exports.AddressBookPage = AddressBookPage;
//# sourceMappingURL=addressBookPage.js.map