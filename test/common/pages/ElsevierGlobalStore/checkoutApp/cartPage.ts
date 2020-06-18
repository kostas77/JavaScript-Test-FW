import { By, Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class CartPage {
    public pageUrl: string;
    public pageTitle: string;
    public emptyCartLocator: string;
    public coverImageLocator: string;

    public lineItemsTitleLocator: string;
    public lineItemsFormatLocator: string;
    public lineItemsISBNLocator: string;
    public lineItemsTotalPriceLocator: string;
    public lineItemsTotalPriceLoadingLocator: string;
    public lineItemsUnitPriceLocator: string;
    public lineItemsDiscountPriceLocator: string;
    public lineItemsQuantityInputLocator: string;
    public lineItemsRemoveItemLocator: string;
    public lineItemsRemoveBundleItemLocator: string;

    public lastLineItemTitleLocator: string;
    public lastLineItemFormatLocator: string;
    public lastLineItemISBNLocator: string;
    public lastLineItemTotalPriceLoadingLocator: string;
    public lastLineItemDiscountPriceLocator: string;
    public lastLineItemQuantityInputLocator: string;

    public deleteLineItemLocator: string;
    public promoToggleLocator: string;
    public promoCodeLocator: string;
    public applyPromoLocator: string;
    public cartSubtotalLocator: string;
    public cartSubtotalTextLocator: string;
    public cartTaxLocator: string;
    public cartTaxTextLocator: string;
    public cartShippingLocator: string;
    public cartTotalLocator: string;
    public continueShoppingLocator: string;
    public proceedToCheckoutLocator: string;
    public itemRowByISBN: string;
    public loginLinkLocator: string;

    constructor(testData: ITestData) {
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
        // this.lastLineItemTotalPriceLocator = '.item-row .item-total, .item-row .item-slash-figure';
        this.lastLineItemTotalPriceLoadingLocator = '#cart>.medium-8.columns>div:nth-last-of-type(2) .line_price_loading';
        // this.lastLineItemUnitPriceLocator = '.item-row .item-total, .item-row .item-slash-figure';
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
        this.continueShoppingLocator = '.cart__continue';
        this.proceedToCheckoutLocator = '.checkout-button';
        this.itemRowByISBN = '//span[text()="<ISBN>"]/ancestor::div[contains(concat(" ", @class, " "), " item-row ")]';
        this.loginLinkLocator = '.header-item--account';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async promoToggleArrow (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.promoToggleLocator);
    }

    public async togglePromotionField (driver: WebDriver): Promise<void> {
        return await (await this.promoToggleArrow(driver)).click();
    }

    public async promoCodeField (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.promoCodeLocator);
    }

    public async enterPromoCode (driver: WebDriver, promoCode: string): Promise<void> {
        return await (await this.promoCodeField(driver)).sendKeys(promoCode);
    }

    public async applyPromoButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.applyPromoLocator);
    }

    public async applyPromo (driver: WebDriver): Promise<void> {
        return await (await this.applyPromoButton(driver)).click();
    }

    public async coverImages (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.coverImageLocator);
    }

    public async lineItemShortTitles (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemsTitleLocator);
    }

    public async lineItemFormats (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemsFormatLocator);
    }

    public async lineItemQuantities (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemsQuantityInputLocator);
    }

    public async lineItemUnitPrices (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemsUnitPriceLocator);
    }

    public async lastLineItemUnitPrice (driver: WebDriver, isbn: string): Promise<number> {
        let element: WebElement;
        try {
            element = await driver.findElement(By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//*[contains(@class, "item-slash-figure")]`));
        } catch (err) {
            if (err.name === 'NoSuchElementError') {
                element = await driver.findElement(By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//*[contains(@class, "item-total")]`));
            } else {
                throw new Error(err);
            }
        }
        const itemPrice = await element.getText();
        return Number(itemPrice.replace(/[^0-9.-]+/g, ''));
    }

    private static async itemIsPrintBook(driver: WebDriver, isbn: string): Promise<boolean> {
        let isPrintBook = false;
        try {
            await driver.findElement(By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][contains(text(), "Print")]/ancestor::div[contains(@class, "item-details")]//div[contains(@class, "item-details-row-content")]//strong[contains(text(), "ISBN")]`));
            isPrintBook = true;
        } catch (err) {
            if (err.name !== 'NoSuchElementError') {
                throw new Error(err);
            }
        }
        return isPrintBook;
    }

    private static async itemIsEBook(driver: WebDriver, isbn: string): Promise<boolean> {
        let isEbook = false;
        try {
            await driver.findElement(By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][not(contains(text(), "Print"))]`));
            isEbook = true;
        } catch (err) {
            if (err.name !== 'NoSuchElementError') {
                throw new Error(err);
            }
        }
        return isEbook;
    }

    private static async itemIsJournal(driver: WebDriver, isbn: string): Promise<boolean> {
        let isJournal = false;
        try {
            await driver.findElement(By.xpath(`//span[text()="${isbn}"]/ancestor::div[contains(@class, "item-row")]//span[contains(@class, "item-source")][contains(text(), "Print")]/ancestor::div[contains(@class, "item-details")]//div[contains(@class, "item-details-row-content")]//strong[contains(text(), "ISSN")]`));
            isJournal = true;
        } catch (err) {
            if (err.name !== 'NoSuchElementError') {
                throw new Error(err);
            }
        }
        return isJournal;
    }

    private static getTaxRateForPrintBook(countryCode) {
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

    private static getTaxRateForEBook(countryCode) {
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

    private static getTaxRateForJournal(countryCode) {
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

    public async getLastLineItemUnitPrice (driver: WebDriver, isbns: string[], countryCode: string): Promise<string> {
        let currencyPrice = 0;
        const bundled = isbns.length > 1;
        for (let i = 0, j = isbns.length; i < j; i++) {
            let itemPrice = await this.lastLineItemUnitPrice(driver, isbns[i]);
            if (await CartPage.itemIsEBook(driver, isbns[i])) {
                itemPrice *= CartPage.getTaxRateForEBook(countryCode);
            } else if (await CartPage.itemIsPrintBook(driver, isbns[i])) {
                itemPrice *= CartPage.getTaxRateForPrintBook(countryCode);
            } else if (await CartPage.itemIsJournal(driver, isbns[i])) {
                itemPrice *= CartPage.getTaxRateForJournal(countryCode);
            }
            currencyPrice += itemPrice;
        }
        console.log(`  - Finding a price for ${isbns} which ${bundled ? 'is' : 'is not'} bundled`);
        console.log(`    - Product cart price is: ${currencyPrice}`);
        return currencyPrice.toFixed(2);
    }

    public async lineItemTotals (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.lineItemsTotalPriceLocator);
    }

    public async deleteLineItemOptions (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.deleteLineItemLocator);
    }

    public async productQuantityInput (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.lastLineItemQuantityInputLocator);
    }

    public async increaseProductQuantity (driver: WebDriver, quantity: string): Promise<void> {
        await (await this.productQuantityInput(driver)).sendKeys(Key.DELETE);
        await (await this.productQuantityInput(driver)).sendKeys(quantity);
        await (await this.productQuantityInput(driver)).sendKeys(Key.RETURN);
        await driver.sleep(3000);
        return;
    }

    public async cartSubtotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartSubtotalLocator);
    }

    public async cartSubtotalText (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartSubtotalTextLocator);
    }

    public async cartTax (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartTaxLocator);
    }

    public async cartShipping (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartShippingLocator);
    }

    public async cartTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartTotalLocator);
    }

    public async continueShoppingButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.continueShoppingLocator);
    }

    public async clickContinueShoppingLink (driver: WebDriver): Promise<void> {
        return await (await this.continueShoppingButton(driver)).click();
    }

    public async proceedToCheckoutButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.proceedToCheckoutLocator);
    }

    public async clickProceedToCheckoutButton (driver: WebDriver): Promise<void> {
        return await (await this.proceedToCheckoutButton(driver)).click();
    }

    public async proceedToCheckout (driver: WebDriver): Promise<void> {
        await this.clickProceedToCheckoutButton(driver);
    }

    public async selectVariation (driver: WebDriver, sku: string, variation: string): Promise<void> {
        const itemVariations = await Helpers.getElementsArray(driver, '[data-item-sku="' + sku + '"] div.item-variations label');
        for (const itemVariation of itemVariations) {
            const variationText = await itemVariation.getText();
            if (variation === variationText.trim()) {
                await (await itemVariation.findElement({ css: 'input.item-variation' })).click();
                await driver.wait(async () => {
                    const mask = await Helpers.getElement(driver, '.row-mask');
                    try {
                        return !await mask.isDisplayed();
                    } catch (err) {
                        return true;
                    }
                });
                return;
            }
        }
    }

    public async loginLink (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.loginLinkLocator);
    }

    public async selectLoginLink (driver: WebDriver): Promise<void> {
        return await (await this.loginLink(driver)).click();
    }
}
