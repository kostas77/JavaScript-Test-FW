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
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const bookProductPage_1 = require("../../common/pages/ElsevierGlobalStore/products/bookProductPage");
const journalProductPage_1 = require("../../common/pages/ElsevierGlobalStore/products/journalProductPage");
const articleChoiceHomePage_1 = require("../../common/pages/ElsevierGlobalStore/products/articleChoiceHomePage");
const testData_1 = require("../support/testData");
const Configuration = require("config");
const driverConfig_1 = require("../support/driverConfig");
const config = new driverConfig_1.DriverConfig();
const testData = new testData_1.TestData();
const cartPage = new cartPage_1.CartPage(testData);
const bookProductPage = new bookProductPage_1.BookProductPage();
const journalProductPage = new journalProductPage_1.JournalProductPage();
const articleChoiceHomePage = new articleChoiceHomePage_1.ArticleChoiceHomePage(testData);
const purchasableProducts = Configuration.get('purchasableProducts');
cucumber_1.When(/^I add the following product types in the cart:$/, { timeout: 7 * 60 * 1000 }, function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsList = products.hashes();
        this.orderDetails.orderTotalItems = 0;
        this.orderDetails.productTypes = [];
        this.orderDetails.orderTitles = [];
        this.orderDetails.orderIsbns = [];
        this.orderDetails.discountedOrder = false;
        for (const productInfo of productsList) {
            const quantity = productInfo['Quantity'];
            const product = productInfo['Product Type'];
            const prodToPurchase = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === product.toString());
            if (!prodToPurchase) {
                throw new Error('Unrecognised product type found:' + product);
            }
            if (prodToPurchase.bundleFlag) {
                this.orderDetails.discountedOrder = true;
            }
            const purchasableProduct = purchasableProducts[prodToPurchase.productType];
            if (!purchasableProduct) {
                console.log('- Product ' + product + ' is set to not purchasable');
            }
            else {
                console.log(`- Adding ${product} to the cart`);
                const productType = prodToPurchase.productType;
                const productCategory = prodToPurchase.productCategory;
                const productPath = prodToPurchase.productPath;
                yield this.driver.get(productPath);
                if (productCategory === 'book') {
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', bookProductPage.mainTitleLocator, 5 * 1000);
                    if (config.browserName !== 'ie') {
                        yield helpers_1.Helpers.removeSurveyPopupElement(this.driver);
                    }
                    if (this.scenarioTags.indexOf('@TaxDisplayE2E') > -1) {
                        this.discountMultiplier = 1;
                        try {
                            const promoDiscount = yield helpers_1.Helpers.getElement(this.driver, '.print-format .slash-price-description:not(.hide)');
                            if (promoDiscount) {
                                const discountText = yield (promoDiscount.getText());
                                console.log(`- Discount found, product has ${discountText}, adjustments will be made`);
                                this.discountMultiplier = 1 - (Number(discountText.replace(/\D/g, '')) / 100);
                            }
                        }
                        catch (err) {
                            if (!err.name || err.name !== 'NoSuchElementError') {
                                throw new Error(err);
                            }
                        }
                    }
                    yield bookProductPage.selectCountry(this.driver, this.customerDetails.countryCode);
                    yield bookProductPage.addProductToCart(this.driver, product.toString());
                    let productCartPriceText = '';
                    let productCartPrice = 0;
                    if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                        if (this.customerDetails.countryCode === 'US' || productType === 'printBook') {
                            productCartPriceText = yield cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                            this.assert.equal(productCartPriceText, bookProductPage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                            console.log('  - ' + product + ' cart price is the same as in the product page (before tax): ' + bookProductPage.productListedPrice);
                        }
                        else {
                            productCartPriceText = yield cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                            productCartPrice = Number((Number(productCartPriceText) * 1).toFixed(2));
                            this.assert.approximately(productCartPrice, Number(bookProductPage.productListedPrice), 0.02, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                            console.log('  - ' + product + ' cart price is the same as in the product page (after tax): ' + bookProductPage.productListedPrice);
                        }
                    }
                    if (Number(quantity) > 1) {
                        yield cartPage.increaseProductQuantity(this.driver, quantity);
                    }
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
                    this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
                }
                else if (productCategory === 'journal') {
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.mainTitleLocator, 5 * 1000);
                    if (config.browserName !== 'ie') {
                        yield helpers_1.Helpers.removeSurveyPopupElement(this.driver);
                    }
                    yield journalProductPage.selectCountry(this.driver, this.customerDetails.countryCode);
                    yield journalProductPage.addProductToCart(this.driver, product.toString());
                    if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                        const productCartPrice = yield cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                        this.assert.equal(productCartPrice, journalProductPage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                        console.log('  - ' + product + ' cart price is the same as in the product page: ' + journalProductPage.productListedPrice);
                    }
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
                    this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
                }
                else if (productCategory === 'articlechoice') {
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', articleChoiceHomePage.globalHeaderLocator, 5 * 1000);
                    if (config.browserName !== 'ie') {
                        yield helpers_1.Helpers.removeSurveyPopupElement(this.driver);
                    }
                    yield helpers_1.Helpers.jsScrollToElementAlignBottom(this.driver, yield articleChoiceHomePage.addToCartButton(this.driver));
                    yield articleChoiceHomePage.selectArticleAmountOption(this.driver, 2);
                    yield articleChoiceHomePage.clickAddToCartButton(this.driver);
                    if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                        const productCartPrice = yield cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                        this.assert.equal(productCartPrice, articleChoiceHomePage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                        console.log('  - ' + product + ' cart price is the same as in the product page: ' + articleChoiceHomePage.productListedPrice);
                    }
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
                    this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
                }
                else if (productCategory === 'article') {
                }
                this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(prodToPurchase.productISBN);
                this.orderDetails.productTypes.push(prodToPurchase.productType);
                for (let i = 0; i < prodToPurchase.productISBN.length; i++) {
                    this.orderDetails.orderTitles.push(prodToPurchase.productTitle);
                }
                this.orderDetails.orderTotalItems += prodToPurchase.productISBN.length;
                console.log('  - Product ' + product + ' added to cart - Cart page displayed');
            }
        }
    });
});
cucumber_1.When(/^I apply a (.*)? discount promo code to the cart$/, function (promoType) {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.discountedOrder = true;
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', cartPage.promoToggleLocator, 10 * 1000);
        yield cartPage.togglePromotionField(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', cartPage.promoCodeLocator, 10 * 1000);
        if (promoType === 'percentage') {
            yield cartPage.enterPromoCode(this.driver, 'E2ETESTS');
        }
        else if (promoType === 'bogo') {
            yield cartPage.enterPromoCode(this.driver, 'E2EBOGO');
        }
        yield cartPage.applyPromo(this.driver);
    });
});
//# sourceMappingURL=productPurchaseSteps.js.map