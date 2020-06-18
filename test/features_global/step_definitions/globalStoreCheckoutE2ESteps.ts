import { defineStep } from 'cucumber';
import { By, Key, WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../common/support/helpers';

import { GscCartPage } from '../../common/pages/GlobalStoreCheckout/cartPage';
import { GscCheckoutPage } from '../../common/pages/GlobalStoreCheckout/checkoutPage';
import { TestData } from '../support/testData';
import { addresses, Address } from '../../common/support/addressesData';
import { IProductToPurchase, IPurchasableProducts } from '../../common/support/interfaces';
import * as Configuration from 'config';
import { ElsevierECapturePage } from '../../common/pages/eCapture/elsevierECapturePage';
import { AuthorisationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage';

const testData = new TestData();
const gscCartPage = new GscCartPage(testData);
const checkoutPage = new GscCheckoutPage();

const purchasableProducts: IPurchasableProducts = Configuration.get<boolean>('purchasableProducts');
const globalStoreCheckoutUrl: string = Configuration.get('globalStoreCheckout.url');
const eCapturePage = new ElsevierECapturePage();
const authorisationPage = new AuthorisationPage(testData);

defineStep(/^I add the following product types directly to the cart in global store checkout:$/, { timeout: 7 * 60 * 1000 }, async function (products): Promise<void> {

    // Get the products list from the Cucumber test definition table
    const productsList = products.hashes();

    this.orderDetails.orderTotalItems = 0;
    this.orderDetails.productTypes = [];
    this.orderDetails.orderTitles = [];
    this.orderDetails.orderIsbns = [];
    this.orderDetails.discountedOrder = false;

    // Iterate through the products list
    for (const productInfo of productsList) {
        const { /*'Quantity': quantity,*/ 'Product Type': productType } = productInfo;

        const productToPurchase: IProductToPurchase = getProductToPurchase(productType);

        if (!isPurchasable(productToPurchase)) {
            console.log('- Product ' + productType + ' is set to not purchasable');
            continue;
        }

        console.log(`- Adding ${productType} to the cart`);

        await this.driver.get(`${globalStoreCheckoutUrl}?sku=${productToPurchase.productSKU.join(',').replace(/(SKU-[0-9]{4})-([0-9]{4}-(?:IN|PP))/g, '$1$2')}`);

        await this.driver.saveScreenshot(productType);

        await Helpers.waitUntilElementLocatedBy(this.driver, By.xpath, `//a[contains(text(),"${productToPurchase.productTitle.replace(/ - [0-9] Year Subscription$/, '')}")]`, 1000);

        this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(productToPurchase.productISBN);
        this.orderDetails.productTypes.push(productToPurchase.productType);
        for (let i: number = 0; i < productToPurchase.productISBN.length; i++) {
            this.orderDetails.orderTitles.push(productToPurchase.productTitle);
        }
        this.orderDetails.orderTotalItems += productToPurchase.productISBN.length;
    }
});

defineStep(/^I change my delivery country to ([A-Z]{2})$/, async function (country) {
    await this.driver.get(`${globalStoreCheckoutUrl}?country=${country}`);

    const element = await this.driver.findElement(By.id('country-select'));
    const value = await element.getAttribute('value');

    this.assert.equal(
        value,
        country,
        `Expected the Shipping Country select to have '${country}' selected, actual selection was '${value}'`
    );

    this.customerDetails.countryCode = country;
});

defineStep(/^I proceed to the global store checkout page$/, async function () {
    await gscCartPage.clickProceedToCheckoutButton(this.driver);
    const currentUrl = await this.driver.getCurrentUrl();
    this.assert.equal(currentUrl, `${globalStoreCheckoutUrl}checkout`, 'Expected GS checkout page title not found');
});

defineStep(/^I login into my account$/, async function(): Promise<void> {
    await gscCartPage.selectLoginLink(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
    let pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
    await authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
    await Helpers.waitUntilElementHasState(this.driver, 'located', gscCartPage.continueShoppingLocator, 5 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, gscCartPage.pageTitle, 'Expected Cart page title not found');
});

defineStep(/^My details are already prefilled$/, async function(): Promise<void> {
    const firstName = await checkoutPage.shippingFirstName(this.driver);
    const lastName = await checkoutPage.shippingLastName(this.driver);
    const street1 = await checkoutPage.shippingStreet1(this.driver);
    const street2 = await checkoutPage.shippingStreet2(this.driver);
    const city = await checkoutPage.shippingCity(this.driver);
    const postcode = await checkoutPage.shippingPostcode(this.driver);
    const region = await checkoutPage.shippingRegion(this.driver);
    const country = await checkoutPage.shippingCountry(this.driver);
    const phone = await checkoutPage.shippingPhone(this.driver);

    this.assert.equal(await firstName.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.firstName);
    this.assert.equal(await lastName.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.lastName);
    this.assert.equal(await street1.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.address1);
    this.assert.equal(await street2.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.address2);
    this.assert.equal(await city.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.city);
    this.assert.equal(await postcode.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.postcode);
    this.assert.equal(await region.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.region);
    this.assert.equal(await country.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.countryShort);
    this.assert.equal(await phone.getAttribute('value'), addresses[this.customerDetails.countryCode].shipping.telephone);

    const billingFirstName = await checkoutPage.billingFirstName(this.driver);
    const billingLastName = await checkoutPage.billingLastName(this.driver);
    const billingStreet1 = await checkoutPage.billingStreet1(this.driver);
    const billingStreet2 = await checkoutPage.billingStreet2(this.driver);
    const billingCity = await checkoutPage.billingCity(this.driver);
    const billingPostcode = await checkoutPage.billingPostcode(this.driver);
    const billingRegion = await checkoutPage.billingRegion(this.driver);
    const billingCountry = await checkoutPage.billingCountry(this.driver);
    const billingPhone = await checkoutPage.billingPhone(this.driver);

    this.assert.equal(await billingFirstName.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.firstName);
    this.assert.equal(await billingLastName.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.lastName);
    this.assert.equal(await billingStreet1.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.address1);
    this.assert.equal(await billingStreet2.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.address2);
    this.assert.equal(await billingCity.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.city);
    this.assert.equal(await billingPostcode.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.postcode);
    this.assert.equal(await billingRegion.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.region);
    this.assert.equal(await billingCountry.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.countryShort);
    this.assert.equal(await billingPhone.getAttribute('value'), addresses[this.customerDetails.countryCode].billing.telephone);

});

defineStep(/^I store the order and cart prices$/, async function() {
    await Helpers.driverSleep(this.driver, 4 * 1000); // Wait for the total tax value to be calculated
    this.orderDetails.cartTotalPrice = await Helpers.getCleanPrice(await (await checkoutPage.subTotalPrice(this.driver)).getText());
    console.log(`- Subtotal: ${this.orderDetails.cartTotalPrice}`);
    // TODO - This can be enabled when the discount from GSC appears correctly in ORR - https://jira.cbsels.com/browse/ELSEC-3160
    // if (this.orderDetails.discountedOrder) {
    //     this.orderDetails.discountPrice = await Helpers.getCleanPrice(await (await checkoutPage.discountPrice(this.driver)).getText());
    //     console.log(`- Discount: ${this.orderDetails.discountPrice}`);
    //     this.assert.isAbove(Number(this.orderDetails.discountPrice), 0.00, 'Discount amount should be greater than 0');
    // }
    this.orderDetails.taxPrice = await Helpers.getCleanPrice(await (await checkoutPage.taxPrice(this.driver)).getText());
    console.log(`- Tax: ${this.orderDetails.taxPrice}`);
    if (this.customerDetails.countryCode !== 'JP') {
        this.assert.isAbove(Number(this.orderDetails.taxPrice), 0.00, 'Tax amount should be greater than 0');
    }
    this.orderDetails.orderTotalPrice = await Helpers.getCleanPrice(await (await checkoutPage.orderTotalPrice(this.driver)).getText());
    console.log(`- Order total: ${this.orderDetails.orderTotalPrice}`);
});

defineStep(/^I click on the checkout button in checkout$/, async function () {
    await Helpers.driverSleep(this.driver, 3000);
    const element = await this.driver.findElement(By.css('.checkout-proceed'));
    await element.click();
});

defineStep(/^I enter my shipping address details in global store checkout$/, { timeout: 120 * 1000 }, async function() {
    await Helpers.enterText(this.driver, 'input[name="customer[email]"]', this.customerDetails.emailAddress);
    const { shipping } = addresses[this.customerDetails.countryCode];
    await fillOutAddress(this.driver, 'shipping', shipping);
    // await this.driver.saveScreenshot('shipping');
});

defineStep(/^I enter my billing address details in global store checkout$/, { timeout: 120 * 1000 }, async function() {
    const { billing } = addresses[this.customerDetails.countryCode];
    await fillOutAddress(this.driver, 'billing', billing);
    // await this.driver.saveScreenshot('billing');
});

defineStep(/^I have different shipping and billing addresses$/, { timeout: 120 * 1000 }, async function() {
    await Helpers.clickElement(this.driver, '#billing_shipping_same');
    // await this.driver.saveScreenshot('billingShippingSame');
});

defineStep(/^I accept the terms and conditions$/, async function() {
    await Helpers.jsScrollToElementAlignTop(this.driver, await Helpers.getElement(this.driver, '#accept-t-and-c'));
    await Helpers.clickElement(this.driver, '#accept-t-and-c');
    // await this.driver.saveScreenshot('AcceptT&C');
});

defineStep(/^I continue to pay using a ([a-z]+) in global store checkout$/, async function (paymentType: string): Promise<void> {
    await Helpers.waitUntilPageTitleIs(this.driver, eCapturePage.pageTitle, 30 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', eCapturePage.submitButtonLocator, 10 * 1000);
    await eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, paymentType);
});

defineStep(/^eCapture is successful for global store checkout$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', '.order-number', 60 * 1000);
    const orderNumberText = await (await this.driver.findElement(By.className('order-number'))).getText();
    const orderNumber = orderNumberText.match(/[a-z]+[0-9]+/i)[0];
    console.log('- Thank you message displayed - Order no:', orderNumber);
    this.orderDetails.orderNumberText = orderNumber;
    const emailAddress = await (await this.driver.findElement(By.className('email'))).getText();
    this.assert.equal(emailAddress.toLowerCase(), this.customerDetails.emailAddress, 'Expected email address not found');

    // TODO - Need to have a good waiting method here for the order to make it in the Order History
    await Helpers.driverSleep(this.driver, 3 * 1000);
});

const getProductToPurchase = (productType: string): IProductToPurchase => {
    const purchasableProduct: IProductToPurchase = testData.getProductDataFor()
        .productsToPurchase
        .find(currentProduct => currentProduct.productName === productType.toString());

    if (!purchasableProduct) {
        throw new Error('Unrecognised product type found:' + productType);
    }

    return purchasableProduct;
};

const isPurchasable = (productToPurchase: IProductToPurchase): boolean => {
    return !!purchasableProducts[productToPurchase.productType];
};

const fillOutAddress = async (driver: WebDriver, type: string, address: Address): Promise<void> => {
    const {
        firstName,
        lastName,
        address1,
        address2,
        city,
        region,
        postcode,
        countryShort,
        telephone
    } = address;

    await Helpers.enterText(driver, `input[name="addresses[${type}][firstName]"]`, firstName);
    await Helpers.enterText(driver, `input[name="addresses[${type}][lastName]"]`, lastName);
    await Helpers.enterText(driver, `input[name="addresses[${type}][street2]"]`, address2);
    await Helpers.enterText(driver, `input[name="addresses[${type}][city]"]`, city);
    await Helpers.enterText(driver, `input[name="addresses[${type}][postcode]"]`, postcode);
    await (await Helpers.getElement(driver, `input[name="addresses[${type}][postcode]"]`)).sendKeys(Key.TAB);
    await (await Helpers.getElement(driver, `select[name="addresses[${type}][country]"]` + '>option[value="' + countryShort + '"]')).click();
    await Helpers.driverSleep(driver, 1000);
    await Helpers.enterText(driver,  `select[name="addresses[${type}][region]"]`, region, false);
    await Helpers.enterText(driver, `input[name="addresses[${type}][phone]"]`, telephone);
    // Do this last because of the address auto completion 🤦🏼‍♂️
    await Helpers.enterText(driver, `input[name="addresses[${type}][street1]"]`, address1);
    await (await Helpers.getElement(driver, `input[name="addresses[${type}][street1]"]`)).sendKeys(Key.TAB);

};
