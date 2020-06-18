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
const selenium_webdriver_1 = require("selenium-webdriver");
const helpers_1 = require("../../support/helpers");
class BasePage {
    constructor() {
        this.openMainMenuButtonLocator = '.js-header-menu-toggle-open';
        this.mainMenuLocator = 'aside.primary-menu';
        this.modalLocator = 'div.modal';
        this.closeMainMenuButtonLocator = '.js-header-menu-toggle-open';
        this.mainMenuOpenLocator = 'aside.primary-menu.open';
        this.relxFooterImageLocator = '.els_link-image';
        this.searchIconLocator = '.bigsearch-toggle';
        this.searchBoxLocator = '#search';
        this.searchButtonLocator = '.search-form-button';
        this.cartLocator = '.shopping-cart-container>.menu-container-icon';
        this.openMenuLocator = '.shopping-cart-icon .menu-shown';
        this.cartTotalLocator = '.shopping-cart-count';
        this.cartMenuLocator = '.shopping-cart-dropdown';
        this.viewCartOptionLocator = '.dd-view-cart>a';
        this.registerLoginOptionLocator = '.dd-login-register';
        this.accountOptionLocator = '.dd-account';
        this.helpAndContactLocator = '.dd-help';
        this.whatIsThisOptionLocator = '.menu-shown .dd-what';
        this.logoutOptionLocator = '.dd-logout ';
        this.visibleEcommerceOptionLocator = '.shopping-cart-dropdown-container  li:not(.hide)';
        this.menuHamburgerLocator = 'span.menu-toggle-icon';
    }
    searchIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.searchIconLocator);
        });
    }
    searchBox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.searchBoxLocator);
        });
    }
    searchButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.searchButtonLocator);
        });
    }
    menuHamburger(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.menuHamburgerLocator);
        });
    }
    menuOption(driver, linkTextValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.findElement({ linkText: linkTextValue });
        });
    }
    openMainMenu(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.openMainMenuButtonLocator)).click();
        });
    }
    menuIsOpen(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = this.mainMenuLocator;
            return yield helpers_1.Helpers.hasClass(driver, menu, 'open');
        });
    }
    modalIsShown(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = this.modalLocator;
            return yield (yield helpers_1.Helpers.getElement(driver, modal)).isDisplayed();
        });
    }
    enterSearchTerm(driver, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchBoxLocator)).sendKeys(searchTerm);
        });
    }
    performSearch(driver, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield helpers_1.Helpers.getElement(driver, this.searchIconLocator)).click();
            yield this.enterSearchTerm(driver, searchTerm);
            return yield (yield helpers_1.Helpers.getElement(driver, this.searchButtonLocator)).click();
        });
    }
    openSubMenu(driver, subMenuText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.menuOption(driver, subMenuText)).click();
        });
    }
    selectMenuOption(driver, menuItem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.menuOption(driver, menuItem)).click();
        });
    }
    cartIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartLocator);
        });
    }
    clickCartIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.cartIcon(driver)).click();
        });
    }
    openMenuIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.openMenuLocator);
        });
    }
    cartCount(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartTotalLocator);
        });
    }
    ecommerceMenu(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.cartMenuLocator);
        });
    }
    openEcommerceMenu(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript(` document.querySelector('.shopping-cart-dropdown-container').addEventListener("transitionend", function() {
          var cartIcon = document.querySelector('.shopping-cart-container');
          var dropdown = document.querySelector('.shopping-cart-dropdown');
          if(cartIcon.classList.contains('show-menu')) {
            dropdown.classList.add('menu-shown');
          } else {
            dropdown.classList.remove('menu-shown');
          }
        }, false);`);
            return yield (yield this.cartIcon(driver)).click();
        });
    }
    visibleEcommerceMenuOptions(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElementsArray(driver, this.visibleEcommerceOptionLocator);
        });
    }
    viewCartMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.viewCartOptionLocator);
        });
    }
    selectViewCartMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.viewCartMenuOption(driver)).click();
        });
    }
    registerLoginMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.registerLoginOptionLocator);
        });
    }
    selectRegisterLoginMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.registerLoginMenuOption(driver)).click();
        });
    }
    accountMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.accountOptionLocator);
        });
    }
    selectAccountMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.accountMenuOption(driver)).click();
        });
    }
    whatIsThisMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return helpers_1.Helpers.getElement(driver, this.whatIsThisOptionLocator);
        });
    }
    selectWhatIsThisMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.whatIsThisMenuOption(driver)).click();
        });
    }
    helpAndContactMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.helpAndContactLocator);
        });
    }
    selectHelpAndContactMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.helpAndContactMenuOption(driver)).click();
        });
    }
    logoutMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.logoutOptionLocator);
        });
    }
    selectLogoutMenuOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.logoutMenuOption(driver)).click();
        });
    }
    openEcommerceMenuAndSelectOption(driver, option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.executeScript(`
        document.querySelector('.shopping-cart-dropdown-container').addEventListener("transitionend", function() {
        var cartIcon = document.querySelector('.shopping-cart-container');
        var dropdown = document.querySelector('.shopping-cart-dropdown');
        if(cartIcon.classList.contains('show-menu')) {
          dropdown.classList.add('menu-shown');
        } else {
           dropdown.classList.remove('menu-shown');
        }
        }, false);`);
            let menuElement;
            switch (option) {
                case 'View Cart':
                    menuElement = yield this.viewCartMenuOption(driver);
                    break;
                case 'Register/Login':
                    menuElement = yield this.registerLoginMenuOption(driver);
                    break;
                case 'Account':
                    menuElement = yield this.accountMenuOption(driver);
                    break;
                case 'Help and Contact':
                    menuElement = yield this.helpAndContactMenuOption(driver);
                    break;
                case 'What is this?':
                    menuElement = yield this.whatIsThisMenuOption(driver);
                    break;
                case 'Logout':
                    menuElement = yield this.logoutMenuOption(driver);
                    break;
                default:
                    throw new Error('Unknown menu option requested in basePage.openEcommerceMenuAndSelectOption(): ' + option);
            }
            yield this.openEcommerceMenu(driver);
            yield driver.wait(selenium_webdriver_1.until.elementIsVisible(yield this.whatIsThisMenuOption(driver)));
            yield menuElement.click();
        });
    }
    relxFooterImage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.relxFooterImageLocator);
        });
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=basePage.js.map