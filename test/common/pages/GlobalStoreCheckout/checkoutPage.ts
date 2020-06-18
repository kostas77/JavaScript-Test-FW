import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';

export class GscCheckoutPage {
    public backToCartLocator: string = '.back-to-cart--header>.nuxt-link-active';
    public subTotalPriceLocator: string = '.checkout-sub-total>.money';
    public discountPriceLocator: string = '.checkout-discount>.money';
    public taxPriceLocator: string = '.checkout-taxes>.money'; // :not(.loading-price)
    // public taxLoadingLocator: string = '.loading-price';
    public orderTotalPriceLocator: string = '.checkout-grandTotal>.money';
    public termsCheckboxLocator: string = '#accept-t-and-c';
    public checkoutButtonLocator: string = '.btn.btn--lg.checkout-proceed';
    public shippingFirstNameLocator: string = '.address-form.shipping .input.firstName';
    public shippingLastNameLocator: string = '.address-form.shipping .input.lastName';
    public shippingAddress1Locator: string = '.address-form.shipping .input.street1';
    public shippingAddress2Locator: string = '.address-form.shipping .input.street2';
    public shippingCityLocator: string = '.address-form.shipping .input.city';
    public shippingPostcodeLocator: string = '.address-form.shipping .input.postcode';
    public shippingRegionLocator: string = '.address-form.shipping .select.region';
    public shippingCountryLocator: string = '.address-form.shipping .select.country';
    public shippingPhoneLocator: string = '.address-form.shipping .input.phone';
    public sameAddressCheckboxLocator: string = '#billing_shipping_same';
    public billingFirstNameLocator: string = '.address-form.billing .input.firstName';
    public billingLastNameLocator: string = '.address-form.billing .input.lastName';
    public billingAddress1Locator: string = '.address-form.billing .input.street1';
    public billingAddress2Locator: string = '.address-form.billing .input.street2';
    public billingCityLocator: string = '.address-form.billing .input.city';
    public billingPostcodeLocator: string = '.address-form.billing .input.postcode';
    public billingRegionLocator: string = '.address-form.billing .select.region';
    public billingCountryLocator = '.address-form.billing .select.country';
    public billingPhoneLocator: string = '.address-form.billing .input.phone';
    public loginButtonLocator: string = '.btn.login';


    public async shippingFirstName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingFirstNameLocator);
    }

    public async shippingLastName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingLastNameLocator);
    }

    public async shippingStreet1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingAddress1Locator);
    }

    public async shippingStreet2 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingAddress2Locator);
    }

    public async shippingCity (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingCityLocator);
    }

    public async shippingPostcode (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingPostcodeLocator);
    }

    public async shippingRegion (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingRegionLocator);
    }

    public async shippingCountry (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingCountryLocator);
    }

    public async shippingPhone (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingPhoneLocator);
    }

    public async billingFirstName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingFirstNameLocator);
    }

    public async billingLastName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingLastNameLocator);
    }

    public async billingStreet1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingAddress1Locator);
    }

    public async billingStreet2 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingAddress2Locator);
    }

    public async billingCity (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingCityLocator);
    }

    public async billingPostcode (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingPostcodeLocator);
    }

    public async billingRegion (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingRegionLocator);
    }

    public async billingCountry (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingCountryLocator);
    }

    public async billingPhone (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingPhoneLocator);
    }

    public async subTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.subTotalPriceLocator);
    }

    public async discountPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.discountPriceLocator);
    }

    public async taxPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.taxPriceLocator);
    }

    public async orderTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalPriceLocator);
    }
}
