import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { creditCardDetails } from '../../support/commonTestData';

export class RegionalGlobalCollectPage {

    public globalCollectIFrameLocator: string;
    public cardNumberLocator: string;
    public futureMonthLocator: string;
    public futureYearLocator: string;
    public cvvLocator: string;
    public submitButtonLocator: string;

    constructor() {
        this.globalCollectIFrameLocator = '#globalcollect-iframe';
        this.cardNumberLocator = '#F1009';
        this.futureMonthLocator = '#F1010_MM';
        this.futureYearLocator = '#F1010_YY';
        this.cvvLocator = '#F1136';
        this.submitButtonLocator = '#btnSubmit';
    }

    public async globalCollectIFrame (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.globalCollectIFrameLocator);
    }

    public async enterCardNumber (driver: WebDriver, cardNumber: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.cardNumberLocator)).sendKeys(cardNumber.toString());
    }

    public async enterCvvNumber (driver: WebDriver, cvvNumber: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.cvvLocator)).sendKeys(cvvNumber.toString());
    }

    public async selectExpiryDateMonth (driver: WebDriver, expDateMonth: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]')).click();
    }

    public async selectExpiryDateYear (driver: WebDriver, expDateYear: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]')).click();
    }

    public async submitButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.submitButtonLocator);
    }

    public async selectSubmitButton (driver: WebDriver): Promise<void> {
        return await (await this.submitButton(driver)).click();
    }

    public async enterPaymentDetails (driver: WebDriver, creditCardType: string): Promise<void> {
        await driver.switchTo().frame(await this.globalCollectIFrame(driver));
        let creditCardNumber: any = '';
        switch (creditCardType) {
            case 'visa':
                creditCardNumber = creditCardDetails.visa;
                break;
            case 'masterCard':
                creditCardNumber = creditCardDetails.mastercard;
                break;
            case 'amEx':
                creditCardNumber = creditCardDetails.amex;
                break;
            default:
                throw new Error ('Unknown credit card type specified: ' + creditCardType);
        }
        await this.enterCardNumber(driver, creditCardNumber);
        await this.enterCvvNumber(driver, creditCardDetails.cvv);
        await this.selectExpiryDateMonth(driver, creditCardDetails.expDateMonth);
        await this.selectExpiryDateYear(driver, creditCardDetails.expDateYearShort);
        await this.selectSubmitButton(driver);
    }
}
