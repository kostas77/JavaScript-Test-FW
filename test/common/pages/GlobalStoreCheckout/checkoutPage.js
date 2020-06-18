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
class CheckoutPage {
    constructor() {
        this.shippingFirstNameLocator = '.address-form.shipping .input.firstName';
        this.shippingLastNameLocator = '.address-form.shipping .input.lastName';
        this.shippingAddress1Locator = '.address-form.shipping .input.street1';
        this.shippingAddress2Locator = '.address-form.shipping .input.street2';
        this.shippingCityLocator = '.address-form.shipping .input.city';
        this.shippingPostcodeLocator = '.address-form.shipping .input.postcode';
        this.shippingRegionLocator = '.address-form.shipping .select.region';
        this.shippingCountryLocator = '.address-form.shipping .select.country';
        this.shippingPhoneLocator = '.address-form.shipping .input.phone';
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
    shippingStreet1(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingAddress1Locator);
        });
    }
    shippingStreet2(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingAddress2Locator);
        });
    }
    shippingCity(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingCityLocator);
        });
    }
    shippingPostcode(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingPostcodeLocator);
        });
    }
    shippingRegion(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingRegionLocator);
        });
    }
    shippingCountry(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingCountryLocator);
        });
    }
    shippingPhone(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingPhoneLocator);
        });
    }
}
exports.CheckoutPage = CheckoutPage;
//# sourceMappingURL=checkoutPage.js.map