import { WebDriver, WebElement } from 'selenium-webdriver';
import { CustomerDetails } from '../../support/addressesData';
import { Helpers } from '../../support/helpers';

export class RegistrationPage {
    private readonly firstNameLocator: string = 'billing:firstname';
    private readonly lastNameLocator: string = 'billing:lastname';
    private readonly emailLocator: string = 'billing:email';
    private readonly confirmEmailLocator: string = 'confirm_email';
    private readonly telephoneLocator: string = 'billing:telephone';
    private readonly streetLocator: string = 'billing:street1';
    private readonly postcodeLocator: string = 'billing:postcode';
    private readonly cityLocator: string = 'billing:city';
    private readonly passwordLocator: string = 'billing:customer_password';
    private readonly confirmPasswordLocator: string = 'billing:confirm_password';
    private readonly continueButtonLocator: string = '#billing-buttons-container > button:nth-child(1)';
    private readonly countryLocator: string = 'billing:country_id';

    public async continueButton (driver: WebDriver): Promise<WebElement> {
        return await Helpers.getElement(driver, this.continueButtonLocator);
    }

    public async continueButtonClick (driver: WebDriver): Promise<void> {
        return await (await this.continueButton(driver)).click();
    }

    public async register(driver: WebDriver, form: CustomerDetails): Promise<void> {
        console.log(JSON.stringify(form, null, 2));
        await driver.findElement({ id: this.firstNameLocator }).sendKeys(form.firstName);
        await driver.findElement({ id: this.lastNameLocator }).sendKeys(form.lastName);
        await driver.findElement({ id: this.emailLocator }).sendKeys(form.emailAddress);
        await driver.findElement({ id: this.confirmEmailLocator }).sendKeys(form.emailAddress);
        await driver.findElement({ id: this.telephoneLocator }).sendKeys(form.telephone);
        await driver.findElement({ id: this.countryLocator }).sendKeys(form.countryLong);
        await driver.findElement({ id: this.streetLocator }).sendKeys(form.address1);
        await driver.findElement({ id: this.postcodeLocator }).sendKeys(form.postcode);
        await driver.findElement({ id: this.cityLocator }).sendKeys(form.city);
        await driver.findElement({ id: this.passwordLocator }).sendKeys(form.password);
        await driver.findElement({ id: this.confirmPasswordLocator }).sendKeys(form.password);

        await this.continueButtonClick(driver);
    }
}
