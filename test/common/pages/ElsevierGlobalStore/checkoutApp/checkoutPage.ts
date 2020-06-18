import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../../support/helpers';

export class CheckoutPage {
    public pageTitle: string = 'Checkout | Elsevier';
    public backToCartLocator: string = '#back_to_cart';
    public cartTotalPriceLocator: string = '.subtotal_figure';
    public taxPriceLocator: string = '.tax_figure:not(.loading-price)';
    public discountPriceLocator: string = '.discount_figure';
    public subTotalPriceLocator: string = '.discounted_figure';
    public taxLoadingLocator: string = '.loading-price'; // '.tax_figure.loading-price';
    public orderTotalPriceLocator: string = '.grandtotal_figure';
    public termsCheckboxLocator: string = '#ts-and-cs-checkbox';
    public payButtonLocator: string = '#pay-button';
    public billingFirstNameLocator: string = '#billing-firstName';
    public billingLastNameLocator: string = '#billing-lastName';
    public billingAddress1Locator: string = '#billing-street1';
    public billingAddress2Locator: string = '#billing-street2';
    public billingCityLocator: string = '#billing-city';
    public billingRegionSelectorLocator: string = '#billing-region-select';
    public billingRegionLocator: string = '#billing-region';
    public billingPostcodeLocator: string = '#billing-postcode';
    public billingCountryLocator: string = '#billing_country';
    public billingPhoneLocator: string = '#billing-phone';
    public registerPasswordLocator: string = '#password';
    public sameAddressCheckboxLocator: string = '#billing_shipping_same';
    public shippingAddressLabelLocator: string = '.checkout-address h3:first-of-type';
    public shippingFirstNameLocator: string = '#shipping-firstName';
    public shippingLastNameLocator: string = '#shipping-lastName';
    public shippingAddress1Locator: string = '#shipping-street1';
    public shippingAddress2Locator: string = '#shipping-street2';
    public shippingCityLocator: string = '#shipping-city';
    public shippingRegionSelectorLocator: string = '#shipping-region-select';
    public shippingRegionLocator: string = '#shipping-region';
    public shippingPostcodeLocator: string = '#shipping-postcode';
    public shippingCountryLocator: string = '#shipping_country';
    public shippingPhoneLocator: string = '#shipping-phone';
    public shippingEmailLocator: string = '#email';
    public loginButtonLocator: string = '.login-button';
    public signInButtonLocator: string = '#signin-button';
    public loginEmailLocator: string = '#signin-email';
    public loginPasswordLocator: string = '#signin-password';
    public accountNeededMessageLocator: string = '.account-needed-message';


    public async billingAddress1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.billingAddress1Locator);
    }

    public async selectBillingRegion (driver: WebDriver, region: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.billingRegionSelectorLocator + '>option[value="' + region + '"]')).click();
    }

    public async selectBillingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.billingCountryLocator + '>option[value="' + countryCode + '"]')).click();
    }

    public async sameAddressCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.sameAddressCheckboxLocator);
    }

    public async selectSameAddressCheckbox (driver: WebDriver): Promise<void> {
        return await (await this.sameAddressCheckbox(driver)).click();
    }

    public async shippingAddress1 (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingAddress1Locator);
    }

    public async selectShippingRegion (driver: WebDriver, region: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.shippingRegionSelectorLocator + '>option[value="' + region + '"]')).click();
    }

    public async selectShippingCountry (driver: WebDriver, countryCode: string): Promise<void> {
        return await (await Helpers.getElement(driver, this.shippingCountryLocator + '>option[value="' + countryCode + '"]')).click();
    }

    public async shippingPhoneNumber (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.shippingPhoneLocator);
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

    public async taxLoading (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.taxLoadingLocator);
    }

    public async orderTotalPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderTotalPriceLocator);
    }

    public async termsCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.termsCheckboxLocator);
    }

    public async acceptTerms (driver: WebDriver): Promise<void> {
        return await (await this.termsCheckbox(driver)).click();
    }

    public async payButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.payButtonLocator);
    }

    public async selectPayButton (driver: WebDriver): Promise<void> {
        return await (await this.payButton(driver)).click();
    }

    public async loginButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.loginButtonLocator);
    }

    public async selectLoginButton (driver: WebDriver): Promise<void> {
        return await (await this.loginButton(driver)).click();
    }

    public async signInButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.signInButtonLocator);
    }

    public async selectSignInButton (driver: WebDriver): Promise<void> {
        return await (await this.signInButton(driver)).click();
    }

    public async loginEmail (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.loginEmailLocator);
        // return await driver.findElement(By.CssSelector(this.loginEmailLocator));
    }

    public async enterLoginEmail (driver: WebDriver, email: string): Promise<void> {
        return await (await this.loginEmail(driver)).sendKeys(email);
    }

    public async loginPassword (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.loginPasswordLocator);
    }

    public async enterLoginPassword (driver: WebDriver, password: string): Promise<void> {
        return await (await this.loginPassword(driver)).sendKeys(password);
    }

    public async enterLoginDetails (driver: WebDriver, email: string, password: string): Promise<void> {
        await this.enterLoginEmail(driver, email);
        await this.enterLoginPassword(driver, password);
        await this.selectSignInButton(driver);
        return;
    }

    public async accountNeededMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.accountNeededMessageLocator);
    }

}
