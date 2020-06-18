"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RegistrationPage {
    constructor() {
        this.firstNameLocator = 'billing:firstname';
        this.lastNameLocator = 'billing:lastname';
        this.emailLocator = 'billing:email';
        this.confirmEmailLocator = 'confirm_email';
        this.telephoneLocator = 'billing:telephone';
        this.streetLocator = 'billing:street1';
        this.postcodeLocator = 'billing:postcode';
        this.cityLocator = 'billing:city';
        this.passwordLocator = 'billing:customer_password';
        this.confirmPasswordLocator = 'billing:confirm_password';
        this.continueButtonLocator = '//*[@id="billing-buttons-container"]/button';
        this.countryLocator = 'billing:country_id';
    }
    register(driver, form) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.stringify(form, null, 2));
            yield driver.findElement({ id: this.firstNameLocator }).sendKeys(form.firstName);
            yield driver.findElement({ id: this.lastNameLocator }).sendKeys(form.lastName);
            yield driver.findElement({ id: this.emailLocator }).sendKeys(form.emailAddress);
            yield driver.findElement({ id: this.confirmEmailLocator }).sendKeys(form.emailAddress);
            yield driver.findElement({ id: this.telephoneLocator }).sendKeys(form.telephone);
            yield driver.findElement({ id: this.countryLocator }).sendKeys(form.countryLong);
            yield driver.findElement({ id: this.streetLocator }).sendKeys(form.address1);
            yield driver.findElement({ id: this.postcodeLocator }).sendKeys(form.postcode);
            yield driver.findElement({ id: this.cityLocator }).sendKeys(form.city);
            yield driver.findElement({ id: this.passwordLocator }).sendKeys(form.password);
            yield driver.findElement({ id: this.confirmPasswordLocator }).sendKeys(form.password);
            yield driver.findElement({ xpath: this.continueButtonLocator }).click();
        });
    }
}
exports.RegistrationPage = RegistrationPage;
//# sourceMappingURL=registrationPage.js.map