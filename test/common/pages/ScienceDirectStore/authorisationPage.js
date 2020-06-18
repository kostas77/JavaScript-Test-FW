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
class SdAuthorisationPage {
    constructor() {
        this.pageTitle = 'ScienceDirect Sign in';
        this.signInEmailLocator = '#bdd-email';
        this.signInPasswordLocator = '#bdd-password';
        this.continueButtonLocator = '#bdd-elsPrimaryBtn';
        this.signInButtonLocator = '#bdd-elsPrimaryBtn';
        this.staySignedInLocator = '#rememberMe';
    }
    enterSignInEmailAddress(driver, emailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.signInEmailLocator, emailAddress);
        });
    }
    clickContinueButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.continueButtonLocator);
        });
    }
    enterSignInPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.enterText(driver, this.signInPasswordLocator, password);
        });
    }
    clickSignInButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.signInButtonLocator);
        });
    }
    clickStaySignedInCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.staySignedInLocator);
        });
    }
    signInAsKnownCustomer(driver, customerDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterSignInEmailAddress(driver, customerDetails.emailAddress);
            yield this.clickContinueButton(driver);
            yield this.enterSignInPassword(driver, customerDetails.password);
            return yield this.clickSignInButton(driver);
        });
    }
}
exports.SdAuthorisationPage = SdAuthorisationPage;
//# sourceMappingURL=authorisationPage.js.map