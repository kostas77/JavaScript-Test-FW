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
const visualTestData = require("../support/testData");
const helpers_1 = require("../../common/support/helpers");
const testData_1 = require("../../features_global/support/testData");
const Configuration = require("config");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const checkoutPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage");
const authorisationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage");
const accountPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage");
const testData = new testData_1.TestData();
const authorisationPage = new authorisationPage_1.AuthorisationPage(testData);
const accountPage = new accountPage_1.AccountPage(testData);
const cartPage = new cartPage_1.CartPage(testData);
const checkoutPage = new checkoutPage_1.CheckoutPage();
let productList = [];
let sectionsList = [];
const purchasableProducts = Configuration.get('purchasableProducts');
cucumber_1.Given(/^I am logged in$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield authorisationPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
        let pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
        yield authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.contactInformationHeaderLocator, 5 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
    });
});
cucumber_1.When(/^I navigate to the following (.+) product pages:$/, { timeout: 3 * 60 * 1000 }, function (store, products) {
    return __awaiter(this, void 0, void 0, function* () {
        productList = products.rows();
        if (store === 'GS') {
            this.appName = 'eCom global store';
        }
        else if (store === 'CK') {
            this.appName = 'CK store';
        }
        this.testName = 'Product pages';
        yield this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);
        for (const row in productList) {
            const product = productList[row][0];
            this.testUrl = `${visualTestData.testData[product].url}`;
            this.windowName = `${visualTestData.testData[product].testName}`;
            yield this.driver.get(this.testUrl);
            yield this.eyes.checkWindow(this.windowName);
        }
    });
});
cucumber_1.When(/^The following product types exist in the cart:$/, { timeout: 3 * 60 * 1000 }, function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsList = products.hashes();
        this.appName = 'eCom global store';
        this.testName = 'Checkout flow';
        yield this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);
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
        yield this.eyes.checkWindow('Cart page');
    });
});
cucumber_1.When(/^I proceed to the Global Store checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.proceedToCheckoutLocator, 10 * 1000);
        yield helpers_1.Helpers.driverSleep(this.driver, 1000);
        yield cartPage.clickProceedToCheckoutButton(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.loginButtonLocator, 20 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected checkout page title not found');
        yield this.eyes.checkWindow('Checkout page');
    });
});
cucumber_1.When(/^I navigate to the CK home page sections:$/, { timeout: 3 * 60 * 1000 }, function (sections) {
    return __awaiter(this, void 0, void 0, function* () {
        sectionsList = sections.rows();
        this.appName = 'CK store';
        this.testName = 'Home page sections';
        yield this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);
        for (const row in sectionsList) {
            const section = sectionsList[row][0];
            this.testUrl = `${visualTestData.testData[section].url}`;
            this.windowName = `${visualTestData.testData[section].testName}`;
            yield this.driver.get(this.testUrl);
            yield this.eyes.checkWindow(this.windowName);
        }
    });
});
cucumber_1.When(/^I navigate to the following (.+) account pages:$/, { timeout: 4 * 60 * 1000 }, function (store, sections) {
    return __awaiter(this, void 0, void 0, function* () {
        productList = sections.rows();
        if (store === 'GS') {
            this.appName = 'eCom global store';
        }
        else if (store === 'CK') {
            this.appName = 'CK store';
        }
        this.testName = 'My Account pages';
        yield this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);
        for (const row in productList) {
            const product = productList[row][0];
            this.testUrl = `${visualTestData.testData[product].url}`;
            this.windowName = `${visualTestData.testData[product].testName}`;
            yield this.driver.get(this.testUrl);
            yield this.eyes.checkWindow(this.windowName);
        }
    });
});
cucumber_1.When(/^I navigate to the Elsevier home page sections:$/, { timeout: 3 * 60 * 1000 }, function (sections) {
    return __awaiter(this, void 0, void 0, function* () {
        sectionsList = sections.rows();
        this.appName = 'ELCM';
        this.testName = 'Home page sections';
        yield this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
        yield this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);
        for (const row in sectionsList) {
            const section = sectionsList[row][0];
            this.testUrl = `${visualTestData.testData[section].url}`;
            this.windowName = `${visualTestData.testData[section].testName}`;
            yield this.driver.get(this.testUrl);
            yield this.eyes.checkWindow(this.windowName);
        }
    });
});
cucumber_1.Then('The pages are displayed as expected', { timeout: 2 * 60 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.finaliseVisualTest(this.testName);
    });
});
//# sourceMappingURL=globalStoreSteps.js.map