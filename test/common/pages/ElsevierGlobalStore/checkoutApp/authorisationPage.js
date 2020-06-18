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
const config = new driverConfig_1.DriverConfig();
class AuthorisationPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.auth;
        this.pageTitle = 'Signup | Login | Elsevier';
        this.captchaLocator = '#registration_form > div:nth-child(6) > div > div';
        this.firstNameLocator = '#signup-firstName';
        this.lastNameLocator = '#signup-lastName';
        this.signUpEmailLocator = '#signup-email';
        this.signUpPasswordLocator = '#signup-password';
        this.confirmPasswordLocator = '#signup-password-2';
        this.termsLocator = '#accept-terms';
        this.createAccountLocator = '#cd-signup [value="Create account"]';
        this.signInEmailLocator = '#signin-email';
        this.signInPasswordLocator = '#signin-password';
        this.loginLocator = '#cd-login [value="Log In"]';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    createAccountButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.createAccountLocator);
        });
    }
    enterFirstName(driver, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.firstNameLocator)).sendKeys(firstName);
        });
    }
    enterLastName(driver, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.lastNameLocator)).sendKeys(lastName);
        });
    }
    enterSignUpEmailAddress(driver, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.signUpEmailLocator)).sendKeys(emailAddress);
        });
    }
    enterSignUpPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.signUpPasswordLocator)).sendKeys(password);
        });
    }
    confirmSignUpPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.confirmPasswordLocator)).sendKeys(password);
        });
    }
    clickTermsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.termsLocator)).click();
        });
    }
    selectCreateAccountButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.createAccountButton(driver)).click();
        });
    }
    enterSignInEmailAddress(driver, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield helpers_1.Helpers.getElement(driver, this.signInEmailLocator)).sendKeys(emailAddress);
            if (config.browserName === 'ie') {
                const textValue = yield driver.executeScript('return document.getElementById("signin-email").value;');
                if (textValue !== emailAddress) {
                    console.log('retrying email address...');
                    yield (yield helpers_1.Helpers.getElement(driver, this.signInEmailLocator)).clear();
                    yield (yield helpers_1.Helpers.getElement(driver, this.signInEmailLocator)).sendKeys(emailAddress);
                }
            }
            return;
        });
    }
    enterSignInPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield helpers_1.Helpers.getElement(driver, this.signInPasswordLocator)).sendKeys(password);
            if (config.browserName === 'ie') {
                const textValue = yield driver.executeScript('return document.getElementById("signin-password").value;');
                if (textValue !== password) {
                    console.log('retrying password...');
                    yield (yield helpers_1.Helpers.getElement(driver, this.signInPasswordLocator)).clear();
                    yield (yield helpers_1.Helpers.getElement(driver, this.signInPasswordLocator)).sendKeys(password);
                }
            }
            return;
        });
    }
    clickLoginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.loginLocator, 10 * 1000);
            yield (yield helpers_1.Helpers.getElement(driver, this.loginLocator)).click();
            return;
        });
    }
    signInAsKnownCustomer(driver, customerDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterSignInEmailAddress(driver, customerDetails.emailAddress);
            yield this.enterSignInPassword(driver, customerDetails.password);
            return yield this.clickLoginButton(driver);
        });
    }
}
exports.AuthorisationPage = AuthorisationPage;
//# sourceMappingURL=authorisationPage.js.map