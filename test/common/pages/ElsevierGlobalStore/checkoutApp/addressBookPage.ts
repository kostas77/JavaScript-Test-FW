import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';
import { ITestData } from '../../../support/interfaces';

export class AddressBookPage {

    public pageUrl: string;
    public pageTitle: string;
    public billingAddressLabelLocator: string;
    public billingFirstNameLocator: string;
    public billingLastNameLocator: string;
    public billingAddress1Locator: string;
    public billingAddress2Locator: string;
    public billingCityLocator: string;
    public billingRegionLocator: string;
    public billingPostcodeLocator: string;
    public billingCountryLocator: string;
    public billingPhoneLocator: string;
    public sameAddressCheckboxLocator: string;
    public shippingFirstNameLocator: string;
    public shippingLastNameLocator: string;
    public shippingAddress1Locator: string;
    public shippingAddress2Locator: string;
    public shippingCityLocator: string;
    public shippingRegionLocator: string;
    public shippingPostcodeLocator: string;
    public shippingCountryLocator: string;
    public shippingPhoneLocator: string;
    public updateButtonLocator: string;

    constructor(testData: ITestData) {
        this.pageUrl = testData.getUrlFor().elsevier.address;
        this.pageTitle = 'My Account - Address | Elsevier';
        this.billingAddressLabelLocator = '#address-form-billing .columns.no-margin';
        this.billingFirstNameLocator = '#billing-firstName';
        this.billingLastNameLocator = '#billing-lastName';
        this.billingAddress1Locator = '#billing-street1';
        this.billingAddress2Locator = '#billing-street2';
        this.billingCityLocator = '#billing-city';
        this.billingRegionLocator = '#billing-region';
        this.billingPostcodeLocator = '#billing-postcode';
        this.billingCountryLocator = '#billing_country';
        this.billingPhoneLocator = '#billing-phone';
        this.sameAddressCheckboxLocator = '#billing_shipping_same';
        this.shippingFirstNameLocator = '#shipping-firstName';
        this.shippingLastNameLocator = '#shipping-lastName';
        this.shippingAddress1Locator = '#shipping-street1';
        this.shippingAddress2Locator = '#shipping-street2';
        this.shippingCityLocator = '#shipping-city';
        this.shippingRegionLocator = '#shipping-region';
        this.shippingPostcodeLocator = '#shipping-postcode';
        this.shippingCountryLocator = '#shipping_country';
        this.shippingPhoneLocator = '#shipping-phone';
        this.updateButtonLocator = '#update-form-submit';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async billingFirstName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingFirstNameLocator);
    }

    public async billingLastName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingLastNameLocator);
    }

    public async billingAddress1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingAddress1Locator);
    }

    public async billingAddress2 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingAddress2Locator);
    }

    public async billingCity (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingCityLocator);
    }

    public async selectBillingRegion (driver: WebDriver, region: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.billingRegionLocator + '>option[value="' + region + '"]')).click();
    }

    public async billingPostcode (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingPostcodeLocator);
    }

    public async billingCountry (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingCountryLocator);
    }

    public async selectBillingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]')).click();
    }

    public async billingPhoneNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingPhoneLocator);
    }

    public async sameAddressCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.sameAddressCheckboxLocator);
    }

    public async selectSameAddressCheckbox (driver: WebDriver): Promise<void> {
        return await (await this.sameAddressCheckbox(driver)).click();
    }

    public async shippingFirstName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingFirstNameLocator);
    }

    public async shippingLastName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingLastNameLocator);
    }

    public async shippingAddress1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingAddress1Locator);
    }

    public async shippingAddress2 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingAddress2Locator);
    }

    public async shippingCity (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingCityLocator);
    }

    public async selectShippingRegion (driver: WebDriver, region: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.shippingRegionLocator + '>option[value="' + region + '"]')).click();
    }

    public async shippingPostcode (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingPostcodeLocator);
    }

    public async selectShippingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.shippingCountryLocator + '>option[value="' + countryCode + '"]')).click();
    }

    public async shippingPhoneNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingPhoneLocator);
    }

    public async submitForm (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.updateButtonLocator)).click();
    }
}
