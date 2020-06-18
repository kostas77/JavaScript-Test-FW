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
const cartPage_1 = require("../../common/pages/GlobalStoreCheckout/cartPage");
const checkoutPage_1 = require("../../common/pages/GlobalStoreCheckout/checkoutPage");
const testData_1 = require("../support/testData");
const addressesData_1 = require("../../common/support/addressesData");
const Configuration = require("config");
const selenium_webdriver_1 = require("selenium-webdriver");
const elsevierECapturePage_1 = require("../../common/pages/eCapture/elsevierECapturePage");
const authorisationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage");
const testData = new testData_1.TestData();
const gscCartPage = new cartPage_1.GscCartPage(testData);
const checkoutPage = new checkoutPage_1.CheckoutPage();
const purchasableProducts = Configuration.get('purchasableProducts');
const globalStoreCheckoutUrl = Configuration.get('globalStoreCheckout.url');
const eCapturePage = new elsevierECapturePage_1.ElsevierECapturePage();
const authorisationPage = new authorisationPage_1.AuthorisationPage(testData);
cucumber_1.When(/^I add the following product types directly to the cart in global store checkout:$/, { timeout: 7 * 60 * 1000 }, function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsList = products.hashes();
        this.orderDetails.orderTotalItems = 0;
        this.orderDetails.productTypes = [];
        this.orderDetails.orderTitles = [];
        this.orderDetails.orderIsbns = [];
        this.orderDetails.discountedOrder = false;
        for (const productInfo of productsList) {
            const { 'Product Type': productType } = productInfo;
            const productToPurchase = getProductToPurchase(productType);
            if (!isPurchasable(productToPurchase)) {
                console.log('- Product ' + productType + ' is set to not purchasable');
                continue;
            }
            console.log(`- Adding ${productType} to the cart`);
            yield this.driver.get(`${globalStoreCheckoutUrl}?sku=${productToPurchase.productSKU.join(',').replace(/(SKU-[0-9]{4})-([0-9]{4}-(?:IN|PP))/g, '$1$2')}`);
            yield this.driver.saveScreenshot(productType);
            yield helpers_1.Helpers.waitUntilElementLocatedBy(this.driver, selenium_webdriver_1.By.xpath, `//a[contains(text(),"${productToPurchase.productTitle.replace(/ - [0-9] Year Subscription$/, '')}")]`, 1000);
            this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(productToPurchase.productISBN);
            this.orderDetails.productTypes.push(productToPurchase.productType);
            for (let i = 0; i < productToPurchase.productISBN.length; i++) {
                this.orderDetails.orderTitles.push(productToPurchase.productTitle);
            }
            this.orderDetails.orderTotalItems += productToPurchase.productISBN.length;
        }
    });
});
cucumber_1.When(/^I change my delivery country to ([A-Z]{2})$/, function (country) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.driver.get(`${globalStoreCheckoutUrl}?country=${country}`);
        const element = yield this.driver.findElement(selenium_webdriver_1.By.id('country-select'));
        const value = yield element.getAttribute('value');
        this.assert.equal(value, country, `Expected the Shipping Country select to have '${country}' selected, actual selection was '${value}'`);
        this.customerDetails.countryCode = country;
    });
});
cucumber_1.When(/^I proceed to the global store checkout page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield gscCartPage.clickProceedToCheckoutButton(this.driver);
        const currentUrl = yield this.driver.getCurrentUrl();
        this.assert.equal(currentUrl, `${globalStoreCheckoutUrl}checkout`);
    });
});
cucumber_1.When(/^I login into my account$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield gscCartPage.selectLoginLink(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
        let pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
        yield authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', gscCartPage.continueShoppingLocator, 5 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, gscCartPage.pageTitle, 'Expected Cart page title not found');
    });
});
cucumber_1.Then(/^My details are already prefilled$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const firstName = yield checkoutPage.shippingFirstName(this.driver);
        const lastName = yield checkoutPage.shippingLastName(this.driver);
        const street1 = yield checkoutPage.shippingStreet1(this.driver);
        const street2 = yield checkoutPage.shippingStreet2(this.driver);
        const city = yield checkoutPage.shippingCity(this.driver);
        const postcode = yield checkoutPage.shippingPostcode(this.driver);
        const region = yield checkoutPage.shippingRegion(this.driver);
        const country = yield checkoutPage.shippingCountry(this.driver);
        const phone = yield checkoutPage.shippingPhone(this.driver);
        this.assert.equal(yield firstName.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.firstName);
        this.assert.equal(yield lastName.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.lastName);
        this.assert.equal(yield street1.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.address1);
        this.assert.equal(yield street2.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.address2);
        this.assert.equal(yield city.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.city);
        this.assert.equal(yield postcode.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.postcode);
        this.assert.equal(yield region.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.region);
        this.assert.equal(yield country.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.countryShort);
        this.assert.equal(yield phone.getAttribute('value'), addressesData_1.addresses[this.customerDetails.countryCode].shipping.telephone);
    });
});
cucumber_1.When(/^I store the order and cart prices$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.orderTotalPrice = yield (yield this.driver.findElement(selenium_webdriver_1.By.css('.checkout-grandTotal .money')).getText()).replace(/^\D+/g, '').replace(/,/g, '');
        this.orderDetails.taxPrice = yield (yield this.driver.findElement(selenium_webdriver_1.By.css('.checkout-taxes .money')).getText()).replace(/^\D+/g, '').replace(/,/g, '');
        this.orderDetails.cartTotalPrice = yield (yield this.driver.findElement(selenium_webdriver_1.By.css('.checkout-sub-total .money')).getText()).replace(/^\D+/g, '').replace(/,/g, '');
    });
});
cucumber_1.When(/^I click on the checkout button in checkout$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 3000);
        const element = yield this.driver.findElement(selenium_webdriver_1.By.css('.checkout-proceed'));
        yield element.click();
    });
});
cucumber_1.When(/^I enter my shipping address details in global store checkout$/, { timeout: 120 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.enterText(this.driver, 'input[name="customer[email]"]', this.customerDetails.emailAddress);
        const { shipping } = addressesData_1.addresses[this.customerDetails.countryCode];
        yield fillOutAddress(this.driver, 'shipping', shipping);
    });
});
cucumber_1.When(/^I enter my billing address details in global store checkout$/, { timeout: 120 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const { billing } = addressesData_1.addresses[this.customerDetails.countryCode];
        yield fillOutAddress(this.driver, 'billing', billing);
    });
});
cucumber_1.When(/^I have different shipping and billing addresses$/, { timeout: 120 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.clickElement(this.driver, '#billing_shipping_same');
    });
});
cucumber_1.When(/^I accept the terms and conditions$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.jsScrollToElementAlignTop(this.driver, yield helpers_1.Helpers.getElement(this.driver, '#accept-t-and-c'));
        yield helpers_1.Helpers.clickElement(this.driver, '#accept-t-and-c');
    });
});
cucumber_1.When(/^I continue to pay using a ([a-z]+) in global store checkout$/, function (paymentType) {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
        yield eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
    });
});
cucumber_1.When(/^eCapture is successful for global store checkout$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', '.order-number', 60 * 1000);
        const orderNumberText = yield (yield this.driver.findElement(selenium_webdriver_1.By.className('order-number'))).getText();
        const orderNumber = orderNumberText.match(/[a-z]+[0-9]+/i)[0];
        console.log('- Thank you message displayed - Order no:', orderNumber);
        this.orderDetails.orderNumberText = orderNumber;
        const emailAddress = yield (yield this.driver.findElement(selenium_webdriver_1.By.className('email'))).getText();
        this.assert.equal(emailAddress.toLowerCase(), this.customerDetails.emailAddress, 'Expected email address not found');
        yield helpers_1.Helpers.driverSleep(this.driver, 3 * 1000);
    });
});
const getProductToPurchase = (productType) => {
    const purchasableProduct = testData.getProductDataFor()
        .productsToPurchase
        .find(currentProduct => currentProduct.productName === productType.toString());
    if (!purchasableProduct) {
        throw new Error('Unrecognised product type found:' + productType);
    }
    return purchasableProduct;
};
const isPurchasable = (productToPurchase) => {
    return !!purchasableProducts[productToPurchase.productType];
};
const fillOutAddress = (driver, type, address) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, address1, address2, city, region, postcode, countryShort, telephone } = address;
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][firstName]"]`, firstName);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][lastName]"]`, lastName);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][street2]"]`, address2);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][city]"]`, city);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][postcode]"]`, postcode);
    yield (yield helpers_1.Helpers.getElement(driver, `input[name="addresses[${type}][postcode]"]`)).sendKeys(selenium_webdriver_1.Key.TAB);
    yield (yield helpers_1.Helpers.getElement(driver, `select[name="addresses[${type}][country]"]` + '>option[value="' + countryShort + '"]')).click();
    yield helpers_1.Helpers.driverSleep(driver, 1000);
    yield helpers_1.Helpers.enterText(driver, `select[name="addresses[${type}][region]"]`, region, false);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][phone]"]`, telephone);
    yield helpers_1.Helpers.enterText(driver, `input[name="addresses[${type}][street1]"]`, address1);
    yield (yield helpers_1.Helpers.getElement(driver, `input[name="addresses[${type}][street1]"]`)).sendKeys(selenium_webdriver_1.Key.TAB);
});
//# sourceMappingURL=globalStoreCheckoutE2ESteps.js.map