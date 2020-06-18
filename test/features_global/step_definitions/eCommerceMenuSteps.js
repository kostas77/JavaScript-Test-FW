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
const helpers_1 = require("../../common/support/helpers");
const basePage_1 = require("../../common/pages/ElsevierGlobalStore/basePage");
const addressBookPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage");
const accountPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage");
const emailVerificationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/emailVerificationPage");
const authorisationPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage");
const changePasswordPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/changePasswordPage");
const onlineSubscriptionPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/onlineSubscriptionPage");
const orderHistoryPage_1 = require("../../common/pages/ElsevierGlobalStore/checkoutApp/orderHistoryPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
let menuOptionsTable;
const basePage = new basePage_1.BasePage();
const accountPage = new accountPage_1.AccountPage(testData);
const emailVerificationPage = new emailVerificationPage_1.EmailVerificationPage(testData);
const addressBookPage = new addressBookPage_1.AddressBookPage(testData);
const authorisationPage = new authorisationPage_1.AuthorisationPage(testData);
const changePasswordPage = new changePasswordPage_1.ChangePasswordPage();
const onlineSubscriptionPage = new onlineSubscriptionPage_1.OnlineSubscriptionPage();
const orderHistoryPage = new orderHistoryPage_1.OrderHistoryPage('Elsevier', testData);
let sectionsList = [];
cucumber_1.Given(/^I am logged in$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield authorisationPage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
        let pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
        yield authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.contactInformationHeaderLocator, 5 * 1000);
        pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
    });
});
cucumber_1.Given(/^I am not logged in$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.driver.get(testData.getUrlFor().elsevier.logout);
    });
});
cucumber_1.When(/^I navigate to the following sections:$/, { timeout: 120 * 1000 }, function (sections) {
    return __awaiter(this, void 0, void 0, function* () {
        sectionsList = sections.rows();
        let menuOptionElement;
        let elementLocator = '';
        for (const row in sectionsList) {
            switch (sectionsList[row][0]) {
                case 'Personal Details':
                    menuOptionElement = yield accountPage.personalDetailsOption(this.driver);
                    elementLocator = accountPage.contactInformationHeaderLocator;
                    break;
                case 'Address Book':
                    menuOptionElement = yield accountPage.addressBookOption(this.driver);
                    elementLocator = addressBookPage.billingAddressLabelLocator;
                    break;
                case 'Change Password':
                    menuOptionElement = yield accountPage.changePasswordOption(this.driver);
                    elementLocator = changePasswordPage.changePasswordLabelLocator;
                    break;
                case 'Online Subscriptions':
                    menuOptionElement = yield accountPage.onlineSubscriptionOption(this.driver);
                    elementLocator = onlineSubscriptionPage.onlineSubscriptionSubscriptionHeaderLocator;
                    break;
                case 'Order History':
                    menuOptionElement = yield accountPage.orderHistoryOption(this.driver);
                    elementLocator = orderHistoryPage.orderHistoryOrderHeaderLocator;
                    break;
                default:
                    throw new Error('Invalid section name received in When.(I navigate to the following section) step:' + sectionsList[row][0]);
            }
            yield (yield menuOptionElement).click();
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', elementLocator, 40 * 1000);
            sectionsList[row][1] = yield helpers_1.Helpers.getPageTitle(this.driver);
        }
    });
});
cucumber_1.Then(/^The following options are displayed:$/, function (menuOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        menuOptionsTable = menuOptions.rows();
        const visibleElements = yield basePage.visibleEcommerceMenuOptions(this.driver);
        if (visibleElements.length < menuOptionsTable.length) {
            throw new Error('Menu does not show all expected options');
        }
        for (const row in visibleElements) {
            const menuOptionText = yield visibleElements[row].getText();
            try {
                this.assert.equal(menuOptionText, menuOptionsTable[row].toString(), 'Expected menu option not displayed');
            }
            catch (err) {
                if (err.name === 'TypeError') {
                    throw new Error('Additional menu option found on page: ' + menuOptionText);
                }
                else {
                    throw new Error(err);
                }
            }
        }
        yield basePage.openEcommerceMenu(this.driver);
    });
});
cucumber_1.Then(/^I am taken to the correct page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        for (const row in sectionsList) {
            switch (sectionsList[row][0]) {
                case 'Personal Details':
                    this.assert.equal(sectionsList[row][1], accountPage.pageTitle, 'Expected My Account page title not found');
                    break;
                case 'Address Book':
                    this.assert.equal(sectionsList[row][1], addressBookPage.pageTitle, 'Expected Address Book page title not found');
                    break;
                case 'Change Password':
                    this.assert.equal(sectionsList[row][1], changePasswordPage.pageTitle, 'Expected Change Password page title not found');
                    break;
                case 'Online Subscriptions':
                    this.assert.equal(sectionsList[row][1], onlineSubscriptionPage.pageTitle, 'Expected Online Subscription page title not found');
                    break;
                case 'Order History':
                    this.assert.equal(sectionsList[row][1], orderHistoryPage.pageTitle, 'Expected Order History page title not found');
                    break;
                default:
                    throw new Error('Invalid section name received');
            }
        }
    });
});
cucumber_1.When(/^I open the Cart menu$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield basePage.openEcommerceMenu(this.driver);
    });
});
cucumber_1.When(/^I click on the Send verification email link$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.sendVerificationEmailLocator, 5 * 1000);
        yield accountPage.clickSendVerificationEmailLink(this.driver);
    });
});
cucumber_1.Then(/^A verification e-mail is sent successfully$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 10 * 1000);
        yield helpers_1.Helpers.waitUntilPageTitleIs(this.driver, emailVerificationPage.pageTitle, 10 * 1000);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', emailVerificationPage.confirmationMessageLocator, 5 * 1000);
    });
});
//# sourceMappingURL=eCommerceMenuSteps.js.map