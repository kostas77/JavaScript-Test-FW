import { defineStep } from 'cucumber';
// import { Helpers } from '../../common/support/helpers';
import * as visualTestData from '../support/testData';
import { Helpers } from '../../common/support/helpers';
import { TestData } from '../../features_global/support/testData';
import * as Configuration from 'config';
import { IProductToPurchase, IPurchasableProducts } from '../../common/support/interfaces';
import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { CheckoutPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage';
import { AuthorisationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage';
import { AccountPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage';

const testData = new TestData();
const authorisationPage = new AuthorisationPage(testData);
const accountPage = new AccountPage(testData);
const cartPage = new CartPage(testData);
const checkoutPage = new CheckoutPage();

let productList = [];
let sectionsList = [];
const purchasableProducts: IPurchasableProducts = Configuration.get<boolean>('purchasableProducts');

defineStep(/^I am logged in$/, async function (): Promise<void> {
    await authorisationPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
    let pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
    await authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
    await Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.contactInformationHeaderLocator, 5 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
});

defineStep(/^I navigate to the following (.+) product pages:$/, { timeout: 3 * 60 * 1000 }, async function (store, products): Promise<void> {
    productList = products.rows();
    if (store === 'GS') {
        this.appName = 'eCom global store';
    } else if (store === 'CK') {
        this.appName = 'CK store';
    }
    this.testName =  'Product pages';

    // Set high level batch
    await this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
    await this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);

    for (const row in productList) {
        const product = productList[row][0];
        // this.testName = `${visualTestData.testData[product].testName}:${this.osName}_${this.osVersion}-${this.browserName}`;
        // console.log(`Running test: ${this.testName}`);
        // this.appName = `${visualTestData.testData[product].appName}`;
        // console.log(`App name: ${this.appName}`);
        this.testUrl = `${visualTestData.testData[product].url}`;
        // console.log('this.usedViewport:', this.usedViewport);
        this.windowName = `${visualTestData.testData[product].testName}`;
        // console.log('this.windowName:', this.windowName);

        await this.driver.get(this.testUrl);

        await this.eyes.checkWindow(this.windowName);
    }
});


defineStep(/^The following product types exist in the cart:$/, { timeout: 3 * 60 * 1000 }, async function (products): Promise<void> {

    const productsList = products.hashes();
    this.appName = 'eCom global store';
    this.testName =  'Checkout flow';

    // Set high level batch
    await this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
    await this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);

    this.orderDetails.productSKUlist = [];
    this.orderDetails.discountedOrder = false;

    // Iterate through the products list
    for (const productInfo of productsList) {
        const product = productInfo['Product Type'];
        const prodToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === product.toString());
        if (!prodToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        const purchasableProduct: boolean = purchasableProducts[prodToPurchase.productType];
        if (!purchasableProduct) {
            console.log('- Product ' + product + ' is set to not purchasable');
        } else {
            this.orderDetails.productSKUlist = this.orderDetails.productSKUlist.concat(prodToPurchase.productSKU);
            console.log('- Product ' + product + ' SKU code retrieved');
        }
    }

    // Generate Cart URL with all products SKU codes
    if (this.scenarioTags.indexOf('@SDCheckoutE2E') > -1) { // TODO - Use store identifier instead of test tag (i.e. global, SD, USHS, etc.)
        const skuString = '/?sku=' + this.orderDetails.productSKUlist.join('&sku=');
        await this.driver.get(testData.getUrlFor().sd.cart + skuString);
    } else {
        const skuString = '/?SKU=' + this.orderDetails.productSKUlist.join('&SKU=');
        await this.driver.get(testData.getUrlFor().elsevier.cart + skuString);
        await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 20 * 1000);
        const pageTitle = await Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
        console.log('All products are present in the cart');
    }

    await this.eyes.checkWindow('Cart page');

});

defineStep(/^I proceed to the Global Store checkout page$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.proceedToCheckoutLocator, 10 * 1000);
    await Helpers.driverSleep(this.driver, 1000);
    await cartPage.clickProceedToCheckoutButton(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'clickable', checkoutPage.loginButtonLocator, 20 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected checkout page title not found');

    await this.eyes.checkWindow('Checkout page');

});

defineStep(/^I navigate to the CK home page sections:$/, { timeout: 3 * 60 * 1000 }, async function (sections): Promise<void> {
    sectionsList = sections.rows();
    this.appName = 'CK store';
    this.testName =  'Home page sections';

    // Set high level batch
    await this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
    await this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);

    for (const row in sectionsList) {
        const section = sectionsList[row][0];
        // this.testName = `${visualTestData.testData[product].testName}:${this.osName}_${this.osVersion}-${this.browserName}`;
        // console.log(`Running test: ${this.testName}`);
        // this.appName = `${visualTestData.testData[product].appName}`;
        // console.log(`App name: ${this.appName}`);
        this.testUrl = `${visualTestData.testData[section].url}`;
        // console.log('this.usedViewport:', this.usedViewport);
        this.windowName = `${visualTestData.testData[section].testName}`;
        // console.log('this.windowName:', this.windowName);

        await this.driver.get(this.testUrl);

        await this.eyes.checkWindow(this.windowName);
    }
});

defineStep(/^I navigate to the following (.+) account pages:$/, { timeout: 4 * 60 * 1000 }, async function (store, sections): Promise<void> {
    productList = sections.rows();
    if (store === 'GS') {
        this.appName = 'eCom global store';
    } else if (store === 'CK') {
        this.appName = 'CK store';
    }
    this.testName =  'My Account pages';

    // Set high level batch
    await this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
    await this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);

    for (const row in productList) {
        const product = productList[row][0];
        // this.testName = `${visualTestData.testData[product].testName}:${this.osName}_${this.osVersion}-${this.browserName}`;
        // console.log(`Running test: ${this.testName}`);
        // this.appName = `${visualTestData.testData[product].appName}`;
        // console.log(`App name: ${this.appName}`);
        this.testUrl = `${visualTestData.testData[product].url}`;
        // console.log('this.usedViewport:', this.usedViewport);
        this.windowName = `${visualTestData.testData[product].testName}`;
        // console.log('this.windowName:', this.windowName);

        await this.driver.get(this.testUrl);

        await this.eyes.checkWindow(this.windowName);
    }
});

defineStep(/^I navigate to the Elsevier home page sections:$/, { timeout: 3 * 60 * 1000 }, async function (sections): Promise<void> {
    sectionsList = sections.rows();
    this.appName = 'ELCM';
    this.testName =  'Home page sections';

    // Set high level batch
    await this.eyes.setBatch(process.env.APPLITOOLS_BATCH_NAME, process.env.APPLITOOLS_BATCH_ID);
    await this.eyes.open(this.driver, this.appName, this.testName, this.usedViewport);

    for (const row in sectionsList) {
        const section = sectionsList[row][0];
        // this.testName = `${visualTestData.testData[product].testName}:${this.osName}_${this.osVersion}-${this.browserName}`;
        // console.log(`Running test: ${this.testName}`);
        // this.appName = `${visualTestData.testData[product].appName}`;
        // console.log(`App name: ${this.appName}`);
        this.testUrl = `${visualTestData.testData[section].url}`;
        // console.log('this.usedViewport:', this.usedViewport);
        this.windowName = `${visualTestData.testData[section].testName}`;
        // console.log('this.windowName:', this.windowName);

        await this.driver.get(this.testUrl);

        await this.eyes.checkWindow(this.windowName);
    }
});

defineStep('The pages are displayed as expected', { timeout: 2 * 60 * 1000 }, async function () {
    await this.finaliseVisualTest(this.testName);
});
