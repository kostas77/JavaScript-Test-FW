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
const driverConfig_1 = require("../../../../features_global/support/driverConfig");
const config = new driverConfig_1.DriverConfig();
class JournalProductPage {
    constructor() {
        this.mainTitleLocator = '.main-title';
        this.countrySelectorDropdownLocator = '#country-selector';
        this.threeYearSubscriptionOptionLocator = 'label~ label+ label .no-margin';
        this.addToCartButtonLocator = '.addToCart-btn';
        this.printPricesLocator = '.format-price:not(.hide) .price-value';
        this.rollingPrintPricesLocator = '.format-price:not(.hide)';
        this.productListedPrice = '';
        this.requestAQuoteButtonLocator = '.quote-button';
        this.quoteModalLocator = '#quote-modal:not(.hide)';
        this.closeQuoteModalButtonLocator = '.quote-close-button';
        this.taxExemptLinkLocator = '#taxexempt';
        this.taxExemptModalLocator = '#tax-exempt-modal:not(.hide)';
        this.closeTaxExemptModalButtonLocator = '.tax-exempt-close-button';
    }
    mainTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.mainTitleLocator);
        });
    }
    headerPrintIsbn(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.headerPrintIsbnLocator);
        });
    }
    selectThreeYearSubscriptionOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.threeYearSubscriptionOptionLocator);
        });
    }
    selectCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.countrySelectorDropdownLocator + '>option[value*="' + countryCode + '"]');
        });
    }
    AddToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addToCartButtonLocator);
        });
    }
    selectAddToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.browserName.toLowerCase() === 'android') {
                return yield helpers_1.Helpers.jsClickOnElement(driver, yield this.AddToCartButton(driver));
            }
            return yield helpers_1.Helpers.clickElement(driver, this.addToCartButtonLocator);
        });
    }
    printPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.printPricesLocator);
        });
    }
    getPrintPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.printPrice(driver)).getText();
        });
    }
    rollingPrintPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.rollingPrintPricesLocator);
        });
    }
    getRollingPrintPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.rollingPrintPrice(driver)).getText();
        });
    }
    addProductToCart(driver, productName) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (productName) {
                case 'Delta personal journal':
                    this.productListedPrice = yield this.getPrintPrice(driver);
                    yield this.selectAddToCartButton(driver);
                    break;
                case 'Delta institutional journal':
                case 'Institutional journal - GBP, EUR, JPY':
                    this.productListedPrice = yield this.getPrintPrice(driver);
                    yield this.selectAddToCartButton(driver);
                    break;
                case 'ARGI personal journal (1 year)':
                case 'Personal journal - GBP, EUR, JPY':
                    this.productListedPrice = yield this.getPrintPrice(driver);
                    yield this.selectAddToCartButton(driver);
                    break;
                case 'ARGI institutional journal (3 years)':
                    yield this.selectThreeYearSubscriptionOption(driver);
                    this.productListedPrice = yield this.getRollingPrintPrice(driver);
                    yield this.selectAddToCartButton(driver);
                    break;
                default:
                    throw new Error('Unknown product specified: ' + productName);
            }
        });
    }
    selectRequestAQuoteButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.requestAQuoteButtonLocator);
        });
    }
    selectCloseQuoteButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.closeQuoteModalButtonLocator);
        });
    }
    selectTaxExemptLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.taxExemptLinkLocator);
        });
    }
    selectCloseTaxExemptButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.closeTaxExemptModalButtonLocator);
        });
    }
}
exports.JournalProductPage = JournalProductPage;
//# sourceMappingURL=journalProductPage.js.map