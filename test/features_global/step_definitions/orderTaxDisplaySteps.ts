import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import { AuthorisationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage';
import { AccountPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage';
import { AddressBookPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage';
import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { CheckoutPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/checkoutPage';
import { TestData } from '../support/testData';

const testData = new TestData();
const authorisationPage = new AuthorisationPage(testData);
const accountPage = new AccountPage(testData);
const addressBookPage = new AddressBookPage(testData);
const cartPage = new CartPage(testData);
const checkoutPage = new CheckoutPage();

let addressList = [];

defineStep(/^I have a single New York address defined for my account$/, async function (): Promise<void> {
    let pageTitle: string;
    await authorisationPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', authorisationPage.termsLocator, 10 * 1000);
    // this.assert.equal(termsPresent, true, 'Page element not present');
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
    await authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', accountPage.contactInformationHeaderLocator, 20 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
    await accountPage.selectEditAddressesLink(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', addressBookPage.billingAddressLabelLocator, 20 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, addressBookPage.pageTitle, 'Expected Address Book page title not found');
    const sameAddressCheckbox = await addressBookPage.sameAddressCheckbox(this.driver);
    const checkboxState = await sameAddressCheckbox.isSelected();
    if (checkboxState === false) {
        await addressBookPage.selectSameAddressCheckbox(this.driver);
    }
    await addressBookPage.selectBillingCountry(this.driver, 'US');
    await Helpers.enterText(this.driver, addressBookPage.billingCityLocator, 'New York');
    await addressBookPage.selectBillingRegion(this.driver, 'New York');
    await Helpers.enterText(this.driver, addressBookPage.billingPostcodeLocator, '10007');
    await addressBookPage.submitForm(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'visible', accountPage.contactInformationHeaderLocator, 20 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
});

defineStep(/^My cart is empty$/, async function (): Promise<void> {
    // TODO: Use Helpers.waitUntilElementHasState();
    // await Helpers.waitUntilElementNotVisible(this.driver, await this.driver.findElement({css:basePage.cartTotalLocator}), 10000);
    // // this.driver.manage().timeouts().implicitlyWait(1000);
    // let cartTotalPresent = await this.waitForElement(basePage.cartTotalLocator);
    // // this.driver.manage().timeouts().implicitlyWait(this.defaultTimeout);
    // if (cartTotalPresent === true) {
    //     await cartPage.visitPage(this.driver);
    //     let pageTitle = await Helpers.getPageTitle(this.driver);
    //     this.assert.equal(pageTitle, cartPage.pageTitle, 'Expected Cart page title not found');
    //     let deleteItemsArray = await cartPage.deleteLineItemOptions(this.driver);
    //     for (let row in deleteItemsArray) {
    //         await deleteItemsArray[row].clickElement(); // Delete each item present in the cart
    //     }
    // }
});

defineStep(/^I change my address details to the following in turn:$/, async function (addresses): Promise<void> {
    // Assumes step is starting on the checkout page
    addressList = addresses.rows();
    for (const row in addressList) { // Creates the functions to run against addressList in the async.series call below
        await Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, addressList[row][0]);
        await (await checkoutPage.shippingPhoneNumber(this.driver)).click(); // Click off input field to trigger tax recalculation
        await Helpers.driverSleep(this.driver, 5 * 1000);
        addressList[row][3] = await (await checkoutPage.taxPrice(this.driver)).getText(); // Puts the scraped tax value following the city change into the addressList so can be referenced in next step
        await checkoutPage.selectShippingRegion(this.driver, addressList[row][1]);
        await (await checkoutPage.shippingPhoneNumber(this.driver)).click(); // Click off input field to trigger tax recalculation
        await Helpers.driverSleep(this.driver, 5 * 1000);
        addressList[row][4] = await (await checkoutPage.taxPrice(this.driver)).getText();
        await Helpers.enterText(this.driver, checkoutPage.shippingPostcodeLocator, addressList[row][2]);
        await (await checkoutPage.shippingPhoneNumber(this.driver)).click(); // Click off input field to trigger tax recalculation
        await Helpers.driverSleep(this.driver, 5 * 1000);
        addressList[row][5] = await (await checkoutPage.taxPrice(this.driver)).getText();
    }
});

defineStep(/^The checkout page shows a tax value of "([^"]*)"$/, async function (taxValue: string): Promise<void> {
    await cartPage.clickProceedToCheckoutButton(this.driver);
    // let backToCartButtonPresent = await Helpers.waitUntilElementHasState(this.driver, 'located', checkoutPage.backToCartLocator, 10 * 1000);
    // this.assert.equal(backToCartButtonPresent, true, 'Back To§ Cart button not present');
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, checkoutPage.pageTitle, 'Expected Checkout page title not found');
    await Helpers.driverSleep(this.driver, 3 * 1000);
    const taxPrice = await checkoutPage.taxPrice(this.driver);
    const taxActualValue = await taxPrice.getText();
    const discountedTaxValue = (Number(taxValue) * this.discountMultiplier).toFixed(2);
    this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${taxValue}"`);
    this.assert.approximately(Number(taxActualValue), Number(discountedTaxValue), 0.02, 'Displayed tax in checkout does not equal expected tax value');
});

defineStep(/^The Checkout page shows the following updated tax values after each address change:$/, async function (taxValues): Promise<void> {
    const expectedTaxValues = taxValues.rows();
    for (const row in expectedTaxValues) {
        let discountedTaxValue = (Number(expectedTaxValues[row][0]) * this.discountMultiplier).toFixed(2);
        this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][0]}"`);
        this.assert.approximately(Number(addressList[row][3]), Number(discountedTaxValue), 0.02, 'Expected tax value following city change not found for addressList row ' + row);

        discountedTaxValue = (Number(expectedTaxValues[row][1]) * this.discountMultiplier).toFixed(2);
        this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][1]}"`);
        this.assert.approximately(Number(addressList[row][4]), Number(discountedTaxValue), 0.02, 'Expected tax value following region change not found for addressList row ' + row);

        discountedTaxValue = (Number(expectedTaxValues[row][2]) * this.discountMultiplier).toFixed(2);
        this.discountMultiplier !== 1 && console.log(`- A discount has been applied, now expecting tax to be "${discountedTaxValue}" not "${expectedTaxValues[row][2]}"`);
        this.assert.approximately(Number(addressList[row][5]), Number(discountedTaxValue), 0.02, 'Expected tax value following postcode change not found for addressList row ' + row);
    }
});

defineStep(/^I go to the checkout page$/, async function (): Promise<void> {
    await cartPage.clickProceedToCheckoutButton(this.driver);
    // let backToCartButtonPresent = await this.waitForElement(checkoutPage.backToCartLocator, 10000);
    // this.assert.equal(backToCartButtonPresent, true, 'Back To Cart button not present');
});

defineStep(/^The checkout page shows a tax value$/, async function (): Promise<void> {
    await Helpers.driverSleep(this.driver, 3 * 1000);
    const taxText = await (await checkoutPage.taxPrice(this.driver)).getText();
    this.assert.notEqual(taxText, '0.00', 'Displayed tax in checkout does not equal expected tax value');
});

defineStep(/^The checkout page shows no tax value$/, async function (): Promise<void> {
    await Helpers.driverSleep(this.driver, 3 * 1000);
    const taxText = await (await checkoutPage.taxPrice(this.driver)).getText();
    this.assert.equal(taxText, '0.00', 'Displayed tax in checkout does not equal expected tax value');
});

defineStep(/^I change my address details to a New Hampshire address$/, async function (): Promise<void> {
    await Helpers.enterText(this.driver, checkoutPage.shippingCityLocator, 'Concord');
    await checkoutPage.selectShippingRegion(this.driver, 'New Hampshire');
    await Helpers.enterText(this.driver, checkoutPage.shippingPostcodeLocator, '94518');
    await (await checkoutPage.shippingPhoneNumber(this.driver)).click(); // Click off input field to trigger tax recalculation
});
