import { WebDriver, WebElement, WebElementPromise } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class Checkout {
    public subtotal: string;
    public taxCost: string;
    public grandTotal: string;
    public shippingCost: string;
    private static checkoutTableLocator: string = '#checkout-review-table';
    private readonly element: WebElementPromise;

    constructor(driver: WebDriver) {
        this.element = driver.findElement({ css: Checkout.checkoutTableLocator });
    }

    private static async getValue(title: string, elements: WebElement[]): Promise<string> {
        for (const element of elements) {
            const item = (await element.findElements({ css: 'td' }));
            if ((await item[0].getText()).includes(title)) {
                return await item[1].getText();
            }
        }
        return '0.00';
    }

    public async init(titles: any): Promise<this> {
        const footer = await this.element.findElements({ css: 'tfoot tr' });
        this.subtotal = Helpers.getCleanPrice(await Checkout.getValue(titles.subtotal, footer));
        this.grandTotal = Helpers.getCleanPrice(await Checkout.getValue(titles.grandTotal, footer));
        this.shippingCost = titles.shipping ? Helpers.getCleanPrice(await Checkout.getValue(titles.shipping, footer)) : '0.00';
        this.taxCost = Helpers.getCleanPrice(await Checkout.getValue(titles.tax, footer));
        return this;
    }
}

export class CheckoutPage {
    protected testData: ITestData;
    public pageUrl: string;

    public locators = {
        loginEmailLocator: '#login-email',
        loginPasswordLocator: '#login-password',
        loginButtonLocator: '#checkout-step-login .col-2 .buttons-set button[type=submit]',
        billingContinueButtonLocator: '#billing-buttons-container > button',
        termsCheckboxLocator: '#checkout-agreements input',
        placeOrderButtonLocator: '#review-buttons-container .btn-checkout',

        visaCardTypeLocator: '#p_sub_method_1',
        CICTypeLocator: '#p_method_cybermut_payment',
        payPalTypeLocator: '#p_method_paypal_standard',
        bankCheckTypeLocator: '#p_method_checkmo',
        proformaInvoiceTypeLocator: '#p_method_banktransfer',
        directDebitTypeLocator: '#p_method_debit',
        directDebitFirstNameFieldLocator: '#first_name',
        directDebitLastNameFieldLocator: '#last_name',
        directDebitIBANFieldLocator: '#iban',
        directDebitBICFieldLocator: '#swiftcode',
        paymentContinueButtonLocator: '#payment-buttons-container button',
        directDebitTermsCheckboxLocator: '#payment_form_debit > ul > li:nth-child(7) > div > div > label > input',

        checkoutReviewTableLocator: '#checkout-review-table',
        fullPriceLocator: '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)',
        shippingPriceLocator: '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1)',
        taxTotalLocator: '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)',
        orderTotalLocator: '#checkout-review-table tr.last:nth-child(4) > td:nth-child(2) > strong:nth-child(1) > span:nth-child(1)',
        registerButtonLocator: 'onepage-guest-register-button'
    };

    constructor(testData: ITestData) {
        this.testData = testData;
        this.pageUrl = this.testData.getUrlFor().HealthStore.checkout;

        this.locators = { ...this.locators, ...testData.getSelectorOverrides().checkoutPage };
    }

    public async getPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }

    public async clickOnRegister(driver: WebDriver): Promise<void> {
        return await (await driver.findElement({ id: this.locators.registerButtonLocator })).click();
    }

    public async loginEmail (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.loginEmailLocator);
    }

    public async enterLoginEmail (driver: WebDriver, email: string): Promise<void> {
        return await (await this.loginEmail(driver)).sendKeys(email);
    }

    public async loginPassword (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.loginPasswordLocator);
    }

    public async enterLoginPassword (driver: WebDriver, password: string): Promise<void> {
        return await (await this.loginPassword(driver)).sendKeys(password);
    }

    public async loginButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.loginButtonLocator);
    }

    public async selectloginButton (driver: WebDriver): Promise<void> {
        return await (await this.loginButton(driver)).click();
    }

    public async enterLoginDetails (driver: WebDriver, email: string, password: string): Promise<void> {
        await this.enterLoginEmail(driver, email);
        await this.enterLoginPassword(driver, password);
        await this.selectloginButton(driver);
        return;
    }

    public async billingContinueButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.billingContinueButtonLocator);
    }

    public async selectBillingContinueButton (driver: WebDriver): Promise<void> {
        return await (await this.billingContinueButton(driver)).click();
    }

    public async visaCardType (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.visaCardTypeLocator);
    }

    public async selectVisaCardType (driver: WebDriver): Promise<void> {
        return await (await this.visaCardType(driver)).click();
    }

    public async selectCICType (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.locators.CICTypeLocator)).click();
    }

    public async payPalType (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.payPalTypeLocator);
    }

    public async selectPayPalType (driver: WebDriver): Promise<void> {
        return await (await this.payPalType(driver)).click();
    }

    public async bankCheckType (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.bankCheckTypeLocator);
    }

    public async selectBankCheckType (driver: WebDriver): Promise<void> {
        return await (await this.bankCheckType(driver)).click();
    }

    public async selectProformaInvoiceType(driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.locators.proformaInvoiceTypeLocator)).click();
    }


    public async directDebitType (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitTypeLocator);
    }

    public async selectDirectDebitType (driver: WebDriver): Promise<void> {
        return await (await this.directDebitType(driver)).click();
    }

    public async debitFirstName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitFirstNameFieldLocator);
    }

    public async enterFirstName (driver: WebDriver, firstName: string): Promise<void> {
        return await (await this.debitFirstName(driver)).sendKeys(firstName);
    }

    public async debitLastName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitLastNameFieldLocator);
    }

    public async enterLastName (driver: WebDriver, lastName: string): Promise<void> {
        return await (await this.debitLastName(driver)).sendKeys(lastName);
    }

    public async debitIBAN (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitIBANFieldLocator);
    }

    public async enterIBAN (driver: WebDriver, IBAN: string): Promise<void> {
        return await (await this.debitIBAN(driver)).sendKeys(IBAN);
    }

    public async debitBIC (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitBICFieldLocator);
    }

    public async enterBIC (driver: WebDriver, BIC: string): Promise<void> {
        return await (await this.debitBIC(driver)).sendKeys(BIC);
    }

    public async enterDirectDebitDetails (driver: WebDriver): Promise <void> {
        await this.enterFirstName(driver, this.testData.getDataFor().customer.firstName);
        await this.enterLastName(driver, this.testData.getDataFor().customer.lastName);
        await this.enterIBAN(driver, this.testData.getDataFor().bankAccount.iban);
        await this.enterBIC(driver, this.testData.getDataFor().bankAccount.bic);
        await this.acceptDDTerms(driver);
        return await (await this.paymentContinueButton(driver)).click();
    }

    public async paymentContinueButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.paymentContinueButtonLocator);
    }

    public async selectPaymentContinueButton (driver: WebDriver): Promise<void> {
        return await (await this.paymentContinueButton(driver)).click();
    }

    public async termsCheckbox (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.termsCheckboxLocator);
    }

    public async acceptTerms (driver: WebDriver): Promise<void> {
        return await (await this.termsCheckbox(driver)).click();
    }

    public async ddTermsCheckbox(driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.directDebitTermsCheckboxLocator);
    }

    public async acceptDDTerms(driver: WebDriver): Promise<void> {
        return await (await this.ddTermsCheckbox(driver)).click();
    }

    public async placeOrderButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.placeOrderButtonLocator);
    }

    public async placeOrder (driver: WebDriver): Promise<void> {
        return await (await this.placeOrderButton(driver)).click();
    }

    public async fullPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.fullPriceLocator);
    }

    public async shippingPrice (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.shippingPriceLocator);
    }

    public async taxTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.taxTotalLocator);
    }

    public async orderTotal (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.locators.orderTotalLocator);
    }

    public async getCheckout(driver: WebDriver): Promise<Checkout> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.locators.checkoutReviewTableLocator, 60 * 1000);
        return await new Checkout(driver).init(this.testData.getTitles().checkoutPage);
    }

    public async selectPaymentMethod(driver: WebDriver, paymentMethod: string): Promise<void> {
        switch (paymentMethod.toLowerCase()) {
            case 'visa':
                await this.selectVisaCardType(driver);
                break;
            case 'cic':
                await this.selectCICType(driver);
                break;
            case 'paypal':
                await this.selectPayPalType(driver);
                await driver.sleep(2 * 1000);
                break;
            case 'bank_check':
                await this.selectBankCheckType(driver);
                break;
            case 'proforma invoice':
                await this.selectProformaInvoiceType(driver);
                break;
            case 'direct debit':
                await this.selectDirectDebitType(driver);
                break;
            default:
        }
        return await this.selectPaymentContinueButton(driver);
    }
}
