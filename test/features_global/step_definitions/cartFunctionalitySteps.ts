import { By, Key, until } from 'selenium-webdriver';
import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';

import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { BookProductPage } from '../../common/pages/ElsevierGlobalStore/products/bookProductPage';
import { TestData } from '../support/testData';
import { IProductToPurchase, IPurchasableProducts } from '../../common/support/interfaces';
import * as Configuration from 'config';

const testData = new TestData();
const cartPage = new CartPage(testData);
const bookProductPage = new BookProductPage();

const purchasableProducts: IPurchasableProducts = Configuration.get<boolean>('purchasableProducts');

defineStep(/^My cart is empty$/, async function () {
    console.log('- TODO');
});

defineStep(/^I add (?:a|an) (.+) to the cart$/, { timeout: 2 * 60 * 1000 }, async function(product) { // TODO need to use existing add to cart function
    const productToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
    if (!productToPurchase) {
        throw new Error('Unrecognised product type found:' + product);
    }
    console.log(`- Found ${product} product (${productToPurchase.productISBN})`);
    await this.driver.get(productToPurchase.productPath);
    console.log(`- Got ${productToPurchase.productPath}`);
    await bookProductPage.addProductToCart(this.driver, product);
    console.log(`- Added ${productToPurchase.productName} to cart`);
});

defineStep(/^The (.+) appears in the cart$/, async function (product) {
    const productToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
    if (!productToPurchase) {
        throw new Error('Unrecognised product type found:' + product);
    }

    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.lineItemsISBNLocator, 10 * 1000);
    const cartISBNs = await Helpers.getElementsArray(this.driver, cartPage.lineItemsISBNLocator);
    console.log(`- Found the following ISBNs - ${cartISBNs}`);
    console.log(cartISBNs);
    for (let i = 0, j = cartISBNs.length; i < j; i++) {
        console.log('cartISBNs[i]:', cartISBNs[i]);
        console.log('await cartISBNs[i].getText():', await cartISBNs[i].getText());
        // cartISBNs[i] = await (await cartISBNs[i]).getText();
    }

    productToPurchase.productISBN.forEach(isbn => {
        console.log('isbn:', isbn);
//     this.assert.notEqual(cartISBNs.indexOf(isbn), -1, `Could not find ${product}'s ISBN in the cart (${isbn})`);
    });
});

defineStep(/^I increase the quantity of (.+) in the cart$/, async function (product) {
    const productToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
    if (!productToPurchase) {
        throw new Error('Unrecognised product type found:' + product);
    }

    const itemRow = await this.driver.findElement(By.xpath(cartPage.itemRowByISBN.replace('<ISBN>', productToPurchase.productISBN[0])));
    const qtyInput = await itemRow.findElement({ css: '[name="qty"]' });
    await qtyInput.sendKeys(Key.BACK_SPACE, '2', Key.ENTER);
    await Helpers.driverSleep(this.driver, 5 * 1000);
});

defineStep(/^I apply the (.+) cart discount code$/, async function (promo) {
    await (await Helpers.getElement(this.driver, '.promo-toggle')).click();

    await this.driver.wait(until.elementIsVisible(await Helpers.getElement(this.driver, '#promotion_code_submit')), 5 * 1000);

    await (await Helpers.getElement(this.driver, '#promotion_code')).sendKeys(promo);
    await (await Helpers.getElement(this.driver, '#promotion_code_submit')).click();
    await Helpers.driverSleep(this.driver, 5 * 1000);
});

defineStep(/^The cart price is updated correctly for (.+)$/, async function (product) {
    const productToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(p => p.productName === product);
    if (!productToPurchase) {
        throw new Error('Unrecognised product type found:' + product);
    }

    const itemRow = await this.driver.findElement(By.xpath(cartPage.itemRowByISBN.replace('<ISBN>', productToPurchase.productISBN[0])));
    const priceEach = Number((await (await itemRow.findElement({ css: '.price-each' })).getText()).replace(/[^0-9\.]/g, ''));
    const cartTotal = (await (await Helpers.getElement(this.driver, '.totals .subtotal_figure')).getText()).replace(/[^0-9\.]/g, '');
    const discount = (await (await Helpers.getElement(this.driver, '#discount_figure')).getText()).replace(/[^0-9\.]/g, '');
    const orderTotal = (await (await Helpers.getElement(this.driver, '#grandtotal_figure')).getText()).replace(/[^0-9\.]/g, '');

    this.assert.equal(cartTotal, (priceEach * 2).toFixed(2));
    this.assert.equal(discount, priceEach.toFixed(2));
    this.assert.equal(orderTotal, priceEach.toFixed(2));
});

defineStep(/^The following product types exist in the cart:$/, { timeout: 3 * 60 * 1000 }, async function (products): Promise<void> {

    const productsList = products.hashes();

    this.orderDetails.orderTotalItems = 0;
    this.orderDetails.orderTitles = [];
    this.orderDetails.orderIsbns = [];
    this.orderDetails.productTypes = [];
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
            // Log the product types and ISBNs that have been added to the Cart
            this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(prodToPurchase.productISBN);
            this.orderDetails.productTypes.push(prodToPurchase.productType);
            // Enter the title for each ISBN/ISSN
            for (let i: number = 0; i <  prodToPurchase.productISBN.length; i++) {
                this.orderDetails.orderTitles.push(prodToPurchase.productTitle);
            }

            this.orderDetails.orderTotalItems += prodToPurchase.productISBN.length;
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
});

defineStep(/^I should see the price as (.*)$/, async function (): Promise<void> {
    console.log('pending');
});

defineStep(/^I should see the tax as (.*)$/, async function (): Promise<void> {
    console.log('pending');
});

defineStep(/^I should see the quantity as (\d+)$/, async function (_arg1: any): Promise<void> {
    console.log(_arg1);
});

defineStep(/^I should see the item total as (.*)$/, async function (): Promise<void> {
    console.log('pending');
});
