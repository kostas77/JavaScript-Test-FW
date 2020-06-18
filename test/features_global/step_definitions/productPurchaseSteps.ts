import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';

import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { BookProductPage } from '../../common/pages/ElsevierGlobalStore/products/bookProductPage';
import { JournalProductPage } from '../../common/pages/ElsevierGlobalStore/products/journalProductPage';
import { ArticleChoiceHomePage } from '../../common/pages/ElsevierGlobalStore/products/articleChoiceHomePage';
import { TestData } from '../support/testData';
import { IProductToPurchase, IPurchasableProducts } from '../../common/support/interfaces';
import * as Configuration from 'config';
import { DriverConfig } from '../support/driverConfig';

const config = new DriverConfig();
const testData = new TestData();
const cartPage = new CartPage(testData);
const bookProductPage = new BookProductPage();
const journalProductPage = new JournalProductPage();
const articleChoiceHomePage = new ArticleChoiceHomePage(testData);

const purchasableProducts: IPurchasableProducts = Configuration.get<boolean>('purchasableProducts');

defineStep(/^I add the following product types in the cart:$/, { timeout: 7 * 60 * 1000 }, async function (products): Promise<void> {

    // Get the products list from the Cucumber test definition table
    const productsList = products.hashes();

    this.orderDetails.orderTotalItems = 0;
    this.orderDetails.productTypes = [];
    this.orderDetails.orderTitles = [];
    this.orderDetails.orderIsbns = [];
    this.orderDetails.discountedOrder = false;

    // Iterate through the products list
    for (const productInfo of productsList) {
        const quantity = productInfo['Quantity'];
        const product = productInfo['Product Type'];

        const prodToPurchase: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === product.toString());
        if (!prodToPurchase) {
            throw new Error('Unrecognised product type found:' + product);
        }
        if (prodToPurchase.bundleFlag) {
            this.orderDetails.discountedOrder = true;
        }
        const purchasableProduct: boolean = purchasableProducts[prodToPurchase.productType];
        if (!purchasableProduct) {
            console.log('- Product ' + product + ' is set to not purchasable');
        } else {
            console.log(`- Adding ${product} to the cart`);
            const productType: string = prodToPurchase.productType;
            const productCategory: string = prodToPurchase.productCategory;
            const productPath: string = prodToPurchase.productPath;

            // Go to the product's URL & add the product in the cart
            await this.driver.get(productPath);

            if (productCategory === 'book') {
                await Helpers.waitUntilElementHasState(this.driver, 'visible', bookProductPage.mainTitleLocator, 5 * 1000);
                if (config.browserName !== 'ie') {
                    await Helpers.removeSurveyPopupElement(this.driver);
                }
                if (this.scenarioTags.indexOf('@TaxDisplayE2E') > -1) {
                    this.discountMultiplier = 1;
                    try {
                        const promoDiscount = await Helpers.getElement(this.driver, '.print-format .slash-price-description:not(.hide)');
                        if (promoDiscount) {
                            const discountText = await (promoDiscount.getText());
                            console.log(`- Discount found, product has ${discountText}, adjustments will be made`);
                            this.discountMultiplier = 1 - (Number(discountText.replace(/\D/g, '')) / 100);
                        }
                    } catch (err) {
                        if (!err.name || err.name !== 'NoSuchElementError') {
                            throw new Error(err);
                        }
                    }
                }
                await bookProductPage.selectCountry(this.driver, this.customerDetails.countryCode);
                await bookProductPage.addProductToCart(this.driver, product.toString());
                // Validate that the price in the Product Page is the same as the price in the Cart
                let productCartPriceText = '';
                let productCartPrice = 0;
                if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    if (this.customerDetails.countryCode === 'US' || productType === 'printBook') {
                        productCartPriceText = await cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                        this.assert.equal(productCartPriceText, bookProductPage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                        console.log('  - ' + product + ' cart price is the same as in the product page (before tax): ' + bookProductPage.productListedPrice);
                    } else {
                        productCartPriceText = await cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                        productCartPrice = Number((Number(productCartPriceText) * 1).toFixed(2));
                        this.assert.approximately(productCartPrice, Number(bookProductPage.productListedPrice), 0.02, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                        console.log('  - ' + product + ' cart price is the same as in the product page (after tax): ' + bookProductPage.productListedPrice);
                    }
                }
                if (Number(quantity) > 1) {
                    await cartPage.increaseProductQuantity(this.driver, quantity);
                    // TODO: Validate <cart total price> = quantity x <product page price>
                }
                await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                const pageTitle = await Helpers.getPageTitle(this.driver);
                this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');

            } else if (productCategory === 'journal') {
                await Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.mainTitleLocator, 5 * 1000);
                if (config.browserName !== 'ie') {
                    await Helpers.removeSurveyPopupElement(this.driver);
                }
                await journalProductPage.selectCountry(this.driver, this.customerDetails.countryCode);
                await journalProductPage.addProductToCart(this.driver, product.toString());
                if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    const productCartPrice = await cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                    this.assert.equal(productCartPrice, journalProductPage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                    console.log('  - ' + product + ' cart price is the same as in the product page: ' + journalProductPage.productListedPrice);
                }
                await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                const pageTitle = await Helpers.getPageTitle(this.driver);
                this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
            } else if (productCategory === 'articlechoice') {
                await Helpers.waitUntilElementHasState(this.driver, 'visible', articleChoiceHomePage.globalHeaderLocator, 5 * 1000);
                if (config.browserName !== 'ie') {
                    await Helpers.removeSurveyPopupElement(this.driver);
                }
                await Helpers.jsScrollToElementAlignBottom(this.driver, await articleChoiceHomePage.addToCartButton(this.driver));
                await articleChoiceHomePage.selectArticleAmountOption(this.driver, 2);
                await articleChoiceHomePage.clickAddToCartButton(this.driver);
                if (!(this.platform === 'MOBILE' || this.scenarioTags.indexOf('@ElcmE2E') > -1)) {
                    await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                    const productCartPrice = await cartPage.getLastLineItemUnitPrice(this.driver, prodToPurchase.productISBN, this.customerDetails.countryCode);
                    this.assert.equal(productCartPrice, articleChoiceHomePage.productListedPrice, `Product's price in Cart does not match Product's listed price (${product} - ${prodToPurchase.productISBN})`);
                    console.log('  - ' + product + ' cart price is the same as in the product page: ' + articleChoiceHomePage.productListedPrice);
                }
                await Helpers.waitUntilElementHasState(this.driver, 'located', cartPage.continueShoppingLocator, 10 * 1000);
                const pageTitle = await Helpers.getPageTitle(this.driver);
                this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
            } else if (productCategory === 'article') {
                // No Actions are applicable here at this stage
            }

            // Log the product types and ISBNs that have been added to the Cart
            this.orderDetails.orderIsbns = this.orderDetails.orderIsbns.concat(prodToPurchase.productISBN);
            this.orderDetails.productTypes.push(prodToPurchase.productType);
            // Enter the title for each ISBN/ISSN
            for (let i: number = 0; i <  prodToPurchase.productISBN.length; i++) {
                this.orderDetails.orderTitles.push(prodToPurchase.productTitle);
            }

            this.orderDetails.orderTotalItems += prodToPurchase.productISBN.length;

            console.log('  - Product ' + product + ' added to cart - Cart page displayed');
        }
    }
});

defineStep(/^I apply a (.*)? discount promo code to the cart$/, async function (promoType: string): Promise<void> {
    this.orderDetails.discountedOrder = true;
    // await Helpers.driverSleep(this.driver, 2000);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', cartPage.promoToggleLocator, 10 * 1000);
    await cartPage.togglePromotionField(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', cartPage.promoCodeLocator, 10 * 1000);
    if (promoType === 'percentage') {
        await cartPage.enterPromoCode(this.driver, 'E2ETESTS');
    } else if (promoType === 'bogo') {
        await cartPage.enterPromoCode(this.driver, 'E2EBOGO');
    }
    await cartPage.applyPromo(this.driver);
});
