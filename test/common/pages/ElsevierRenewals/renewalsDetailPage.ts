import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { DriverConfig } from '../../../features_global/support/driverConfig';

const config = new DriverConfig();

export class RenewalsDetailPage {
    public pageTitle: string;
    // public headerTextLocator: string;
    // public headerTextValue: string;
    public cartTotalPriceLocator: string;
    public taxPriceLocator: string;
    public discountPriceLocator: string;
    public subTotalPriceLocator: string;
    public orderTotalPriceLocator: string;
    public tAndCCheckboxLocator: string;
    public selectAllRenewalsCheckboxLocator: string;
    public proceedToCheckoutButtonLocator: string;

    constructor() {
        this.pageTitle = 'Your Journal subscriptions for renewal | Elsevier';
        // this.headerTextLocator = '.row-title, .page-header';
        // this.headerTextValue = 'Renew your subscriptions today';
        this.cartTotalPriceLocator = '.item-cart-total';
        this.discountPriceLocator = '.item-discount';
        this.subTotalPriceLocator = '.item-sub-total';
        this.taxPriceLocator = '.item-tax:not(.loading-price)';
        this.orderTotalPriceLocator = '.total';
        this.tAndCCheckboxLocator = '[data-e2e-terms-and-conditions]';
        this.selectAllRenewalsCheckboxLocator = '.address .checkbox__delivery:not(.checked)';
        this.proceedToCheckoutButtonLocator = '#checkout-button';
    }

    public async selectAllRenewalsCheckbox (driver: WebDriver): Promise<void> {
        if (config.platform === 'MOBILE') {
            return driver.executeScript('$(\'.address .checkbox__delivery input[type="checkbox"]:not("checked")\').click()');
        } else {
            return await Helpers.clickElement(driver, this.selectAllRenewalsCheckboxLocator);
        }
    }

    public async cartTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cartTotalPriceLocator);
    }

    public async discountPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.discountPriceLocator);
    }

    public async subTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.subTotalPriceLocator);
    }

    public async taxPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.taxPriceLocator);
    }

    public async orderTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalPriceLocator);
    }

    public async TermsAndConditionsCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.tAndCCheckboxLocator);
    }

    public async selectTermsAndConditionsCheckbox (driver: WebDriver): Promise<void> {
        if (config.platform === 'MOBILE') {
            await Helpers.jsScrollToElementAlignTop(driver, await this.TermsAndConditionsCheckbox(driver));
            return await Helpers.jsClickOnElement(driver, await this.TermsAndConditionsCheckbox(driver));
        } else {
            return await Helpers.clickElement(driver, this.tAndCCheckboxLocator);
        }
    }

    public async ProceedToCheckoutButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.proceedToCheckoutButtonLocator);
    }

    public async clickProceedToCheckoutButton (driver: WebDriver): Promise<void> {
        if (config.platform === 'MOBILE') {
            await Helpers.jsScrollToElementAlignTop(driver, await this.ProceedToCheckoutButton(driver));
            return await Helpers.jsClickOnElement(driver, await this.ProceedToCheckoutButton(driver));
        } else {
            return await Helpers.clickElement(driver, this.proceedToCheckoutButtonLocator);
        }
    }
}
