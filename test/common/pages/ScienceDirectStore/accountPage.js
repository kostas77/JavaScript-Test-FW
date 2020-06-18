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
const helpers_1 = require("../../support/helpers");
class AccountPage {
    constructor() {
        this.pageTitle = 'My Account | Elsevier';
        this.contactInformationHeaderLocator = 'header-item__text';
        this.personalDetailsOptionLocator = '#cd-main-nav > ul > li:nth-child(1) > a';
        this.addressBookOptionLocator = '#cd-main-nav > ul > li:nth-child(2) > a';
        this.changePasswordOptionLocator = '#cd-main-nav > ul > li:nth-child(3) > a';
        this.onlineSubscriptionOptionLocator = '#cd-main-nav > ul > li:nth-child(4) > a';
        this.orderHistoryOptionLocator = '#cd-main-nav > ul > li:nth-child(5) > a';
        this.customerDetailsLocator = '#dashboard > div:nth-child(2) > p:nth-child(3)';
        this.editAddressesLocator = '.account-addresses+ .columns a';
    }
    clickPersonalDetailsOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.personalDetailsOptionLocator);
        });
    }
    clickAddressBookOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.addressBookOptionLocator);
        });
    }
    clickChangePasswordOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.changePasswordOptionLocator);
        });
    }
    clickOnlineSubscriptionOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.onlineSubscriptionOptionLocator);
        });
    }
    clickOrderHistoryOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.orderHistoryOptionLocator);
        });
    }
    customerDetails(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.customerDetailsLocator);
        });
    }
    clickEditAddressesLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.editAddressesLocator);
        });
    }
}
exports.AccountPage = AccountPage;
//# sourceMappingURL=accountPage.js.map