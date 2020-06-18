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
const helpers_1 = require("../../../support/helpers");
class CartPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.cart;
        this.pageTitle = 'Shopping Cart | Elsevier';
        this.emptyCartLocator = 'h3';
        this.coverImageLocator = '.lightbox';
        this.lineItemsTitleLocator = '.item-name';
        this.lineItemsFormatLocator = '.item-source';
        this.lineItemsISBNLocator = '.item-isbn';
        this.lineItemsTotalPriceLocator = '.line_price:not(.strike) .price_figure.item-total';
        this.lineItemsUnitPriceLocator = '.price-each';
        this.lineItemsDiscountPriceLocator = '.price_figure.item-discount';
        this.lineItemsQuantityInputLocator = '.item_qty';
        this.lineItemsRemoveItemLocator = '.remove-item';
        this.lineItemsRemoveBundleItemLocator = '.bundle-item-remove';
        this.lastLineItemTitleLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .item-name';
        this.lastLineItemFormatLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .item-source';
        this.lastLineItemISBNLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .item-isbn';
        this.lastLineItemDiscountPriceLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .price_figure.item-discount';
        this.lastLineItemTotalPriceLoadingLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .line_price_loading';
        this.lastLineItemQuantityInputLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .item_qty';
        this.promoToggleLocator = '.promo-toggle';
        this.promoCodeLocator = '#promotion_code';
        this.applyPromoLocator = '#promotion_code_submit';
        this.cartSubtotalLocator = '#subtotal_figure';
        this.cartSubtotalTextLocator = '.subtotal_amount';
        this.cartTaxLocator = '#tax_figure';
        this.cartTaxTextLocator = 'small';
        this.cartShippingLocator = '#shipping_figure';
        this.cartTotalLocator = '#grandtotal_figure';
        this.continueShoppingLocator = '.continue-shopping';
        this.proceedToCheckoutLocator = '.checkout-button';
        this.itemRowByISBN = '//span[text()="<ISBN>"]/ancestor::div[contains(concat(" ", @class, " "), " item-row ")]';
        this.loginLinkLocator = '.header-item--account';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    promoToggleArrow(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.promoToggleLocator);
        });
    }
    togglePromotionField(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.promoToggleArrow(driver)).click();
        });
    }
    promoCodeField(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.promoCodeLocator);
        });
    }
    enterPromoCode(driver, promoCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.promoCodeField(driver)).sendKeys(promoCode);
        });
    }
    applyPromoButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.applyPromoLocator);
        });
    }
    applyPromo(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.applyPromoButton(driver)).click();
        });
    }
    coverImages(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.coverImageLocator);
        });
    }
    lineItemShortTitles(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.lineItemsTitleLocator);
        });
    }
    lineItemFormats(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.lineItemsFormatLocator);
        });
    }
    lineItemQuantities(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.lineItemsQuantityInputLocator);
        });
    }
    lineItemUnitPrices(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.lineItemsUnitPriceLocator);
        });
    }
    lastLineItemUnitPrice(driver, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let element;
            try {
                element = yield driver.findElement(selenium_webdriver_1.By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//*[contains(@class, "item-slash-figure")]`));
            }
            catch (err) {
                if (err.name === 'NoSuchElementError') {
                    element = yield driver.findElement(selenium_webdriver_1.By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//*[contains(@class, "item-total")]`));
                }
                else {
                    throw new Error(err);
                }
            }
            const itemPrice = yield element.getText();
            return Number(itemPrice.replace(/[^0-9.-]+/g, ''));
        });
    }
    itemIsPrintBook(driver, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let isPrintBook = false;
            try {
                yield driver.findElement(selenium_webdriver_1.By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][contains(text(), "Print")]/ancestor::div[contains(@class, "item-details")]//div[contains(@class, "item-details-row-content")]//strong[contains(text(), "ISBN")]`));
                isPrintBook = true;
            }
            catch (err) {
                if (err.name !== 'NoSuchElementError') {
                    throw new Error(err);
                }
            }
            return isPrintBook;
        });
    }
    itemIsEBook(driver, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let isEbook = false;
            try {
                yield driver.findElement(selenium_webdriver_1.By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][not(contains(text(), "Print"))]`));
                isEbook = true;
            }
            catch (err) {
                if (err.name !== 'NoSuchElementError') {
                    throw new Error(err);
                }
            }
            return isEbook;
        });
    }
    itemIsJournal(driver, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            let isJournal = false;
            try {
                yield driver.findElement(selenium_webdriver_1.By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][contains(text(), "Print")]/ancestor::div[contains(@class, "item-details")]//div[contains(@class, "item-details-row-content")]//strong[contains(text(), "ISSN")]`));
                isJournal = true;
            }
            catch (err) {
                if (err.name !== 'NoSuchElementError') {
                    throw new Error(err);
                }
            }
            return isJournal;
        });
    }
    getTaxRateForPrintBook(countryCode) {
        switch (countryCode) {
            case 'GB':
                return 1.0;
            case 'DE':
                return 1.07;
            case 'AU':
                return 1.1;
            case 'JP':
                return 1.0;
            default:
                return 1.0;
        }
    }
    getTaxRateForEBook(countryCode) {
        switch (countryCode) {
            case 'GB':
                return 1.2;
            case 'DE':
                return 1.19;
            case 'AU':
                return 1.1;
            case 'JP':
                return 1.0;
            default:
                return 1.0;
        }
    }
    getTaxRateForJournal(countryCode) {
        switch (countryCode) {
            case 'GB':
                return 1.0;
            case 'DE':
                return 1.0;
            case 'AU':
                return 1.0;
            case 'JP':
                return 1.0;
            default:
                return 1.0;
        }
    }
    getLastLineItemUnitPrice(driver, isbns, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let currencyPrice = 0;
            const bundled = isbns.length > 1;
            for (let i = 0, j = isbns.length; i < j; i++) {
                let itemPrice = yield this.lastLineItemUnitPrice(driver, isbns[i]);
                if (yield this.itemIsEBook(driver, isbns[i])) {
                    itemPrice *= this.getTaxRateForEBook(countryCode);
                }
                else if (yield this.itemIsPrintBook(driver, isbns[i])) {
                    itemPrice *= this.getTaxRateForPrintBook(countryCode);
                }
                else if (yield this.itemIsJournal(driver, isbns[i])) {
                    itemPrice *= this.getTaxRateForJournal(countryCode);
                }
                currencyPrice += itemPrice;
            }
            console.log(`  - Finding a price for ${isbns} which ${bundled ? 'is' : 'is not'} bundled`);
            console.log(`    - Product cart price is: ${currencyPrice}`);
            return currencyPrice.toFixed(2);
        });
    }
    lineItemTotals(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.lineItemsTotalPriceLocator);
        });
    }
    deleteLineItemOptions(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.deleteLineItemLocator);
        });
    }
    productQuantityInput(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.lastLineItemQuantityInputLocator);
        });
    }
    increaseProductQuantity(driver, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.productQuantityInput(driver)).sendKeys(selenium_webdriver_1.Key.DELETE);
            yield (yield this.productQuantityInput(driver)).sendKeys(quantity);
            yield (yield this.productQuantityInput(driver)).sendKeys(selenium_webdriver_1.Key.RETURN);
            yield driver.sleep(3000);
            return;
        });
    }
    cartSubtotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartSubtotalLocator);
        });
    }
    cartSubtotalText(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartSubtotalTextLocator);
        });
    }
    cartTax(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartTaxLocator);
        });
    }
    cartShipping(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartShippingLocator);
        });
    }
    cartTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartTotalLocator);
        });
    }
    continueShoppingButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.continueShoppingLocator);
        });
    }
    clickContinueShoppingLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.continueShoppingButton(driver)).click();
        });
    }
    proceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.proceedToCheckoutLocator);
        });
    }
    clickProceedToCheckoutButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.proceedToCheckoutButton(driver)).click();
        });
    }
    proceedToCheckout(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clickProceedToCheckoutButton(driver);
        });
    }
    selectVariation(driver, sku, variation) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemVariations = yield helpers_1.Helpers.getElementsArray(driver, '[data-item-sku="' + sku + '"] div.item-variations label');
            for (const itemVariation of itemVariations) {
                const variationText = yield itemVariation.getText();
                if (variation === variationText.trim()) {
                    yield (yield itemVariation.findElement({ css: 'input.item-variation' })).click();
                    yield driver.wait(() => __awaiter(this, void 0, void 0, function* () {
                        const mask = yield helpers_1.Helpers.getElement(driver, '.row-mask');
                        try {
                            if (yield mask.isDisplayed()) {
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                        catch (err) {
                            return true;
                        }
                    }));
                    return;
                }
            }
        });
    }
    loginLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginLinkLocator);
        });
    }
    selectLoginLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginLink(driver)).click();
        });
    }
}
exports.CartPage = CartPage;
//# sourceMappingURL=cartPage.js.map