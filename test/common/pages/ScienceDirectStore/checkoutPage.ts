import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class SdCheckoutPage {
    public pageTitle: string;
    public backToCartLocator: string;
    public subTotalPriceLocator: string;
    public taxPriceLocator: string;
    // public taxLoadingLocator: string;
    public orderTotalPriceLocator: string;
    public termsLinkLocator: string;
    public payNowButtonLocator: string;
    public shippingAddressLabelLocator: string;
    public shippingFirstNameLocator: string;
    public shippingLastNameLocator: string;
    public shippingAddress1Locator: string;
    public shippingAddress2Locator: string;
    public shippingCityLocator: string;
    public shippingRegionLocator: string;
    public shippingPostcodeLocator: string;
    public shippingCountryLocator: string;
    public shippingVatNumberLocator: string;
    public sameAddressCheckboxLocator: string;
    public billingFirstNameLocator: string;
    public billingLastNameLocator: string;
    public billingAddress1Locator: string;
    public billingAddress2Locator: string;
    public billingCityLocator: string;
    public billingRegionLocator: string;
    public billingPostcodeLocator: string;
    public billingCountryLocator: string;

    constructor() {
        this.pageTitle = 'Checkout';
        this.backToCartLocator = '.nuxt-link-active'; // Two elements
        this.subTotalPriceLocator = '.checkout-sub-total .money';
        this.taxPriceLocator = '.checkout-taxes .money';
        // this.taxLoadingLocator = '.loading-price';
        this.orderTotalPriceLocator = '.checkout-grandTotal .money';
        this.termsLinkLocator = 'terms-and-conditions__hyperlink';
        this.payNowButtonLocator = '.checkout-proceed';
        this.shippingAddressLabelLocator = '.h3:first-of-type';
        this.shippingFirstNameLocator = '#shipping-firstName';
        this.shippingLastNameLocator = '#shipping-lastName';
        this.shippingAddress1Locator = '#shipping-street1';
        this.shippingAddress2Locator = '#shipping-street2';
        this.shippingCityLocator = '#shipping-city';
        this.shippingRegionLocator = '#shipping-region';
        this.shippingPostcodeLocator = '#shipping-postcode';
        this.shippingCountryLocator = '#shipping-country';
        this.shippingVatNumberLocator = '#vatNumber';
        this.sameAddressCheckboxLocator = '#billing_shipping_same';
        this.billingFirstNameLocator = '#billing-firstName';
        this.billingLastNameLocator = '#billing-lastName';
        this.billingAddress1Locator = '#billing-street1';
        this.billingAddress2Locator = '#billing-street2';
        this.billingCityLocator = '#billing-city';
        this.billingRegionLocator = '#billing-region';
        this.billingPostcodeLocator = '#billing-postcode';
        this.billingCountryLocator = '#billing-country';
    }

    public async billingPostcode (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingPostcodeLocator);
    }

    public async selectBillingRegion (driver: WebDriver, region: string): Promise<void> {
        return await Helpers.clickElement(driver, this.billingRegionLocator + '>option[value="' + region + '"]');
    }

    public async selectBillingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await Helpers.clickElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]');
    }

    public async sameAddressCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.sameAddressCheckboxLocator);
    }

    public async selectShippingRegion (driver: WebDriver, region: string): Promise<void> {
        return await Helpers.clickElement(driver, this.shippingRegionLocator + '>option[value="' + region + '"]');
    }

    public async selectShippingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await Helpers.clickElement(driver, this.shippingCountryLocator + '>option[value="' + countryCode + '"]');
    }

    public async subTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.subTotalPriceLocator);
    }

    public async taxTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.taxPriceLocator);
    }

    // public async taxLoading (driver: WebDriver): Promise<WebElement[]> {
    //     return await driver.findElements({ css: this.taxLoadingLocator });
    // }

    public async orderTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalPriceLocator);
    }

    public async payNowButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.payNowButtonLocator);
    }

    public async selectPayNowButton (driver: WebDriver): Promise<void> {
        return await Helpers.clickElement(driver, this.payNowButtonLocator);
    }

}
