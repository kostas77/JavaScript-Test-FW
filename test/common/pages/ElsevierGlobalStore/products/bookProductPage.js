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
const helpers_1 = require("../../../support/helpers");
const driverConfig_1 = require("../../../../features_global/support/driverConfig");
const chai_1 = require("chai");
const config = new driverConfig_1.DriverConfig();
class BookProductPage {
    constructor() {
        this.mainTitleLocator = '.main-title';
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
    mainTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.mainTitleLocator);
        });
    }
    headerPrintIsbn(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.headerPrintIsbnLocator);
        });
    }
    addToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addToCartButtonLocator);
        });
    }
    clickAddProductToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.addToCartButtonLocator);
        });
    }
    clickGooglePreviewButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.googlePreviewButtonLocator);
        });
    }
    selectCountry(driver, countryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.countrySelectorDropdownLocator + '>option[value*="' + countryCode + '"]');
        });
    }
    getPrintPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.printPriceLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    printPrices(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.printPricesLocator);
        });
    }
    getEbookPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.ebookPriceLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    ebookPrices(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.ebookPricesLocator);
        });
    }
    bundlePrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.bundlePriceLocator);
        });
    }
    getBundlePrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPrice = yield helpers_1.Helpers.getText(driver, this.bundlePriceLocator);
            return currencyPrice.replace(/[^0-9.-]+/g, '');
        });
    }
    bundlePrices(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.bundlePricesLocator);
        });
    }
    ebookFormatRadioButtons(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.ebookFormatRadioButtonsLocator);
        });
    }
    selectBundleRadioButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.bundleCheckboxLocator);
        });
    }
    selectPrintRadioButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.printCheckboxLocator);
        });
    }
    selectEbookRadioButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.ebookCheckboxLocator);
        });
    }
    addProductToCart(driver, productName) {
        return __awaiter(this, void 0, void 0, function* () {
            let radioButtonArray, eBookType = null;
            switch (productName) {
                case 'Print book':
                    yield this.selectPrintRadioButton(driver);
                    this.productListedPrice = yield this.getPrintPrice(driver);
                    yield this.clickAddProductToCartButton(driver);
                    break;
                case 'Print book - (preorder)':
                    this.productListedPrice = yield this.getPrintPrice(driver);
                    const preOrderButtonText = yield helpers_1.Helpers.getText(driver, this.addToCartButtonLocator);
                    chai_1.assert.equal(preOrderButtonText, 'Pre-Order', 'Pre-order button does not exist');
                    yield this.clickAddProductToCartButton(driver);
                    break;
                case 'SDRM ebook':
                    yield this.selectEbookRadioButton(driver);
                    this.productListedPrice = yield this.getEbookPrice(driver);
                    radioButtonArray = yield this.ebookFormatRadioButtons(driver);
                    for (const row in radioButtonArray) {
                        eBookType = yield radioButtonArray[row].getAttribute('data-name');
                        if (eBookType === 'DRM-free (Mobi, PDF, EPub)') {
                            radioButtonArray[row].click();
                        }
                    }
                    yield this.clickAddProductToCartButton(driver);
                    break;
                case 'SDRM bundle':
                    yield this.selectBundleRadioButton(driver);
                    this.productListedPrice = yield this.getBundlePrice(driver);
                    radioButtonArray = yield this.ebookFormatRadioButtons(driver);
                    for (const row in radioButtonArray) {
                        eBookType = yield radioButtonArray[row].getAttribute('data-name');
                        if (eBookType === 'DRM-free (Mobi, PDF, EPub)') {
                            radioButtonArray[row].click();
                        }
                    }
                    yield this.clickAddProductToCartButton(driver);
                    break;
                case 'VST ebook':
                case 'eBook - GBP, EUR, AUD':
                    yield this.selectEbookRadioButton(driver);
                    if (config.browserName === 'ie') {
                        yield helpers_1.Helpers.driverSleep(driver, 1 * 1000);
                    }
                    this.productListedPrice = yield this.getEbookPrice(driver);
                    radioButtonArray = yield this.ebookFormatRadioButtons(driver);
                    for (const row in radioButtonArray) {
                        eBookType = yield radioButtonArray[row].getAttribute('data-name');
                        if (eBookType === 'VitalSource') {
                            radioButtonArray[row].click();
                        }
                    }
                    if (config.browserName === 'ie') {
                        yield helpers_1.Helpers.driverSleep(driver, 1 * 1000);
                    }
                    yield this.clickAddProductToCartButton(driver);
                    break;
                case 'VST bundle':
                    yield this.selectBundleRadioButton(driver);
                    if (config.browserName === 'ie') {
                        yield helpers_1.Helpers.driverSleep(driver, 1 * 1000);
                    }
                    this.productListedPrice = yield this.getBundlePrice(driver);
                    radioButtonArray = yield this.ebookFormatRadioButtons(driver);
                    for (const row in radioButtonArray) {
                        eBookType = yield radioButtonArray[row].getAttribute('data-name');
                        if (eBookType === 'VitalSource') {
                            radioButtonArray[row].click();
                        }
                    }
                    if (config.browserName === 'ie') {
                        yield helpers_1.Helpers.driverSleep(driver, 1 * 1000);
                    }
                    yield this.clickAddProductToCartButton(driver);
                    break;
                default:
                    throw new Error('Unknown product specified: ' + productName);
            }
        });
    }
    clickWriteAReviewLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.writeAReviewLinkLocator);
        });
    }
    clickBeTheFirstToWriteAReviewLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.beTheFirstToWriteAReviewLinkLocator);
        });
    }
    selectReviewStarRating(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.reviewStarRatingLocator);
        });
    }
    enterReviewTitle(driver, reviewTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.reviewTitleTextboxLocator, reviewTitle);
        });
    }
    enterReviewContent(driver, reviewContent) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.reviewContentTextboxLocator, reviewContent);
        });
    }
    enterReviewerName(driver, reviewerFullName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.reviewerNameTextboxLocator, reviewerFullName);
        });
    }
    enterReviewerEmail(driver, reviewerEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.reviewerEmailTextboxLocator, reviewerEmail);
        });
    }
    clickPostReviewButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.postReviewButtonLocator);
        });
    }
    reviewThankYouMessage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.reviewThankYouMessageLocator);
        });
    }
}
exports.BookProductPage = BookProductPage;
//# sourceMappingURL=bookProductPage.js.map