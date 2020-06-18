import { defineStep } from 'cucumber';
import { BookProductPage } from '../../common/pages/ElsevierGlobalStore/products/bookProductPage';
import { JournalProductPage } from '../../common/pages/ElsevierGlobalStore/products/journalProductPage';
import { GooglePreviewPage } from '../../common/pages/ElsevierGlobalStore/products/googlePreviewPage';
import { Helpers } from '../../common/support/helpers';
import { TestData } from '../support/testData';
import { IProductToPurchase } from '../../common/support/interfaces';

const testData = new TestData();
const bookProductPage = new BookProductPage();
const journalProductPage = new JournalProductPage();
const googlePreviewPage = new GooglePreviewPage();

defineStep(/^I am on the product page of a (.*)$/, async function (productType: String): Promise<void> {
    const product: IProductToPurchase = testData.getProductDataFor().productsToPurchase.find(currentProduct => currentProduct.productName === productType.toString());
    const productPath: string = product.productPath;
    await this.driver.get(productPath);
});

defineStep(/^I click on the Google Preview button$/, async function (): Promise<void> {
    await bookProductPage.clickGooglePreviewButton(this.driver);
    await Helpers.driverSleep(this.driver, 7 * 1000);
    await this.driver.switchTo().frame(await googlePreviewPage.IFrame(this.driver));
    // await Helpers.waitUntilElementHasState(this.driver, 'located', googlePreviewPage.buyThisBookDropdownLocator, 10 * 1000);
    await googlePreviewPage.selectBuyThisBookDropdown(this.driver);
});

defineStep(/^The correct Google Preview window pops up$/, async function (): Promise<void> {
    await Helpers.driverSleep(this.driver, 2 * 1000);
});

defineStep(/^I change the Country-Region option to (.*)$/, async function (country: String): Promise<void> {
    console.log(country); // TODO
});

defineStep(/^I write a product review$/, async function (): Promise<void> {
    await bookProductPage.clickWriteAReviewLink(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', bookProductPage.beTheFirstToWriteAReviewLinkLocator, 5 * 1000);
    await bookProductPage.clickBeTheFirstToWriteAReviewLink(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'enabled', bookProductPage.reviewContentTextboxLocator, 10 * 1000);
    await bookProductPage.selectReviewStarRating(this.driver);
    await bookProductPage.enterReviewTitle(this.driver, 'Automation Testing review title');
    await bookProductPage.enterReviewContent(this.driver, bookProductPage.reviewContentText);
    await bookProductPage.enterReviewerName(this.driver, this.customerDetails.firstName + ' ' + this.customerDetails.lastName);
    await bookProductPage.enterReviewerEmail(this.driver, this.customerDetails.emailAddress);
    await bookProductPage.clickPostReviewButton(this.driver);
});

defineStep(/^The review is submitted successfully$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', bookProductPage.reviewThankYouMessageLocator, 5 * 1000);
    const thankYouMessage = await (await bookProductPage.reviewThankYouMessage(this.driver)).getText();
    this.assert.equal(thankYouMessage.trim().toUpperCase(), bookProductPage.reviewThankYouMessageText, 'Expected Thank You message not found');
});

defineStep(/^The prices are displayed in (.*)$/, async function (currency: String): Promise<void> {
    console.log(currency);
    await Helpers.driverSleep(this.driver, 2 * 1000);
});

defineStep(/^I click on the Request a Sales Quote option$/, async function (): Promise<void> {
    await journalProductPage.selectRequestAQuoteButton(this.driver);
});

defineStep(/^I click on the Tax Exempt Orders link$/, async function (): Promise<void> {
    await journalProductPage.selectTaxExemptLink(this.driver);
});

defineStep(/^I click on the (.*) social media link$/, async function (socialMedia: String): Promise<void> {
    console.log(socialMedia);
    await journalProductPage.selectTaxExemptLink(this.driver);
});

defineStep(/^The Request a Sales Quote form appears$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.quoteModalLocator, 10 * 1000);
    await journalProductPage.selectCloseQuoteButton(this.driver);
});

defineStep(/^The correct Tax Exemption info modal pops up$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
    await journalProductPage.selectCloseTaxExemptButton(this.driver);
});

defineStep(/^The Elsevier (.*) page opens on a new window$/, async function (socialMedia: String): Promise<void> {
    console.log(socialMedia);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
    await journalProductPage.selectCloseTaxExemptButton(this.driver);
    await Helpers.driverSleep(this.driver, 2 * 1000);
});

defineStep(/^The correct e-Commerce Support Centre page opens in a new window-tab$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'visible', journalProductPage.taxExemptModalLocator, 10 * 1000);
    await journalProductPage.selectCloseTaxExemptButton(this.driver);
    await Helpers.driverSleep(this.driver, 2 * 1000);
});

