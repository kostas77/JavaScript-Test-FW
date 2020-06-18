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
const cucumber_1 = require("cucumber");
const helpers_1 = require("../../common/support/helpers");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const bookProductPage_1 = require("../../common/pages/ElsevierGlobalStore/products/bookProductPage");
const testData_1 = require("../support/testData");
const Configuration = require("config");
const testData = new testData_1.TestData();
const cartPage = new cartPage_1.CartPage(testData);
const bookProductPage = new bookProductPage_1.BookProductPage();
const purchasableProducts = Configuration.get('purchasableProducts');
cucumber_1.When(/^My cart is empty$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('- TODO');
    });
});
cucumber_1.When(/^I add (?:a|an) (.+) to the cart$/, { timeout: 2 * 60 * 1000 }, function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
        if (!productToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        console.log(`- Found ${product} product (${productToPurchase.productISBN})`);
        yield this.driver.get(productToPurchase.productPath);
        console.log(`- Got ${productToPurchase.productPath}`);
        yield bookProductPage.addProductToCart(this.driver, product);
        console.log(`- Added ${productToPurchase.productName} to cart`);
    });
});
cucumber_1.When(/^The (.+) appears in the cart$/, function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
        if (!productToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.lineItemsISBNLocator, 10 * 1000);
        const cartISBNs = yield helpers_1.Helpers.getElementsArray(this.driver, cartPage.lineItemsISBNLocator);
        console.log(`- Found the following ISBNs - ${cartISBNs}`);
        console.log(cartISBNs);
        for (let i = 0, j = cartISBNs.length; i < j; i++) {
            console.log('cartISBNs[i]:', cartISBNs[i]);
            console.log('await cartISBNs[i].getText():', yield cartISBNs[i].getText());
        }
        productToPurchase.productISBN.forEach(isbn => {
            console.log('isbn:', isbn);
        });
    });
});
cucumber_1.Given(/^I increase the quantity of (.+) in the cart$/, function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
        if (!productToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        const itemRow = yield this.driver.findElement(selenium_webdriver_1.By.xpath(cartPage.itemRowByISBN.replace('<ISBN>', productToPurchase.productISBN[0])));
        const qtyInput = yield itemRow.findElement({ css: '[name="qty"]' });
        yield qtyInput.sendKeys(selenium_webdriver_1.Key.BACK_SPACE, '2', selenium_webdriver_1.Key.ENTER);
        yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
    });
});
cucumber_1.When(/^I apply the (.+) cart discount code$/, function (promo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (yield helpers_1.Helpers.getElement(this.driver, '.promo-toggle')).click();
        yield this.driver.wait(selenium_webdriver_1.until.elementIsVisible(yield helpers_1.Helpers.getElement(this.driver, '#promotion_code_submit')), 5 * 1000);
        yield (yield helpers_1.Helpers.getElement(this.driver, '#promotion_code')).sendKeys(promo);
        yield (yield helpers_1.Helpers.getElement(this.driver, '#promotion_code_submit')).click();
        yield helpers_1.Helpers.driverSleep(this.driver, 5 * 1000);
    });
});
cucumber_1.Then(/^The cart price is updated correctly for (.+)$/, function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        const productToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
        if (!productToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        const itemRow = yield this.driver.findElement(selenium_webdriver_1.By.xpath(cartPage.itemRowByISBN.replace('<ISBN>', productToPurchase.productISBN[0])));
        const priceEach = Number((yield (yield itemRow.findElement({ css: '.price-each' })).getText()).replace(/[^0-9\.]/g, ''));
        const cartTotal = (yield (yield helpers_1.Helpers.getElement(this.driver, '.totals .subtotal_figure')).getText()).replace(/[^0-9\.]/g, '');
        const discount = (yield (yield helpers_1.Helpers.getElement(this.driver, '#discount_figure')).getText()).replace(/[^0-9\.]/g, '');
        const orderTotal = (yield (yield helpers_1.Helpers.getElement(this.driver, '#grandtotal_figure')).getText()).replace(/[^0-9\.]/g, '');
        this.assert.equal(cartTotal, (priceEach * 2).toFixed(2));
        this.assert.equal(discount, priceEach.toFixed(2));
        this.assert.equal(orderTotal, priceEach.toFixed(2));
    });
});
cucumber_1.When(/^The following product types exist in the cart:$/, { timeout: 3 * 60 * 1000 }, function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsList = products.hashes();
        this.orderDetails.orderTotalItems = 0;
        this.orderDetails.orderTitles = [];
        this.orderDetails.orderIsbns = [];
        this.orderDetails.productTypes = [];
        this.orderDetails.productSKUlist = [];
        this.orderDetails.discountedOrder = false;
        for (const productInfo of productsList) {
            const product = productInfo['Product Type'];
            const prodToPurchase = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === product.toString());
            if (!prodToPurchase) {
                throw new Error('Unrecognised product type found:' + product);
            }
            const purchasableProduct = purchasableProducts[prodToPurchase.productType];
            if (!purchasableProduct) {
                console.log('- Product ' + product + ' is set to not purchasable');
            }
            else {
                this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(prodToPurchase.productISBN);
                this.orderDetails.productTypes.push(prodToPurchase.productType);
                for (let i = 0; i < prodToPurchase.productISBN.length; i++) {
                    this.orderDetails.orderTitles.push(prodToPurchase.productTitle);
                }
                this.orderDetails.orderTotalItems += prodToPurchase.productISBN.length;
                this.orderDetails.productSKUlist = this.orderDetails.productSKUlist.concat(prodToPurchase.productSKU);
                console.log('- Product ' + product + ' SKU code retrieved');
            }
        }
        if (this.scenarioTags.indexOf('@SDCheckoutE2E') > -1) {
            const skuString = '/?sku=' + this.orderDetails.productSKUlist.join('&sku=');
            yield this.driver.get(testData.getUrlFor().sd.cart + skuString);
        }
        else {
            const skuString = '/?SKU=' + this.orderDetails.productSKUlist.join('&SKU=');
            yield this.driver.get(testData.getUrlFor().elsevier.cart + skuString);
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 20 * 1000);
            const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
            this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
            console.log('All products are present in the cart');
        }
    });
});
cucumber_1.Given(/^I should see the price as (.*)$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pending');
    });
});
cucumber_1.Then(/^I should see the tax as (.*)$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pending');
    });
});
cucumber_1.When(/^I should see the quantity as (\d+)$/, function (_arg1) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(_arg1);
    });
});
cucumber_1.Then(/^I should see the item total as (.*)$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('pending');
    });
});
//# sourceMappingURL=cartFunctionalitySteps.js.map