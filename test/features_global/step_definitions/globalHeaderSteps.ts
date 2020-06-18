import { defineStep } from 'cucumber';
import { GlobalHeader } from '../../common/pages/ElsevierGlobalStore/globalHeader';
import { CartPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage';
import { Helpers } from '../../common/support/helpers';
import { AccountPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage';
import { AuthorisationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage';
import { TestData } from '../support/testData';

const testData = new TestData();
const globalHeader = new GlobalHeader(testData);
const accountPage = new AccountPage(testData);
const authPage = new AuthorisationPage(testData);
const cartPage = new CartPage(testData);

// General
defineStep(/^I have navigated to the home page$/, async function () {
    await globalHeader.visitHomePage(this.driver);
});

defineStep(/^the footer is clicked$/, async function () {
    await Helpers.scrollY(this.driver, 'down', 999999);
    await globalHeader.clickFooter(this.driver);
});

defineStep(/^the overlay is clicked$/, async function () {
    await globalHeader.clickOverlay(this.driver);
});

// Dropdown Menus
defineStep(/^the first dropdown list is expanded$/, async function () {
    await globalHeader.clickFirstDropdownMenuTrigger(this.driver);
    const visible = await globalHeader.firstDropdownListIsVisible(this.driver, 'visible');
    this.assert.isTrue(visible, 'The dropdown menu should contain the \'.expanded\' class');
});

defineStep(/^the first dropdown trigger is clicked$/, async function () {
    await globalHeader.clickFirstDropdownMenuTrigger(this.driver);
});

defineStep(/^the second dropdown trigger is clicked$/, async function () {
    await globalHeader.clickSecondDropdownMenuTrigger(this.driver);
});

defineStep(/^the first dropdown list expands$/, async function () {
    const visible = await globalHeader.firstDropdownListIsVisible(this.driver, 'visible');
    this.assert.isTrue(visible, 'The dropdown menu should contain the \'.expanded\' class');
});

defineStep(/^the first dropdown list collapses$/, async function () {
    const visible = await globalHeader.firstDropdownListIsVisible(this.driver, 'notVisible');
    this.assert.isFalse(visible, 'The dropdown menu should not contain the \'.expanded\' class');
});

defineStep(/^the first dropdown list contains at least one link$/, async function () {
    const hasLink = await globalHeader.firstDropdownListContainsANavigationalLink(this.driver);
    this.assert.isTrue(hasLink, 'The first dropdown menu should contains at least one navigational link');
});

// BigSearch
defineStep(/^bigSearch is expanded$/, async function () {
    await globalHeader.expandBigSearch(this.driver);
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.bigSearchLocator);
    this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
});

defineStep(/^the search icon is clicked$/, async function () {
    await globalHeader.clickSearchIcon(this.driver);
});

defineStep(/^bigSearch expands$/, async function () {
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.bigSearchLocator);
    this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
});

defineStep(/^bigSearch collapses$/, async function () {
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.bigSearchLocator);
    this.assert.equal(displayValue, 'none', 'The bigSearch display value is not equal to \'none\'');
});

// Cart
defineStep(/^I click the cart icon$/, async function () {
    await globalHeader.clickCartIcon(this.driver);
});

defineStep(/^I am taken to the cart page$/, async function () {
    await Helpers.waitUntilPageUrlIs(this.driver, cartPage.pageUrl, 30 * 1000);
});

defineStep(/^the cart widget displays that I have (\d+) items in my cart$/, async function (expectedItemCount: number) {
    await globalHeader.refreshAfterCartAdd(this.driver);
    const actualItemCount = await globalHeader.getCartWidgetItemCountAsString(this.driver);
    this.assert.equal(parseInt(actualItemCount, 0), expectedItemCount, 'Number of items in cart and number displayed by cart widget do not match');
});

// Profile dropdown
defineStep(/^the profile dropdown is expanded$/, async function () {
    await globalHeader.refreshAfterLogin(this.driver);
    await globalHeader.expandProfileDropdown(this.driver);
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownLocator);
    this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
});

defineStep(/^I click the sign in icon$/, async function () {
    await globalHeader.clickSignInIcon(this.driver);
});

defineStep(/^I click the profile icon$/, async function () {
    await globalHeader.refreshAfterLogin(this.driver);
    await globalHeader.clickProfileIcon(this.driver);
});

defineStep(/^the profile dropdown view account button is clicked$/, async function () {
    await globalHeader.clickProfileDropdownViewAccountButton(this.driver);
});

defineStep(/^I am taken to the account login page$/, async function () {
    await Helpers.waitUntilPageUrlIs(this.driver, authPage.pageUrl, 30 * 1000);
});

defineStep(/^I am taken to the account page$/, async function () {
    await Helpers.waitUntilPageUrlIs(this.driver, accountPage.pageUrl, 30 * 1000);
});

defineStep(/^the sign in icon is hidden$/, async function () {
    await globalHeader.refreshAfterLogin(this.driver);
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.signInIconLocator);
    this.assert.equal(displayValue, 'none', 'The sign in icon display value is not equal to \'none\'');
});

defineStep(/^the profile icon is visible$/, async function () {
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownTriggerLocator);
    this.assert.equal(displayValue, 'flex', 'The profile icon display value is not equal to \'flex\'');
});

defineStep(/^the profile icon contains my initials$/, async function () {
    await globalHeader.refreshAfterLogin(this.driver);
    const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
    const actualInitials = await globalHeader.getProfileIconInitials(this.driver);
    this.assert.equal(actualInitials, expectedInitials, 'Initials do not match that of the current customer');
});

defineStep(/^the profile dropdown expands$/, async function () {
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownLocator);
    this.assert.equal(displayValue, 'block', 'The profile dropdown display value is not equal to \'block\'');
});

defineStep(/^the profile dropdown collapses$/, async function () {
    const displayValue = await globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.profileDropdownLocator);
    this.assert.equal(displayValue, 'none', 'The profile icon display value is not equal to \'none\'');
});

defineStep(/^the profile dropdown contains my initials, full name and email address$/, async function () {
    const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
    const actualInitials = await globalHeader.getProfileDropdownInitials(this.driver);
    this.assert.equal(actualInitials, expectedInitials, 'The profile dropdown initials do not match that of the current customer');

    const expectedFullName = `${this.customerDetails.firstName} ${this.customerDetails.lastName}`;
    const actualFullName = await globalHeader.getProfileDropdownFullName(this.driver);
    this.assert.equal(actualFullName, expectedFullName, 'The profile dropdown full name does not match that of the current customer');

    const actualEmailAddress = await globalHeader.getProfileDropdownEmailAddress(this.driver);
    this.assert.equal(actualEmailAddress, this.customerDetails.emailAddress, 'The profile dropdown email address does not match that of the current customer');
});

defineStep(/^the profile dropdown sign out button has the correct link$/, async function () {
    const expectedHref = testData.getUrlFor().elsevier.logout;
    const actualHref = await globalHeader.getProfileDropdownSignOutButtonHref(this.driver);
    this.assert.equal(actualHref, expectedHref, 'The profile dropdown sign out button href does not match the expected value');
});

// Mobile menu
defineStep(/^the mobile menu is expanded$/, async function () {
    await globalHeader.clickOpenMobileMenuButton(this.driver);
    const expectedRightValue = '0px';
    const actualRightValue = await globalHeader.getMobileMenuRightValue(this.driver);
    this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
});

defineStep(/^the open mobile menu button is clicked$/, async function () {
    await globalHeader.clickOpenMobileMenuButton(this.driver);
});

defineStep(/^the close mobile menu button is clicked$/, async function () {
    await globalHeader.clickCloseMobileMenuButton(this.driver);
});

defineStep(/^the mobile menu view account button is clicked$/, async function () {
    await globalHeader.clickMobileMenuViewAccountButton(this.driver);
});

defineStep(/^the mobile menu expands$/, async function () {
    this.assert.isTrue(await globalHeader.mobileMenuHasExpandedClass(this.driver), 'The mobile menu should have the \'expanded\' class');
    const expectedRightValue = '0px';
    const actualRightValue = await globalHeader.getMobileMenuRightValue(this.driver);
    this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
});

defineStep(/^the mobile menu collapses$/, async function () {
    this.assert.isFalse(await globalHeader.mobileMenuHasExpandedClass(this.driver), 'The mobile menu should not have the \'expanded\' class');
    const expectedRightValue = '-320px';
    const actualRightValue = await globalHeader.getMobileMenuRightValue(this.driver);
    this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
});

defineStep(/^the mobile menu contains my initials and email address$/, async function () {
    const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
    const actualInitials = await globalHeader.getMobileMenuInitials(this.driver);
    this.assert.equal(actualInitials, expectedInitials, 'The mobile menu initials do not match that of the current customer');

    const actualEmailAddress = await globalHeader.getMobileMenuEmailAddress(this.driver);
    this.assert.equal(actualEmailAddress, this.customerDetails.emailAddress, 'The mobile menu email address does not match that of the current customer');
});

defineStep(/^the mobile menu sign out button has the correct link$/, async function () {
    const expectedHref = testData.getUrlFor().elsevier.logout;
    const actualHref = await globalHeader.getProfileDropdownSignOutButtonHref(this.driver);
    this.assert.equal(actualHref, expectedHref, 'The profile dropdown sign out button href does not match the expected value');
});

// Scroll prevention
defineStep('I have captured the y position of the hero banner', async function () {
    const position = await Helpers.getHTMLElementPosition(this.driver, 'section.hero');
    console.log(`- Original position: ${position.y}`);
    this.heroBannerYPosition = position.y;
});

defineStep('I attempt to scroll down {int}px', async function (int) {
    await Helpers.scrollY(this.driver, 'down', int);
});

defineStep('the hero banner is still in the same y position', async function () {
    const position = await Helpers.getHTMLElementPosition(this.driver, 'section.hero');
    console.log(`- New position: ${position.y}`);
    this.assert.equal(position.y, this.heroBannerYPosition);
});

defineStep('the hero banner y position has moved up by {int}px', async function (int) {
    const position = await Helpers.getHTMLElementPosition(this.driver, 'section.hero');
    console.log(`- New position: ${position.y}`);
    this.assert.equal(position.y, this.heroBannerYPosition - int);
});
