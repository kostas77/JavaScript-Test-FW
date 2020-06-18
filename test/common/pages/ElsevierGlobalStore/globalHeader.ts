import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class GlobalHeader {
    // General
    private pageUrl: string;
    private footerLocator: string;
    private modalLocator: string;
    private expandedClass: string;
    private hiddenClass: string;
    // Dropdown menus
    private firstDropdownMenuLocator: string;
    private firstDropdownTriggerLocator: string;
    private firstDropdownListLocator: string;
    private firstLinkInFirstDropdownListLocator: string;
    private secondDropdownTriggerLocator: string;
    // bigSearch
    public readonly bigSearchLocator: string;
    private searchIconLocator: string;
    // Cart widget
    private cartIconLocator: string;
    private cartCountContainerLocator: string;
    private cartCountLocator: string;
    // Profile dropdown
    public readonly signInIconLocator: string;
    public readonly profileDropdownWrapperLocator: string;
    public readonly profileDropdownLocator: string;
    public readonly profileDropdownTriggerLocator: string;
    private profileDropdownInitialsLocator: string;
    private profileDropdownFullNameLocator: string;
    private profileDropdownEmailAddressLocator: string;
    private profileDropdownViewAccountLocator: string;
    private profileDropdownSignOutLocator: string;
    // Mobile menu
    private openMobileMenuButtonLocator: string;
    private closeMobileMenuButtonLocator: string;
    private mobileMenuContainerLocator: string;
    private mobileMenuInitialsLocator: string;
    private mobileMenuEmailAddressLocator: string;
    private mobileMenuViewAccountLocator: string;
    private mobileMenuSignOutLocator: string;

    constructor(testData: ITestData) {
        // General
        this.pageUrl = testData.getUrlFor().elsevier.homeNoCache;
        this.footerLocator = 'footer';
        this.modalLocator = '.gh-modal';
        this.expandedClass = 'expanded';
        this.hiddenClass = 'gh-hide';
        // Dropdown menus
        this.firstDropdownMenuLocator = '.dropdown-wrapper';
        this.firstDropdownTriggerLocator = '.dropdown-trigger';
        this.firstDropdownListLocator = '.dropdown';
        this.firstLinkInFirstDropdownListLocator = '.dropdown a';
        this.secondDropdownTriggerLocator = '.dropdown-wrapper:nth-child(2) .dropdown-trigger';
        // bigSearch
        this.bigSearchLocator = '.bigsearch-area';
        this.searchIconLocator = 'button.bigsearch-toggle';
        // Cart widget
        this.cartIconLocator = 'li[data-aa-region="Cart"] a';
        this.cartCountContainerLocator = '.cart-count-container';
        this.cartCountLocator = '.cart-count';
        // Profile dropdown
        this.signInIconLocator = '.nav-utilities li.sign-in';
        this.profileDropdownWrapperLocator = '.profile-dropdown';
        this.profileDropdownLocator = '.profile-dropdown .dropdown';
        this.profileDropdownTriggerLocator = '.profile-dropdown .dropdown-trigger';
        this.profileDropdownInitialsLocator = '.profile-dropdown .dropdown .profile-badge-initials';
        this.profileDropdownFullNameLocator = '.profile-dropdown .profile-full-name';
        this.profileDropdownEmailAddressLocator = '.profile-dropdown .profile-email';
        this.profileDropdownViewAccountLocator = '.profile-dropdown .view-account-btn';
        this.profileDropdownSignOutLocator = '.profile-dropdown .sign-out-btn';
        // Mobile menu
        this.openMobileMenuButtonLocator = '.open-mobile-menu';
        this.closeMobileMenuButtonLocator = '.close-mobile-menu';
        this.mobileMenuContainerLocator = '.mobile-menu';
        this.mobileMenuInitialsLocator = '.mobile-menu .profile-badge-initials';
        this.mobileMenuEmailAddressLocator = '.mobile-menu .profile-email';
        this.mobileMenuViewAccountLocator = '.mobile-menu .profile-actions a';
        this.mobileMenuSignOutLocator = '.mobile-menu .profile-actions a:nth-child(2)';
    }
    // General
    public async visitHomePage(driver: WebDriver): Promise<void> {
        await driver.get(this.pageUrl);
        await Helpers.removeSurveyPopupElement(driver);
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.searchIconLocator, 30 * 1000);
    }

    public async clickFooter(driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.footerLocator, 20 * 1000);
        const footer = await Helpers.getElement(driver, this.footerLocator);
        return await Helpers.jsClickOnElement(driver, footer);
    }

    public async clickOverlay(driver: WebDriver): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.modalLocator, 20 * 1000);
        const overlay = await Helpers.getElement(driver, this.modalLocator);
        return await Helpers.jsClickOnElement(driver, overlay);
    }

    public async getDisplayValue(driver: WebDriver, expectedState: 'visible' | 'notVisible', selector: string): Promise<string> {
        await Helpers.waitUntilElementHasState(driver, expectedState, selector, 20 * 1000);
        return await (await Helpers.getElement(driver, selector)).getCssValue('display');
    }

    // Dropdown menus
    public async clickFirstDropdownMenuTrigger(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.firstDropdownTriggerLocator);
    }

    public async clickSecondDropdownMenuTrigger(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.secondDropdownTriggerLocator);
    }

    public async firstDropdownListIsVisible(driver: WebDriver, expectedState: 'visible' | 'notVisible'): Promise<boolean> {
        await Helpers.waitUntilElementHasState(driver, expectedState, this.firstDropdownListLocator);
        const classList = await (await Helpers.getElement(driver, this.firstDropdownMenuLocator)).getAttribute('class');
        return classList.includes(this.expandedClass);
    }

    public async firstDropdownListContainsANavigationalLink(driver: WebDriver): Promise<boolean> {
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.firstLinkInFirstDropdownListLocator);
        const href = await (await Helpers.getElement(driver, this.firstLinkInFirstDropdownListLocator)).getAttribute('href');
        return href !== null && href !== '';
    }

    // bigSearch
    public async clickSearchIcon(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.searchIconLocator);
    }

    public async expandBigSearch(driver: WebDriver): Promise<void> {
        if (await this.getDisplayValue(driver, 'notVisible', this.bigSearchLocator) === 'none') {
            await this.clickSearchIcon(driver);
        }
    }

    // Cart

    public async refreshAfterCartAdd(driver: WebDriver): Promise<void> {
        const itemCountBadgeIsHidden = await driver.executeScript(`
            if (document.querySelector('${this.cartCountContainerLocator}').classList.contains('${this.hiddenClass}')) {
                return true;
            } else {
                return false;
            }
        `);
        if (itemCountBadgeIsHidden) {
            console.log('- Cart API call skipped due to caching. Refreshing page to remove cache...');
            return await driver.navigate().refresh();
        }
    }

    public async clickCartIcon(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.cartIconLocator);
    }

    public async getCartWidgetItemCountAsString(driver: WebDriver): Promise<string> {
        await Helpers.waitUntilElementHasState(driver, 'visible', this.cartCountLocator, 20 * 1000);
        return await (await Helpers.getElement(driver, this.cartCountLocator)).getText();
    }

    // Profile dropdown

    public async refreshAfterLogin(driver: WebDriver): Promise<void> {
        const loginIconIsStillVisible = await driver.executeScript(`
            if (document.querySelector('${this.signInIconLocator}').classList.contains('${this.hiddenClass}')) {
                return false;
            } else {
                return true;
            }
        `);
        if (loginIconIsStillVisible) {
            console.log('- Cart API call skipped due to caching. Refreshing page to remove cache...');
            return await driver.navigate().refresh();
        }
    }

    public async clickSignInIcon(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.signInIconLocator);
    }

    public async clickProfileIcon(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.profileDropdownTriggerLocator);
    }

    public async clickProfileDropdownViewAccountButton(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.profileDropdownViewAccountLocator);
    }

    public async expandProfileDropdown(driver: WebDriver): Promise<void> {
        if (await this.getDisplayValue(driver, 'notVisible', this.profileDropdownLocator) === 'none') {
            await this.clickProfileIcon(driver);
        }
    }

    public async getProfileIconInitials(driver: WebDriver): Promise<string> {
        const initials = await (await Helpers.getElement(driver, this.profileDropdownTriggerLocator)).getText();
        return initials.trim();
    }

    public async getProfileDropdownInitials(driver: WebDriver): Promise<string> {
        const initials = await (await Helpers.getElement(driver, this.profileDropdownInitialsLocator)).getText();
        return initials.trim();
    }

    public async getProfileDropdownFullName(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.profileDropdownFullNameLocator)).getText();
    }

    public async getProfileDropdownEmailAddress(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.profileDropdownEmailAddressLocator)).getText();
    }

    public async getProfileDropdownSignOutButtonHref(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.profileDropdownSignOutLocator)).getAttribute('href');
    }

    // Mobile menu
    public async clickOpenMobileMenuButton(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.openMobileMenuButtonLocator);
    }

    public async clickCloseMobileMenuButton(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.closeMobileMenuButtonLocator);
    }

    public async clickMobileMenuViewAccountButton(driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.mobileMenuViewAccountLocator);
    }

    public async mobileMenuHasExpandedClass(driver: WebDriver): Promise<boolean> {
        const classList = await (await Helpers.getElement(driver, this.mobileMenuContainerLocator)).getAttribute('class');
        return classList.includes(this.expandedClass);
    }

    public async getMobileMenuRightValue(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.mobileMenuContainerLocator)).getCssValue('right');
    }

    public async getMobileMenuInitials(driver: WebDriver): Promise<string> {
        const initials = await (await Helpers.getElement(driver, this.mobileMenuInitialsLocator)).getText();
        return initials.trim();
    }

    public async getMobileMenuEmailAddress(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.mobileMenuEmailAddressLocator)).getText();
    }

    public async getMobileMenuSignOutButtonHref(driver: WebDriver): Promise<string> {
        return await (await Helpers.getElement(driver, this.mobileMenuSignOutLocator)).getAttribute('href');
    }
}
