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
const globalHeader_1 = require("../../common/pages/ElsevierGlobalStore/globalHeader");
const cartPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/cartPage");
const helpers_1 = require("../../common/support/helpers");
const accountPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage");
const authorisationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const globalHeader = new globalHeader_1.GlobalHeader(testData);
const accountPage = new accountPage_1.AccountPage(testData);
const authPage = new authorisationPage_1.AuthorisationPage(testData);
const cartPage = new cartPage_1.CartPage(testData);
cucumber_1.Given(/^I have navigated to the home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.visitHomePage(this.driver);
    });
});
cucumber_1.When(/^the footer is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.scrollY(this.driver, 'down', 999999);
        yield globalHeader.clickFooter(this.driver);
    });
});
cucumber_1.When(/^the overlay is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickOverlay(this.driver);
    });
});
cucumber_1.Given(/^the first dropdown list is expanded$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickFirstDropdownMenuTrigger(this.driver);
        const visible = yield globalHeader.firstDropdownListIsVisible(this.driver, 'visible');
        this.assert.isTrue(visible, 'The dropdown menu should contain the \'.expanded\' class');
    });
});
cucumber_1.When(/^the first dropdown trigger is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickFirstDropdownMenuTrigger(this.driver);
    });
});
cucumber_1.When(/^the second dropdown trigger is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickSecondDropdownMenuTrigger(this.driver);
    });
});
cucumber_1.Then(/^the first dropdown list expands$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const visible = yield globalHeader.firstDropdownListIsVisible(this.driver, 'visible');
        this.assert.isTrue(visible, 'The dropdown menu should contain the \'.expanded\' class');
    });
});
cucumber_1.Then(/^the first dropdown list collapses$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const visible = yield globalHeader.firstDropdownListIsVisible(this.driver, 'notVisible');
        this.assert.isFalse(visible, 'The dropdown menu should not contain the \'.expanded\' class');
    });
});
cucumber_1.Then(/^the first dropdown list contains at least one link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hasLink = yield globalHeader.firstDropdownListContainsANavigationalLink(this.driver);
        this.assert.isTrue(hasLink, 'The first dropdown menu should contains at least one navigational link');
    });
});
cucumber_1.Given(/^bigSearch is expanded$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.expandBigSearch(this.driver);
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.bigSearchLocator);
        this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
    });
});
cucumber_1.When(/^the search icon is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickSearchIcon(this.driver);
    });
});
cucumber_1.Then(/^bigSearch expands$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.bigSearchLocator);
        this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
    });
});
cucumber_1.Then(/^bigSearch collapses$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.bigSearchLocator);
        this.assert.equal(displayValue, 'none', 'The bigSearch display value is not equal to \'none\'');
    });
});
cucumber_1.When(/^I click the cart icon$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickCartIcon(this.driver);
    });
});
cucumber_1.Then(/^I am taken to the cart page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilPageUrlIs(this.driver, cartPage.pageUrl, 30 * 1000);
    });
});
cucumber_1.Then(/^the cart widget displays that I have (\d+) items in my cart$/, function (expectedItemCount) {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.refreshAfterCartAdd(this.driver);
        const actualItemCount = yield globalHeader.getCartWidgetItemCountAsString(this.driver);
        this.assert.equal(parseInt(actualItemCount, 0), expectedItemCount, 'Number of items in cart and number displayed by cart widget do not match');
    });
});
cucumber_1.Given(/^the profile dropdown is expanded$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.refreshAfterLogin(this.driver);
        yield globalHeader.expandProfileDropdown(this.driver);
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownLocator);
        this.assert.equal(displayValue, 'block', 'The bigSearch display value is not equal to \'block\'');
    });
});
cucumber_1.When(/^I click the sign in icon$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickSignInIcon(this.driver);
    });
});
cucumber_1.When(/^I click the profile icon$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.refreshAfterLogin(this.driver);
        yield globalHeader.clickProfileIcon(this.driver);
    });
});
cucumber_1.When(/^the profile dropdown view account button is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickProfileDropdownViewAccountButton(this.driver);
    });
});
cucumber_1.Then(/^I am taken to the account login page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilPageUrlIs(this.driver, authPage.pageUrl, 30 * 1000);
    });
});
cucumber_1.Then(/^I am taken to the account page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilPageUrlIs(this.driver, accountPage.pageUrl, 30 * 1000);
    });
});
cucumber_1.Then(/^the sign in icon is hidden$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.refreshAfterLogin(this.driver);
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.signInIconLocator);
        this.assert.equal(displayValue, 'none', 'The sign in icon display value is not equal to \'none\'');
    });
});
cucumber_1.Then(/^the profile icon is visible$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownTriggerLocator);
        this.assert.equal(displayValue, 'flex', 'The profile icon display value is not equal to \'flex\'');
    });
});
cucumber_1.Then(/^the profile icon contains my initials$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.refreshAfterLogin(this.driver);
        const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
        const actualInitials = yield globalHeader.getProfileIconInitials(this.driver);
        this.assert.equal(actualInitials, expectedInitials, 'Initials do not match that of the current customer');
    });
});
cucumber_1.Then(/^the profile dropdown expands$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'visible', globalHeader.profileDropdownLocator);
        this.assert.equal(displayValue, 'block', 'The profile dropdown display value is not equal to \'block\'');
    });
});
cucumber_1.Then(/^the profile dropdown collapses$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const displayValue = yield globalHeader.getDisplayValue(this.driver, 'notVisible', globalHeader.profileDropdownLocator);
        this.assert.equal(displayValue, 'none', 'The profile icon display value is not equal to \'none\'');
    });
});
cucumber_1.Then(/^the profile dropdown contains my initials, full name and email address$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
        const actualInitials = yield globalHeader.getProfileDropdownInitials(this.driver);
        this.assert.equal(actualInitials, expectedInitials, 'The profile dropdown initials do not match that of the current customer');
        const expectedFullName = `${this.customerDetails.firstName} ${this.customerDetails.lastName}`;
        const actualFullName = yield globalHeader.getProfileDropdownFullName(this.driver);
        this.assert.equal(actualFullName, expectedFullName, 'The profile dropdown full name does not match that of the current customer');
        const actualEmailAddress = yield globalHeader.getProfileDropdownEmailAddress(this.driver);
        this.assert.equal(actualEmailAddress, this.customerDetails.emailAddress, 'The profile dropdown email address does not match that of the current customer');
    });
});
cucumber_1.Then(/^the profile dropdown sign out button has the correct link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedHref = testData.getUrlFor().elsevier.logout;
        const actualHref = yield globalHeader.getProfileDropdownSignOutButtonHref(this.driver);
        this.assert.equal(actualHref, expectedHref, 'The profile dropdown sign out button href does not match the expected value');
    });
});
cucumber_1.Given(/^the mobile menu is expanded$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickOpenMobileMenuButton(this.driver);
        const expectedRightValue = '0px';
        const actualRightValue = yield globalHeader.getMobileMenuRightValue(this.driver);
        this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
    });
});
cucumber_1.When(/^the open mobile menu button is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickOpenMobileMenuButton(this.driver);
    });
});
cucumber_1.When(/^the close mobile menu button is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickCloseMobileMenuButton(this.driver);
    });
});
cucumber_1.When(/^the mobile menu view account button is clicked$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield globalHeader.clickMobileMenuViewAccountButton(this.driver);
    });
});
cucumber_1.Then(/^the mobile menu expands$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.assert.isTrue(yield globalHeader.mobileMenuHasExpandedClass(this.driver), 'The mobile menu should have the \'expanded\' class');
        const expectedRightValue = '0px';
        const actualRightValue = yield globalHeader.getMobileMenuRightValue(this.driver);
        this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
    });
});
cucumber_1.Then(/^the mobile menu collapses$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.assert.isFalse(yield globalHeader.mobileMenuHasExpandedClass(this.driver), 'The mobile menu should not have the \'expanded\' class');
        const expectedRightValue = '-320px';
        const actualRightValue = yield globalHeader.getMobileMenuRightValue(this.driver);
        this.assert.equal(actualRightValue, expectedRightValue, 'The mobile menu right value does not match the expected value');
    });
});
cucumber_1.Then(/^the mobile menu contains my initials and email address$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedInitials = `${this.customerDetails.firstName[0].toUpperCase()}${this.customerDetails.lastName[0].toUpperCase()}`;
        const actualInitials = yield globalHeader.getMobileMenuInitials(this.driver);
        this.assert.equal(actualInitials, expectedInitials, 'The mobile menu initials do not match that of the current customer');
        const actualEmailAddress = yield globalHeader.getMobileMenuEmailAddress(this.driver);
        this.assert.equal(actualEmailAddress, this.customerDetails.emailAddress, 'The mobile menu email address does not match that of the current customer');
    });
});
cucumber_1.Then(/^the mobile menu sign out button has the correct link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const expectedHref = testData.getUrlFor().elsevier.logout;
        const actualHref = yield globalHeader.getProfileDropdownSignOutButtonHref(this.driver);
        this.assert.equal(actualHref, expectedHref, 'The profile dropdown sign out button href does not match the expected value');
    });
});
cucumber_1.Given('I have captured the y position of the hero banner', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const position = yield helpers_1.Helpers.getHTMLElementPosition(this.driver, 'section.hero');
        console.log(`- Original position: ${position.y}`);
        this.heroBannerYPosition = position.y;
    });
});
cucumber_1.When('I attempt to scroll down {int}px', function (int) {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.scrollY(this.driver, 'down', int);
    });
});
cucumber_1.Then('the hero banner is still in the same y position', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const position = yield helpers_1.Helpers.getHTMLElementPosition(this.driver, 'section.hero');
        console.log(`- New position: ${position.y}`);
        this.assert.equal(position.y, this.heroBannerYPosition);
    });
});
cucumber_1.Then('the hero banner y position has moved up by {int}px', function (int) {
    return __awaiter(this, void 0, void 0, function* () {
        const position = yield helpers_1.Helpers.getHTMLElementPosition(this.driver, 'section.hero');
        console.log(`- New position: ${position.y}`);
        this.assert.equal(position.y, this.heroBannerYPosition - int);
    });
});
//# sourceMappingURL=globalHeaderSteps.js.map