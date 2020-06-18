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
const commonTestData_1 = require("../../support/commonTestData");
const commonTestData = new commonTestData_1.CommonTestData();
class OrrLoginPage {
    constructor() {
        this.pageTitle = 'Elsevier Commerce -';
        this.pageTitleLocator = 'head > title';
        this.pageUrl = commonTestData.getUrlFor().orr.home;
        this.usernameTextBoxLocator = 'input[name="username"]';
        this.passwordTextBoxLocator = 'input[name="password"]';
        this.logInButtonLocator = 'input[type="submit"][value="Log In"]';
        this.copyrightLocator = '.large-9 p';
        this.mainTitleLocator = 'h1';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    mainTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.mainTitleLocator);
        });
    }
    usernameTextBox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.usernameTextBoxLocator);
        });
    }
    passwordTextBox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.passwordTextBoxLocator);
        });
    }
    logInButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.logInButtonLocator);
        });
    }
    logIn(driver, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.usernameTextBox(driver)).sendKeys(username);
            yield (yield this.passwordTextBox(driver)).sendKeys(password);
            return yield (yield this.logInButton(driver)).click();
        });
    }
}
exports.OrrLoginPage = OrrLoginPage;
//# sourceMappingURL=orrLoginPage.js.map