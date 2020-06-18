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
class AccountPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.account;
        this.pageTitle = 'My Account | Elsevier';
        this.contactInformationHeaderLocator = '.text-center+ .columns h4';
        this.personalDetailsOptionLocator = '#cd-main-nav > ul > li:nth-child(1) > a';
        this.addressBookOptionLocator = '#cd-main-nav > ul > li:nth-child(2) > a';
        this.changePasswordOptionLocator = '#cd-main-nav > ul > li:nth-child(3) > a';
        this.onlineSubscriptionOptionLocator = '#cd-main-nav > ul > li:nth-child(4) > a';
        this.orderHistoryOptionLocator = '#cd-main-nav > ul > li:nth-child(5) > a';
        this.customerDetailsLocator = '#dashboard > div:nth-child(2) > p:nth-child(3)';
        this.sendVerificationEmailLocator = '#dashboard > div:nth-child(2) > p:nth-child(3) a';
        this.editAddressesLocator = '.account-addresses+ .columns a';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    personalDetailsOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.personalDetailsOptionLocator);
        });
    }
    selectPersonalDetailsOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.personalDetailsOption(driver)).click();
        });
    }
    sendVerificationEmailLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.sendVerificationEmailLocator);
        });
    }
    clickSendVerificationEmailLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.sendVerificationEmailLink(driver)).click();
        });
    }
    addressBookOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addressBookOptionLocator);
        });
    }
    selectAddressBookOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.addressBookOption(driver)).click();
        });
    }
    changePasswordOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return helpers_1.Helpers.getElement(driver, this.changePasswordOptionLocator);
        });
    }
    selectChangePasswordOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.changePasswordOption(driver)).click();
        });
    }
    onlineSubscriptionOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.onlineSubscriptionOptionLocator);
        });
    }
    selectOnlineSubscriptionOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.onlineSubscriptionOption(driver)).click();
        });
    }
    orderHistoryOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderHistoryOptionLocator);
        });
    }
    selectOrderHistoryOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.orderHistoryOption(driver)).click();
        });
    }
    customerDetails(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.customerDetailsLocator);
        });
    }
    selectEditAddressesLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.editAddressesLocator)).click();
        });
    }
}
exports.AccountPage = AccountPage;
//# sourceMappingURL=accountPage.js.map