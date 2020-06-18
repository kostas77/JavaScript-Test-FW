import { until, WebElement, WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class BasePage {

    public openMainMenuButtonLocator: string;
    public mainMenuLocator: string;
    public modalLocator: string;
    public closeMainMenuButtonLocator: string;
    public mainMenuOpenLocator: string;
    public relxFooterImageLocator: string;
    public searchIconLocator: string;
    public searchBoxLocator: string;
    public searchButtonLocator: string;
    public cartLocator: string;
    public openMenuLocator: string;
    public cartTotalLocator: string;
    public cartMenuLocator: string;
    public viewCartOptionLocator: string;
    public registerLoginOptionLocator: string;
    public accountOptionLocator: string;
    public helpAndContactLocator: string;
    public whatIsThisOptionLocator: string;
    public logoutOptionLocator: string;
    public visibleEcommerceOptionLocator: string;
    public menuHamburgerLocator: string;

    constructor() {
        this.openMainMenuButtonLocator = '.js-header-menu-toggle-open';
        this.mainMenuLocator = 'aside.primary-menu';
        this.modalLocator = 'div.modal';
        this.closeMainMenuButtonLocator = '.js-header-menu-toggle-open';
        this.mainMenuOpenLocator = 'aside.primary-menu.open';
        this.relxFooterImageLocator = '.els_link-image'; // '.logo-relx'
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

    public async searchIcon (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.searchIconLocator);
    }

    public async searchBox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.searchBoxLocator);
    }

    public async searchButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.searchButtonLocator);
    }

    public async menuHamburger (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.menuHamburgerLocator);
    }

    public async menuOption (driver: WebDriver, linkTextValue: string): Promise<WebElement> {
        return await driver.findElement({ linkText: linkTextValue });
    }

    public async openMainMenu (driver: WebDriver) {
        return await (await Helpers.getElement(driver, this.openMainMenuButtonLocator)).click();
    }

    public async menuIsOpen (driver: WebDriver) {
        const menu = this.mainMenuLocator;
        return await Helpers.hasClass(driver, menu, 'open');
    }

    public async modalIsShown (driver: WebDriver) {
        const modal = this.modalLocator;
        return await (await Helpers.getElement(driver, modal)).isDisplayed();
    }

    private async enterSearchTerm (driver: WebDriver, searchTerm: string) {
        return await (await Helpers.getElement(driver, this.searchBoxLocator)).sendKeys(searchTerm);
    }

    public async performSearch (driver: WebDriver, searchTerm: string) {
        await (await Helpers.getElement(driver, this.searchIconLocator)).click();
        await this.enterSearchTerm(driver, searchTerm);
        return await (await Helpers.getElement(driver, this.searchButtonLocator)).click();
    }

    public async openSubMenu (driver: WebDriver, subMenuText: string): Promise<void> {
        return await (await this.menuOption(driver, subMenuText)).click();
    }

    public async selectMenuOption (driver: WebDriver, menuItem: string): Promise<void> {
        return await (await this.menuOption(driver, menuItem)).click();
    }

    public async cartIcon (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartLocator);
    }

    public async clickCartIcon (driver: WebDriver): Promise<void> {
        return await (await this.cartIcon(driver)).click();
    }

    public async openMenuIcon (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.openMenuLocator);
    }

    public async cartCount (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartTotalLocator);
    }

    public async ecommerceMenu (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartMenuLocator);
    }

    public async openEcommerceMenu (driver: WebDriver): Promise<void> {
        await driver.executeScript(
            ` document.querySelector('.shopping-cart-dropdown-container').addEventListener("transitionend", function() {
          var cartIcon = document.querySelector('.shopping-cart-container');
          var dropdown = document.querySelector('.shopping-cart-dropdown');
          if(cartIcon.classList.contains('show-menu')) {
            dropdown.classList.add('menu-shown');
          } else {
            dropdown.classList.remove('menu-shown');
          }
        }, false);`);
        return await (await this.cartIcon(driver)).click();
    }

    public async visibleEcommerceMenuOptions (driver: WebDriver): Promise<WebElement[]> {
        return await Helpers.getElementsArray(driver, this.visibleEcommerceOptionLocator);
    }

    public async viewCartMenuOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.viewCartOptionLocator);
    }

    public async selectViewCartMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.viewCartMenuOption(driver)).click();
    }

    public async registerLoginMenuOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.registerLoginOptionLocator);
    }

    public async selectRegisterLoginMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.registerLoginMenuOption(driver)).click();
    }

    public async accountMenuOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.accountOptionLocator);
    }

    public async selectAccountMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.accountMenuOption(driver)).click();
    }

    public async whatIsThisMenuOption (driver: WebDriver): Promise<WebElement> {
        return Helpers.getElement(driver, this.whatIsThisOptionLocator);
    }

    public async selectWhatIsThisMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.whatIsThisMenuOption(driver)).click();
    }

    public async helpAndContactMenuOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.helpAndContactLocator);
    }

    public async selectHelpAndContactMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.helpAndContactMenuOption(driver)).click();
    }

    public async logoutMenuOption (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.logoutOptionLocator);
    }

    public async selectLogoutMenuOption (driver: WebDriver): Promise<void> {
        return await (await this.logoutMenuOption(driver)).click();
    }

    public async openEcommerceMenuAndSelectOption (driver: WebDriver, option: string): Promise<void> {
        await driver.executeScript(`
        document.querySelector('.shopping-cart-dropdown-container').addEventListener("transitionend", function() {
        var cartIcon = document.querySelector('.shopping-cart-container');
        var dropdown = document.querySelector('.shopping-cart-dropdown');
        if(cartIcon.classList.contains('show-menu')) {
          dropdown.classList.add('menu-shown');
        } else {
           dropdown.classList.remove('menu-shown');
        }
        }, false);`);
        let menuElement: WebElement;
        switch (option) {
            case 'View Cart':
                menuElement = await this.viewCartMenuOption(driver);
                break;
            case 'Register/Login':
                menuElement = await this.registerLoginMenuOption(driver);
                break;
            case 'Account':
                menuElement = await this.accountMenuOption(driver);
                break;
            case 'Help and Contact':
                menuElement = await this.helpAndContactMenuOption(driver);
                break;
            case 'What is this?':
                menuElement = await this.whatIsThisMenuOption(driver);
                break;
            case 'Logout':
                menuElement = await this.logoutMenuOption(driver);
                break;
            default:
                throw new Error('Unknown menu option requested in basePage.openEcommerceMenuAndSelectOption(): ' + option);
        }
        await this.openEcommerceMenu(driver);
        await driver.wait(until.elementIsVisible(await this.whatIsThisMenuOption(driver)));
        await menuElement.click();
    }

    public async relxFooterImage(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.relxFooterImageLocator);
    }
}
