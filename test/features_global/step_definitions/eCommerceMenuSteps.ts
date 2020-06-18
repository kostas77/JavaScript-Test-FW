import { WebElement } from 'selenium-webdriver';
import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';

import { BasePage } from '../../common/pages/ElsevierGlobalStore/basePage';
import { AddressBookPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/addressBookPage';
import { AccountPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/accountPage';
import { EmailVerificationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/emailVerificationPage';
import { AuthorisationPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/authorisationPage';
import { ChangePasswordPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/changePasswordPage';
import { OnlineSubscriptionPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/onlineSubscriptionPage';
import { OrderHistoryPage } from '../../common/pages/ElsevierGlobalStore/checkoutApp/orderHistoryPage';
import { TestData } from '../support/testData';

const testData = new TestData();
let menuOptionsTable: string[];
const basePage = new BasePage();
const accountPage = new AccountPage(testData);
const emailVerificationPage = new EmailVerificationPage(testData);
const addressBookPage = new AddressBookPage(testData);
const authorisationPage = new AuthorisationPage(testData);
const changePasswordPage = new ChangePasswordPage();
const onlineSubscriptionPage = new OnlineSubscriptionPage();
const orderHistoryPage = new OrderHistoryPage('Elsevier', testData);

let sectionsList = [];

defineStep(/^I am logged in$/, async function (): Promise<void> {
    await authorisationPage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', authorisationPage.termsLocator, 5 * 1000);
    let pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, authorisationPage.pageTitle, 'Expected Authorisation page title not found');
    await authorisationPage.signInAsKnownCustomer(this.driver, this.customerDetails);
    await Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.contactInformationHeaderLocator, 5 * 1000);
    pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, accountPage.pageTitle, 'Expected Account page title not found');
});

defineStep(/^I am not logged in$/, async function (): Promise<void> {
    await this.driver.get(testData.getUrlFor().elsevier.logout);
});

defineStep(/^I navigate to the following sections:$/, { timeout: 120 * 1000 }, async function (sections): Promise<void> {
    sectionsList = sections.rows();
    let menuOptionElement: WebElement;
    let elementLocator = '';
    for (const row in sectionsList) {
        switch (sectionsList[row][0]) {
            case 'Personal Details':
                menuOptionElement = await accountPage.personalDetailsOption(this.driver);
                elementLocator = accountPage.contactInformationHeaderLocator;
                break;
            case 'Address Book':
                menuOptionElement = await accountPage.addressBookOption(this.driver);
                elementLocator = addressBookPage.billingAddressLabelLocator;
                break;
            case 'Change Password':
                menuOptionElement = await accountPage.changePasswordOption(this.driver);
                elementLocator = changePasswordPage.changePasswordLabelLocator;
                break;
            case 'Online Subscriptions':
                menuOptionElement = await accountPage.onlineSubscriptionOption(this.driver);
                elementLocator = onlineSubscriptionPage.onlineSubscriptionSubscriptionHeaderLocator;
                break;
            case 'Order History':
                menuOptionElement = await accountPage.orderHistoryOption(this.driver);
                elementLocator = orderHistoryPage.orderHistoryOrderHeaderLocator;
                break;
            default:
                throw new Error('Invalid section name received in When.(I navigate to the following section) step:' + sectionsList[row][0]);
        }
        await (await menuOptionElement).click();
        await Helpers.waitUntilElementHasState(this.driver, 'located', elementLocator, 40 * 1000);
        sectionsList[row][1] = await Helpers.getPageTitle(this.driver);
    }
});

defineStep(/^The following options are displayed:$/, async function (menuOptions): Promise<void> {
    menuOptionsTable = menuOptions.rows();
    const visibleElements = await basePage.visibleEcommerceMenuOptions(this.driver);
    if (visibleElements.length < menuOptionsTable.length) {
        throw new Error('Menu does not show all expected options');
    }
    for (const row in visibleElements) {
        const menuOptionText = await visibleElements[row].getText();
        try {
            this.assert.equal(menuOptionText, menuOptionsTable[row].toString(), 'Expected menu option not displayed');
        } catch (err) {
            if (err.name === 'TypeError') {
                throw new Error('Additional menu option found on page: ' + menuOptionText);
            } else {
                throw new Error(err);
            }
        }
    }
    await basePage.openEcommerceMenu(this.driver);
});

defineStep(/^I am taken to the correct page$/, async function (): Promise<void> {
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

defineStep(/^I open the Cart menu$/, async function (): Promise<void> {
    await basePage.openEcommerceMenu(this.driver);
     // TODO: `this.whatIsThisMenuOption` currently refers to world, not a page.
     // TODO: Use Helpers.waitUntilElementHasState();
    // await Helpers.waitUntilElementHasState(this.driver, 'visible', await this.whatIsThisMenuOption(this.driver), 10000);
});

defineStep(/^I click on the Send verification email link$/, async function (): Promise<void> {
    await Helpers.waitUntilElementHasState(this.driver, 'located', accountPage.sendVerificationEmailLocator, 5 * 1000);
    await accountPage.clickSendVerificationEmailLink(this.driver);
});

defineStep(/^A verification e-mail is sent successfully$/, async function (): Promise<void> {
    await Helpers.jsWaitUntilPageLoadComplete(this.driver, 10 * 1000);
    await Helpers.waitUntilPageTitleIs(this.driver, emailVerificationPage.pageTitle, 10 * 1000);
    await Helpers.waitUntilElementHasState(this.driver, 'located', emailVerificationPage.confirmationMessageLocator, 5 * 1000);
});
