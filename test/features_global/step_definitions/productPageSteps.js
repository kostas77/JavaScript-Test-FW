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
const bookProductPage_1 = require("../../common/pages/ElsevierGlobalStore/products/bookProductPage");
const journalProductPage_1 = require("../../common/pages/ElsevierGlobalStore/products/journalProductPage");
const googlePreviewPage_1 = require("../../common/pages/ElsevierGlobalStore/products/googlePreviewPage");
const helpers_1 = require("../../common/support/helpers");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const bookProductPage = new bookProductPage_1.BookProductPage();
const journalProductPage = new journalProductPage_1.JournalProductPage();
const googlePreviewPage = new googlePreviewPage_1.GooglePreviewPage();
cucumber_1.Given(/^I am on the product page of a (.*)$/, function (productType) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === productType.toString());
        const productPath = product.productPath;
        yield this.driver.get(productPath);
    });
});
cucumber_1.When(/^I click on the Google Preview button$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield bookProductPage.clickGooglePreviewButton(this.driver);
        yield helpers_1.Helpers.driverSleep(this.driver, 7 * 1000);
        yield this.driver.switchTo().frame(yield googlePreviewPage.IFrame(this.driver));
        yield googlePreviewPage.selectBuyThisBookDropdown(this.driver);
    });
});
cucumber_1.Then(/^The correct Google Preview window pops up$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
    });
});
cucumber_1.When(/^I change the Country-Region option to (.*)$/, function (country) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(country);
    });
});
cucumber_1.When(/^I write a product review$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield bookProductPage.clickWriteAReviewLink(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', bookProductPage.beTheFirstToWriteAReviewLinkLocator, 5 * 1000);
        yield bookProductPage.clickBeTheFirstToWriteAReviewLink(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'enabled', bookProductPage.reviewContentTextboxLocator, 10 * 1000);
        yield bookProductPage.selectReviewStarRating(this.driver);
        yield bookProductPage.enterReviewTitle(this.driver, 'Automation Testing review title');
        yield bookProductPage.enterReviewContent(this.driver, bookProductPage.reviewContentText);
        yield bookProductPage.enterReviewerName(this.driver, this.customerDetails.firstName + ' ' + this.customerDetails.lastName);
        yield bookProductPage.enterReviewerEmail(this.driver, this.customerDetails.emailAddress);
        yield bookProductPage.clickPostReviewButton(this.driver);
    });
});
cucumber_1.Then(/^The review is submitted successfully$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', bookProductPage.reviewThankYouMessageLocator, 5 * 1000);
        const thankYouMessage = yield (yield bookProductPage.reviewThankYouMessage(this.driver)).getText();
        this.assert.equal(thankYouMessage.trim().toUpperCase(), bookProductPage.reviewThankYouMessageText, 'Expected Thank You message not found');
    });
});
cucumber_1.Then(/^The prices are displayed in (.*)$/, function (currency) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(currency);
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
    });
});
cucumber_1.When(/^I click on the Request a Sales Quote option$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield journalProductPage.selectRequestAQuoteButton(this.driver);
    });
});
cucumber_1.When(/^I click on the Tax Exempt Orders link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield journalProductPage.selectTaxExemptLink(this.driver);
    });
});
cucumber_1.When(/^I click on the (.*) social media link$/, function (socialMedia) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(socialMedia);
        yield journalProductPage.selectTaxExemptLink(this.driver);
    });
});
cucumber_1.Then(/^The Request a Sales Quote form appears$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.quoteModalLocator, 10 * 1000);
        yield journalProductPage.selectCloseQuoteButton(this.driver);
    });
});
cucumber_1.Then(/^The correct Tax Exemption info modal pops up$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
        yield journalProductPage.selectCloseTaxExemptButton(this.driver);
    });
});
cucumber_1.Then(/^The Elsevier (.*) page opens on a new window$/, function (socialMedia) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(socialMedia);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
        yield journalProductPage.selectCloseTaxExemptButton(this.driver);
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
    });
});
cucumber_1.Then(/^The correct e-Commerce Support Centre page opens in a new window-tab$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
        yield journalProductPage.selectCloseTaxExemptButton(this.driver);
        yield helpers_1.Helpers.driverSleep(this.driver, 2 * 1000);
    });
});
//# sourceMappingURL=productPageSteps.js.map