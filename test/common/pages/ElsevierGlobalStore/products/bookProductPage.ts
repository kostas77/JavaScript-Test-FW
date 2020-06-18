import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { DriverConfig } from '../../../../features_global/support/driverConfig';
import { assert } from 'chai';

const config = new DriverConfig();

export class BookProductPage {
    public mainTitleLocator: string;
    public headerPrintIsbnLocator: string;
    public googlePreviewButtonLocator: string;
    public countrySelectorDropdownLocator: string;
    public addToCartButtonLocator: string;
    public requestAQuoteButtonLocator: string;
    public printCheckboxLocator: string;
    public ebookCheckboxLocator: string;
    public bundleCheckboxLocator: string;
    public printPriceLocator: string;
    public printPricesLocator: string;
    public ebookPriceLocator: string;
    public ebookPricesLocator: string;
    public bundlePriceLocator: string;
    public bundlePricesLocator: string;
    public ebookFormatRadioButtonsLocator: string;
    public productListedPrice: string;
    public writeAReviewLinkLocator: string;
    public beTheFirstToWriteAReviewLinkLocator: string;
    public reviewStarRatingLocator: string;
    public reviewTitleTextboxLocator: string;
    public reviewContentTextboxLocator: string;
    public reviewerNameTextboxLocator: string;
    public reviewerEmailTextboxLocator: string;
    public postReviewButtonLocator: string;
    public reviewThankYouMessageLocator: string;
    public reviewThankYouMessageText: string;
    public reviewContentText: string;

    constructor() {
        this.mainTitleLocator = '.main-title';
        // this.headerPrintIsbnLocator = '.book-intro-content .print'; // not working
        this.googlePreviewButtonLocator = '#__GBS_Button0';
        this.addToCartButtonLocator = '.addToCart-btn';
        this.countrySelectorDropdownLocator = '#country-selector';
        this.requestAQuoteButtonLocator = '.quote-button';
        this.printCheckboxLocator = '.print-checkbox';
        this.ebookCheckboxLocator = '.electronic-checkbox';
        this.bundleCheckboxLocator = 'input[name=bundle]';
        this.printPriceLocator = '.print-format .format-price:not(.hide):not(.strike)';
        this.printPricesLocator = '.print-format .format-price';
        this.ebookPriceLocator = '.electronic-format .format-price:not(.hide):not(.strike)';
        this.ebookPricesLocator = '.electronic-format .format-price';
        this.bundlePriceLocator = '.bundle-format .format-price:not(.hide):not(.strike)';
        this.bundlePricesLocator = '.bundle-format .format-price';
        this.ebookFormatRadioButtonsLocator = 'input[name=electronic_format_variation]';
        this.productListedPrice = '';
        this.writeAReviewLinkLocator = '.write-review-btn-hidden';
        this.beTheFirstToWriteAReviewLinkLocator = '.write-first-review-button';
        this.reviewStarRatingLocator = '.review-star:nth-child(4)';
        this.reviewTitleTextboxLocator = '#yotpo_input_review_title';
        this.reviewContentTextboxLocator = '#yotpo_input_review_content';
        this.reviewerNameTextboxLocator = '#yotpo_input_review_username';
        this.reviewerEmailTextboxLocator = '#yotpo_input_review_email';
        this.postReviewButtonLocator = '.yotpo-submit';
        this.reviewThankYouMessageLocator = 'div[data-type="pending-for-review-approval"]>.yotpo-thankyou-header';
        this.reviewThankYouMessageText = 'THANK YOU FOR POSTING A REVIEW!';
        this.reviewContentText = '\'I find this book to be one of the best I have ever seen on the topic of building robots. Why?\\n\' +\n' +
            '        \'The author covers all the basics of just what a robot is and how to build 5 different ones including a rare gantry type.\\n\' +\n' +
            '        \'The real strengths of this book other than its clarity is the programming of the PICs-his microntroller of choice. Excellent, excellent, excellent. He shows you how and why-even if you don\\\'t have a lot of experience\\n\' +\n' +
            '        \'Also-and this is the real gem part-he shows you how to interface the different active electronic components that make up a robot. This is rare in any robot book and Mr. Bishop does it well with lucid explanations and very good diagrams.\\n\' +\n' +
            '        \'\\n\' +\n' +
            '        \'Not often does one find a book that gives an outstanding overview of the subject but also goes into the specific nuts and bolts.\'';
    }

    public async mainTitle (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.mainTitleLocator);
    }

    public async headerPrintIsbn (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.headerPrintIsbnLocator);
    }

    public async addToCartButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.addToCartButtonLocator);
    }

    public async clickAddProductToCartButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.addToCartButtonLocator);
    }

    public async clickGooglePreviewButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.googlePreviewButtonLocator);
    }

    public async selectCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await Helpers.clickElement(driver, this.countrySelectorDropdownLocator + '>option[value*="' + countryCode + '"]');
    }

    public async getPrintPrice (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.printPriceLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async printPrices (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.printPricesLocator);
    }

    public async getEbookPrice (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.ebookPriceLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async ebookPrices (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.ebookPricesLocator);
    }

    public async bundlePrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.bundlePriceLocator);
    }

    public async getBundlePrice (driver: WebDriver): Promise<string> {
        const currencyPrice = await Helpers.getText(driver, this.bundlePriceLocator);
        return currencyPrice.replace(/[^0-9.-]+/g, '');
    }

    public async bundlePrices (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.bundlePricesLocator);
    }

    public async ebookFormatRadioButtons (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.ebookFormatRadioButtonsLocator);
    }

    public async selectBundleRadioButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.bundleCheckboxLocator);
    }

    public async selectPrintRadioButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.printCheckboxLocator);
    }

    public async selectEbookRadioButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.ebookCheckboxLocator);
    }

    public async addProductToCart (driver: WebDriver, productName: string): Promise<void> {
        let radioButtonArray, eBookType = null;
        switch (productName) {
            case 'Print book':
                await this.selectPrintRadioButton(driver);
                this.productListedPrice = await this.getPrintPrice(driver);
                await this.clickAddProductToCartButton(driver);
                break;
            case 'Print book - (preorder)':
                this.productListedPrice = await this.getPrintPrice(driver);
                const preOrderButtonText = await Helpers.getText(driver, this.addToCartButtonLocator);
                assert.equal(preOrderButtonText, 'Pre-Order', 'Pre-order button does not exist');
                await this.clickAddProductToCartButton(driver);
                break;
            case 'SDRM ebook':
                await this.selectEbookRadioButton(driver);
                this.productListedPrice = await this.getEbookPrice(driver);
                radioButtonArray = await this.ebookFormatRadioButtons(driver);
                for (const row in radioButtonArray) {
                    eBookType = await radioButtonArray[row].getAttribute('data-name');
                    if (eBookType === 'DRM-free (Mobi, PDF, EPub)') {
                        radioButtonArray[row].click();
                    }
                }
                await this.clickAddProductToCartButton(driver);
                break;
            case 'SDRM bundle':
                await this.selectBundleRadioButton(driver);
                this.productListedPrice = await this.getBundlePrice(driver);
                radioButtonArray = await this.ebookFormatRadioButtons(driver);
                for (const row in radioButtonArray) {
                    eBookType = await radioButtonArray[row].getAttribute('data-name');
                    if (eBookType === 'DRM-free (Mobi, PDF, EPub)') {
                        radioButtonArray[row].click();
                    }
                }
                await this.clickAddProductToCartButton(driver);
                break;
            case 'VST ebook':
            case 'eBook - GBP, EUR, AUD':
                // if (config.browserName === 'ie') {
                //     await Helpers.driverSleep(driver, 1 * 1000);
                // }
                await this.selectEbookRadioButton(driver);
                if (config.browserName === 'ie') {
                    await Helpers.driverSleep(driver, 1000);
                }
                this.productListedPrice = await this.getEbookPrice(driver);
                radioButtonArray = await this.ebookFormatRadioButtons(driver);
                for (const row in radioButtonArray) {
                    eBookType = await radioButtonArray[row].getAttribute('data-name');
                    if (eBookType === 'VitalSource') {
                        radioButtonArray[row].click();
                    }
                }
                if (config.browserName === 'ie') {
                    await Helpers.driverSleep(driver, 1000);
                }
                await this.clickAddProductToCartButton(driver);
                break;
            case 'VST bundle':
                await this.selectBundleRadioButton(driver);
                if (config.browserName === 'ie') {
                    await Helpers.driverSleep(driver, 1000);
                }
                this.productListedPrice = await this.getBundlePrice(driver);
                radioButtonArray = await this.ebookFormatRadioButtons(driver);
                for (const row in radioButtonArray) {
                    eBookType = await radioButtonArray[row].getAttribute('data-name');
                    if (eBookType === 'VitalSource') {
                        radioButtonArray[row].click();
                    }
                }
                if (config.browserName === 'ie') {
                    await Helpers.driverSleep(driver, 1000);
                }
                await this.clickAddProductToCartButton(driver);
                break;
            default:
                throw new Error('Unknown product specified: ' + productName);
        }
    }

    public async clickWriteAReviewLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.writeAReviewLinkLocator);
    }

    public async clickBeTheFirstToWriteAReviewLink (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.beTheFirstToWriteAReviewLinkLocator);
    }

    public async selectReviewStarRating (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.reviewStarRatingLocator);
    }

    public async enterReviewTitle (driver: WebDriver, reviewTitle: string): Promise<void> {
        return await Helpers.enterText(driver, this.reviewTitleTextboxLocator, reviewTitle);
    }

    public async enterReviewContent (driver: WebDriver, reviewContent: string): Promise<void> {
        return await Helpers.enterText(driver, this.reviewContentTextboxLocator, reviewContent);
    }

    public async enterReviewerName (driver: WebDriver, reviewerFullName: string): Promise<void> {
        return await Helpers.enterText(driver, this.reviewerNameTextboxLocator, reviewerFullName);
    }

    public async enterReviewerEmail (driver: WebDriver, reviewerEmail: string): Promise<void> {
        return await Helpers.enterText(driver, this.reviewerEmailTextboxLocator, reviewerEmail);
    }

    public async clickPostReviewButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.postReviewButtonLocator);
    }

    public async reviewThankYouMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.reviewThankYouMessageLocator);
    }

}
