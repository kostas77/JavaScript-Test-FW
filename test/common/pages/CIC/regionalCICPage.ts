import { WebDriver } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { CICDebitCard } from '../../support/commonTestData';

export class RegionalCICPage {

    public cardNumberLocator: string;
    public cvvLocator: string;
    public futureMonthLocator: string;
    public futureYearLocator: string;
    public submitButtonLocator: string;

    constructor() {
        this.cardNumberLocator = '#Ecom_Payment_Card_Number';
        this.cvvLocator = '#Ecom_Payment_Card_Verification';
        this.futureMonthLocator = '#Ecom_Payment_Card_ExpDate_Month';
        this.futureYearLocator = '#Ecom_Payment_Card_ExpDate_Year';
        this.submitButtonLocator = '.blocboutons .image';
    }

    public async enterCardNumber (driver: WebDriver, cardNumber: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.cardNumberLocator)).sendKeys(cardNumber.toString());
    }

    public async selectExpiryDateMonth (driver: WebDriver, expDateMonth: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.futureMonthLocator + '>option[value*="' + expDateMonth.toString() + '"]')).click();
    }

    public async enterCardCode (driver: WebDriver, cardCode: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.cvvLocator)).sendKeys(cardCode.toString());
    }

    public async selectExpiryDateYear (driver: WebDriver, expDateYear: number): Promise<void> {
        return await (await Helpers.getElement(driver, this.futureYearLocator + '>option[value*="' + expDateYear.toString() + '"]')).click();
    }

    public async selectSubmitButton (driver: WebDriver): Promise<void> {
        return await (await Helpers.getElement(driver, this.submitButtonLocator)).click();
    }

    public async enterPaymentDetails (driver: WebDriver, creditCardType: string): Promise<void> {
        await Helpers.waitUntilElementHasState(driver, 'located', this.submitButtonLocator, 40 * 1000);
        let creditCardNumber: any = '';
        let creditCardCode: any = '';
        if (creditCardType === 'visa') {
            creditCardNumber = CICDebitCard.visa;
            creditCardCode = CICDebitCard.cvv;
        } else {
            throw new Error('Unknown credit card type specified: ' + creditCardType);
        }
        await this.enterCardNumber(driver, creditCardNumber);
        await this.enterCardCode(driver, creditCardCode);
        await this.selectExpiryDateMonth(driver, CICDebitCard.expDateMonth);
        await this.selectExpiryDateYear(driver, CICDebitCard.expDateYear);
        await this.selectSubmitButton(driver);
    }
}
