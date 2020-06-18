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
class GlobalHeader {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.homeNoCache;
        this.footerLocator = 'footer';
        this.modalLocator = '.gh-modal';
        this.expandedClass = 'expanded';
        this.hiddenClass = 'gh-hide';
        this.firstDropdownMenuLocator = '.dropdown-wrapper';
        this.firstDropdownTriggerLocator = '.dropdown-trigger';
        this.firstDropdownListLocator = '.dropdown';
        this.firstLinkInFirstDropdownListLocator = '.dropdown a';
        this.secondDropdownTriggerLocator = '.dropdown-wrapper:nth-child(2) .dropdown-trigger';
        this.bigSearchLocator = '.bigsearch-area';
        this.searchIconLocator = 'button.bigsearch-toggle';
        this.cartIconLocator = 'li[data-aa-region="Cart"] a';
        this.cartCountContainerLocator = '.cart-count-container';
        this.cartCountLocator = '.cart-count';
        this.signInIconLocator = '.nav-utilities li.sign-in';
        this.profileDropdownWrapperLocator = '.profile-dropdown';
        this.profileDropdownLocator = '.profile-dropdown .dropdown';
        this.profileDropdownTriggerLocator = '.profile-dropdown .dropdown-trigger';
        this.profileDropdownInitialsLocator = '.profile-dropdown .dropdown .profile-badge-initials';
        this.profileDropdownFullNameLocator = '.profile-dropdown .profile-full-name';
        this.profileDropdownEmailAddressLocator = '.profile-dropdown .profile-email';
        this.profileDropdownViewAccountLocator = '.profile-dropdown .view-account-btn';
        this.profileDropdownSignOutLocator = '.profile-dropdown .sign-out-btn';
        this.openMobileMenuButtonLocator = '.open-mobile-menu';
        this.closeMobileMenuButtonLocator = '.close-mobile-menu';
        this.mobileMenuContainerLocator = '.mobile-menu';
        this.mobileMenuInitialsLocator = '.mobile-menu .profile-badge-initials';
        this.mobileMenuEmailAddressLocator = '.mobile-menu .profile-email';
        this.mobileMenuViewAccountLocator = '.mobile-menu .profile-actions a';
        this.mobileMenuSignOutLocator = '.mobile-menu .profile-actions a:nth-child(2)';
    }
    visitHomePage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.get(this.pageUrl);
            yield helpers_1.Helpers.removeSurveyPopupElement(driver);
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.searchIconLocator, 30 * 1000);
        });
    }
    clickFooter(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.footerLocator, 20 * 1000);
            const footer = yield helpers_1.Helpers.getElement(driver, this.footerLocator);
            return yield helpers_1.Helpers.jsClickOnElement(driver, footer);
        });
    }
    clickOverlay(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.modalLocator, 20 * 1000);
            const overlay = yield helpers_1.Helpers.getElement(driver, this.modalLocator);
            return yield helpers_1.Helpers.jsClickOnElement(driver, overlay);
        });
    }
    getDisplayValue(driver, expectedState, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, expectedState, selector, 20 * 1000);
            return yield (yield helpers_1.Helpers.getElement(driver, selector)).getCssValue('display');
        });
    }
    clickFirstDropdownMenuTrigger(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.firstDropdownTriggerLocator);
        });
    }
    clickSecondDropdownMenuTrigger(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.secondDropdownTriggerLocator);
        });
    }
    firstDropdownListIsVisible(driver, expectedState) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, expectedState, this.firstDropdownListLocator);
            const classList = yield (yield helpers_1.Helpers.getElement(driver, this.firstDropdownMenuLocator)).getAttribute('class');
            return classList.includes(this.expandedClass);
        });
    }
    firstDropdownListContainsANavigationalLink(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'clickable', this.firstLinkInFirstDropdownListLocator);
            const href = yield (yield helpers_1.Helpers.getElement(driver, this.firstLinkInFirstDropdownListLocator)).getAttribute('href');
            return href !== null && href !== '';
        });
    }
    clickSearchIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.searchIconLocator);
        });
    }
    expandBigSearch(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getDisplayValue(driver, 'notVisible', this.bigSearchLocator)) === 'none') {
                yield this.clickSearchIcon(driver);
            }
        });
    }
    refreshAfterCartAdd(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemCountBadgeIsHidden = yield driver.executeScript(`
            if (document.querySelector('${this.cartCountContainerLocator}').classList.contains('${this.hiddenClass}')) {
                return true;
            } else {
                return false;
            }
        `);
            if (itemCountBadgeIsHidden) {
                console.log('- Cart API call skipped due to caching. Refreshing page to remove cache...');
                return yield driver.navigate().refresh();
            }
        });
    }
    clickCartIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.cartIconLocator);
        });
    }
    getCartWidgetItemCountAsString(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'visible', this.cartCountLocator, 20 * 1000);
            return yield (yield helpers_1.Helpers.getElement(driver, this.cartCountLocator)).getText();
        });
    }
    refreshAfterLogin(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginIconIsStillVisible = yield driver.executeScript(`
            if (document.querySelector('${this.signInIconLocator}').classList.contains('${this.hiddenClass}')) {
                return false;
            } else {
                return true;
            }
        `);
            if (loginIconIsStillVisible) {
                console.log('- Cart API call skipped due to caching. Refreshing page to remove cache...');
                return yield driver.navigate().refresh();
            }
        });
    }
    clickSignInIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.signInIconLocator);
        });
    }
    clickProfileIcon(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.profileDropdownTriggerLocator);
        });
    }
    clickProfileDropdownViewAccountButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.profileDropdownViewAccountLocator);
        });
    }
    expandProfileDropdown(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getDisplayValue(driver, 'notVisible', this.profileDropdownLocator)) === 'none') {
                yield this.clickProfileIcon(driver);
            }
        });
    }
    getProfileIconInitials(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const initials = yield (yield helpers_1.Helpers.getElement(driver, this.profileDropdownTriggerLocator)).getText();
            return initials.trim();
        });
    }
    getProfileDropdownInitials(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const initials = yield (yield helpers_1.Helpers.getElement(driver, this.profileDropdownInitialsLocator)).getText();
            return initials.trim();
        });
    }
    getProfileDropdownFullName(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.profileDropdownFullNameLocator)).getText();
        });
    }
    getProfileDropdownEmailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.profileDropdownEmailAddressLocator)).getText();
        });
    }
    getProfileDropdownSignOutButtonHref(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.profileDropdownSignOutLocator)).getAttribute('href');
        });
    }
    clickOpenMobileMenuButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.openMobileMenuButtonLocator);
        });
    }
    clickCloseMobileMenuButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.closeMobileMenuButtonLocator);
        });
    }
    clickMobileMenuViewAccountButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.clickElement(driver, this.mobileMenuViewAccountLocator);
        });
    }
    mobileMenuHasExpandedClass(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const classList = yield (yield helpers_1.Helpers.getElement(driver, this.mobileMenuContainerLocator)).getAttribute('class');
            return classList.includes(this.expandedClass);
        });
    }
    getMobileMenuRightValue(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.mobileMenuContainerLocator)).getCssValue('right');
        });
    }
    getMobileMenuInitials(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            const initials = yield (yield helpers_1.Helpers.getElement(driver, this.mobileMenuInitialsLocator)).getText();
            return initials.trim();
        });
    }
    getMobileMenuEmailAddress(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.mobileMenuEmailAddressLocator)).getText();
        });
    }
    getMobileMenuSignOutButtonHref(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.mobileMenuSignOutLocator)).getAttribute('href');
        });
    }
}
exports.GlobalHeader = GlobalHeader;
//# sourceMappingURL=globalHeader.js.map