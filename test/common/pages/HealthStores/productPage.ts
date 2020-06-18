import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class ProductPage {

    protected testData: ITestData;
    public locators = {
        mainTitleLocator: 'div.product-name > h1:nth-child(1)',
        isbnLocator: 'tr.first > td:nth-child(2)',
        addToCartButtonLocator: 'div.add-to-cart-buttons:nth-child(1) > button:nth-child(1)',
        priceLocator: '.price-box > .regular-price > span.price',
        specialPriceLocator: '.price-box > .special-price > span.price',
        journalPriceLocator: '.add-to-cart .regular-price',
        journalStatusSelectorLocator: '#attribute177',
        journalCountrySelectorLocator: '#attribute178',
        journalSubscriptionTermSelectorLocator: '#attribute179',
        pinSubscriptionTermSelectorLocator: '#attribute179',
        productListedPrice: '',
        vitalSourceEbookSelectorLocator: '#add-to-cart-vst',
        inklingEbookSelectorLocator: '#add-to-cart-inkling',
        ebookPriceLocator: 'div.small-5.medium-5.right > div > span > span.price'
    };

    constructor(testData: ITestData) {
        this.testData = testData;
        this.locators = { ...this.locators, ...testData.getSelectorOverrides().productPage };
    }

    public async mainTitle (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.mainTitleLocator);
    }

    public async isbn (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.isbnLocator);
    }

    public async addToCartButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.addToCartButtonLocator);
    }

    public async selectAddProductToCartButton (driver: WebDriver): Promise<void> {
        return await (await this.addToCartButton(driver)).click();
    }

    public async price (driver: WebDriver): Promise<WebElement> {
        try {
            return await Helpers.getElement(driver, this.locators.priceLocator);
        } catch (err) {
            return await Helpers.getElement(driver, this.locators.specialPriceLocator);
        }
    }

    public async journalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.journalPriceLocator);
    }

    public async ebookPrice (driver: WebDriver): Promise<WebElement> {
        try {
            return await Helpers.getElement(driver, this.locators.ebookPriceLocator);
        } catch (err) {
            return await this.price(driver);
        }
    }

    public async journalStatusSelector (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.journalStatusSelectorLocator);
    }

    public async journalCountrySelector (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.journalCountrySelectorLocator);
    }

    public async journalSubscriptionTermSelector (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.journalSubscriptionTermSelectorLocator);
    }

    public async selectSubscriptionTerm(driver: WebDriver): Promise<void> {
        await (await (await this.journalSubscriptionTermSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
    }

    public async pinSubscriptionTermSelector(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.pinSubscriptionTermSelectorLocator);
    }

    public async selectPinSubscriptionTerm(driver: WebDriver): Promise<void> {
        await (await (await this.pinSubscriptionTermSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
    }

    public async fillJournalSelectors (driver: WebDriver): Promise<void> {
        console.log('         - filling in journal values - status');
        await (await (await this.journalStatusSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
        console.log('         - filling in journal values - country');
        await (await (await this.journalCountrySelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
        console.log('         - filling in journal values - terms');
        await (await (await this.journalSubscriptionTermSelector(driver)).findElement({ css: 'option:nth-child(2)' })).click();
    }

    public async vitalSourceEbookSelector (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.vitalSourceEbookSelectorLocator);
    }

    public async selectVitalSourceEbook (driver: WebDriver): Promise<void> {
        await (await this.vitalSourceEbookSelector(driver)).click();
    }

    public async inklingEbookSelector(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.inklingEbookSelectorLocator);
    }

    public async selectInklingEbook(driver: WebDriver): Promise<void> {
        await (await this.inklingEbookSelector(driver)).click();
    }

    public async getPrice (driver: WebDriver): Promise<string> {
        return await (await this.price(driver)).getText();
    }

    public async getJournalPrice (driver: WebDriver): Promise<string> {
        return await (await this.journalPrice(driver)).getText();
    }

    public async getEbookPrice (driver: WebDriver): Promise<string> {
        return await (await this.ebookPrice(driver)).getText();
    }

    public async addProductToCart (driver: WebDriver, isJournal: boolean, isEbook: boolean): Promise<void> {
        console.log('         - adding to cart');
        if (isJournal) {
            this.locators.productListedPrice = await this.getJournalPrice(driver);
        } else if (isEbook) {
            this.locators.productListedPrice = await this.getEbookPrice(driver);
        } else {
            this.locators.productListedPrice = await this.getPrice(driver);
        }
        await this.selectAddProductToCartButton(driver);
    }
}
