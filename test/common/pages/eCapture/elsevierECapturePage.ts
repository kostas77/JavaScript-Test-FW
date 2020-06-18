import { WebDriver, WebElement } from 'selenium-webdriver';
import { ITestAccountDetails } from '../../support/interfaces';
import { Helpers } from '../../support/helpers';
import { creditCardDetails } from '../../support/commonTestData';

export class ElsevierECapturePage {
    public pageTitle: string;
    public orderSummaryHeaderLocator: string;
    public orderSummaryHeaderText: string;
    public welcomeMessageLocator: string;
    public welcomeMessageTextPrefix: string;
    public backButtonLocator: string;
    public cardholderNameLocator: string;
    public visaCardTypeLocator: string;
    public mastercardCardTypeLocator: string;
    public amexCardTypeLocator: string;
    public jcbCardTypeLocator: string;
    public cardNumberLocator: string;
    public cvvLocator: string;
    public futureMonthLocator: string;
    public futureYearLocator: string;
    public termsCheckboxLocator: string;
    public submitButtonLocator: string;

    constructor() {
        this.pageTitle = 'Elsevier Secure Payment';
        this.orderSummaryHeaderLocator = '.sectionHeader.ng-binding';
        this.orderSummaryHeaderText = 'Cardholder Details';
        this.welcomeMessageLocator = '.welcome';
        this.welcomeMessageTextPrefix = 'Welcome ';
        this.backButtonLocator = '.go-back-to-store';
        this.cardholderNameLocator = '#input-cardholder-family-name';
        this.visaCardTypeLocator = '#input-card-type > option:nth-child(2)';
        this.mastercardCardTypeLocator = '#input-card-type > option:nth-child(3)';
        this.amexCardTypeLocator = '#input-card-type > option:nth-child(4)';
        this.jcbCardTypeLocator = '#input-card-type > option:nth-child(5)';
        this.cardNumberLocator = '#input-card-number';
        this.cvvLocator = '#input-cvv-number';
        this.futureMonthLocator = '#input-expiry-month';
        this.futureYearLocator = '#input-expiry-year';
        this.termsCheckboxLocator = '#tandcCheckBox';
        this.submitButtonLocator = '.button-style-additional';
    }

    public async orderSummaryHeader (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.orderSummaryHeaderLocator);
    }

    public async welcomeMessage (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.welcomeMessageLocator);
    }

    public async cardholderName (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.cardholderNameLocator);
    }

    public async enterCardholderName (driver: WebDriver, cardholderFullName: string): Promise<void> {
        return Helpers.enterText(driver, this.cardholderNameLocator, cardholderFullName);
    }

    public async cardTypeLocator (driver: WebDriver, cardType: string): Promise<WebElement> {
        switch (cardType) {
            case 'visa':
                return await Helpers.getElement(driver, this.visaCardTypeLocator);
            case 'mastercard':
                return await Helpers.getElement(driver, this.mastercardCardTypeLocator);
            case 'amex':
                return await Helpers.getElement(driver, this.amexCardTypeLocator);
            case 'jcb':
                return await Helpers.getElement(driver, this.jcbCardTypeLocator);
            default:
                throw new Error('Unknown card type requested');
        }
    }

    public async selectCardType (driver: WebDriver, cardType: string): Promise<void> {
        return await (await this.cardTypeLocator(driver, cardType)).click();
    }

    public async enterCardNumber (driver: WebDriver, cardNumber: number): Promise<void> {
        return Helpers.enterText (driver, this.cardNumberLocator, cardNumber.toString());
    }

    public async selectExpiryDateMonth (driver: WebDriver, expDateMonth: number): Promise<void> {
        return await Helpers.clickElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]');
    }

    public async enterCardCode (driver: WebDriver, cardCode: number): Promise<void> {
        return Helpers.enterText (driver, this.cvvLocator, cardCode.toString());
    }

    public async selectExpiryDateYear (driver: WebDriver, expDateYear: number): Promise<void> {
        return await Helpers.clickElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]');
    }

    public async clickTermsCheckbox (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.termsCheckboxLocator)).click();
    }

    public async submitButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.submitButtonLocator);
    }

    public async selectSubmitButton (driver: WebDriver): Promise<void> {
        return await driver.executeScript(`document.querySelector('${this.submitButtonLocator}').click();`);
    }

    public async backButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.backButtonLocator);
    }

    public async selectBackButton (driver: WebDriver): Promise<void> {
        return await (await this.backButton(driver)).click();
    }

    public async enterPaymentDetails (driver: WebDriver, customerDetails: ITestAccountDetails, creditCardType: string): Promise<void> {
        let creditCardNumber: any = '';
        let creditCardCode: any = '';
        await Helpers.waitUntilElementHasState(driver, 'clickable', this.cardholderNameLocator, 20 * 1000);
        await this.enterCardholderName(driver, customerDetails.fullName);
        await this.selectCardType(driver, creditCardType);
        switch (creditCardType) {
            case 'visa':
                creditCardNumber = creditCardDetails.visa;
                creditCardCode = creditCardDetails.cvv;
                break;
            case 'mastercard':
                creditCardNumber = creditCardDetails.mastercard;
                creditCardCode = creditCardDetails.cvv;
                break;
            case 'amex':
                creditCardNumber = creditCardDetails.amex;
                creditCardCode = creditCardDetails.cid;
                break;
            case 'jcb':
                creditCardNumber = creditCardDetails.jcb;
                creditCardCode = creditCardDetails.cvv;
                break;
            default:
                throw new Error('Unknown credit card type specified: ' + creditCardType);
        }
        await this.enterCardNumber(driver, creditCardNumber);
        await this.enterCardCode(driver, creditCardCode);
        await this.selectExpiryDateMonth(driver, creditCardDetails.expDateMonth);
        if (customerDetails.countryCode !== 'AU') {
            await this.selectExpiryDateYear(driver, creditCardDetails.expDateYear);
        } else {
            await this.selectExpiryDateYear(driver, creditCardDetails.expDateYearShort);
        }
        await this.clickTermsCheckbox(driver);
        await this.selectSubmitButton(driver);
    }
}
