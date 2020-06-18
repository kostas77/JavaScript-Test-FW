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
const helpers_1 = require("../../support/helpers");
class Checkout {
    constructor(driver) {
        this.element = driver.findElement({ css: Checkout.checkoutTableLocator });
    }
    getValue(title, elements) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const element of elements) {
                const item = (yield element.findElements({ css: 'td' }));
                if ((yield item[0].getText()).includes(title)) {
                    return yield item[1].getText();
                }
            }
            return '0.00';
        });
    }
    init(titles) {
        return __awaiter(this, void 0, void 0, function* () {
            const footer = yield this.element.findElements({ css: 'tfoot tr' });
            this.subtotal = helpers_1.Helpers.getCleanPrice(yield this.getValue(titles.subtotal, footer));
            this.grandTotal = helpers_1.Helpers.getCleanPrice(yield this.getValue(titles.grandTotal, footer));
            this.shippingCost = titles.shipping ? helpers_1.Helpers.getCleanPrice(yield this.getValue(titles.shipping, footer)) : '0.00';
            this.taxCost = helpers_1.Helpers.getCleanPrice(yield this.getValue(titles.tax, footer));
            return this;
        });
    }
}
exports.Checkout = Checkout;
Checkout.checkoutTableLocator = '#checkout-review-table';
class CheckoutPage {
    constructor(testData) {
        this.testData = testData;
        this.pageUrl = this.testData.getUrlFor().HealthStore.checkout;
        this.loginEmailLocator = '#login-email';
        this.loginPasswordLocator = '#login-password';
        this.loginButtonLocator = '#checkout-step-login .col-2 .buttons-set button[type=submit]';
        this.billingContinueButtonLocator = '#billing-buttons-container > button';
        this.termsCheckboxLocator = '#checkout-agreements input';
        this.placeOrderButtonLocator = '#review-buttons-container .btn-checkout';
        this.visaCardTypeLocator = '#p_sub_method_1';
        this.CICTypeLocator = '#p_method_cybermut_payment';
        this.payPalTypeLocator = '#p_method_paypal_standard';
        this.bankCheckTypeLocator = '#p_method_checkmo';
        this.proformaInvoiceTypeLocator = '#p_method_banktransfer';
        this.paymentContinueButtonLocator = '#payment-buttons-container button';
        this.fullPriceLocator = '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)';
        this.shippingPriceLocator = '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1)';
        this.taxTotalLocator = '#checkout-review-table > tfoot:nth-child(3) > tr:nth-child(3) > td:nth-child(2) > span:nth-child(1)';
        this.orderTotalLocator = '#checkout-review-table tr.last:nth-child(4) > td:nth-child(2) > strong:nth-child(1) > span:nth-child(1)';
        this.registerButtonLocator = 'onepage-guest-register-button';
    }
    getPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    clickOnRegister(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield driver.findElement({ id: this.registerButtonLocator })).click();
        });
    }
    loginEmail(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginEmailLocator);
        });
    }
    enterLoginEmail(driver, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginEmail(driver)).sendKeys(email);
        });
    }
    loginPassword(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginPasswordLocator);
        });
    }
    enterLoginPassword(driver, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginPassword(driver)).sendKeys(password);
        });
    }
    loginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.loginButtonLocator);
        });
    }
    selectloginButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.loginButton(driver)).click();
        });
    }
    enterLoginDetails(driver, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enterLoginEmail(driver, email);
            yield this.enterLoginPassword(driver, password);
            yield this.selectloginButton(driver);
            return;
        });
    }
    billingContinueButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.billingContinueButtonLocator);
        });
    }
    selectBillingContinueButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.billingContinueButton(driver)).click();
        });
    }
    visaCardType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.visaCardTypeLocator);
        });
    }
    selectVisaCardType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.visaCardType(driver)).click();
        });
    }
    selectCICType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.CICTypeLocator)).click();
        });
    }
    payPalType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.payPalTypeLocator);
        });
    }
    selectPayPalType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.payPalType(driver)).click();
        });
    }
    bankCheckType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.bankCheckTypeLocator);
        });
    }
    selectBankCheckType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.bankCheckType(driver)).click();
        });
    }
    selectProformaInvoiceType(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield helpers_1.Helpers.getElement(driver, this.proformaInvoiceTypeLocator)).click();
        });
    }
    paymentContinueButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.paymentContinueButtonLocator);
        });
    }
    selectPaymentContinueButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.paymentContinueButton(driver)).click();
        });
    }
    termsCheckbox(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.termsCheckboxLocator);
        });
    }
    acceptTerms(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.termsCheckbox(driver)).click();
        });
    }
    placeOrderButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.placeOrderButtonLocator);
        });
    }
    placeOrder(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.placeOrderButton(driver)).click();
        });
    }
    fullPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.fullPriceLocator);
        });
    }
    shippingPrice(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.shippingPriceLocator);
        });
    }
    taxTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.taxTotalLocator);
        });
    }
    orderTotal(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.orderTotalLocator);
        });
    }
    getCheckout(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Checkout(driver).init(this.testData.getTitles().checkoutPage);
        });
    }
    selectPaymentMethod(driver, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (paymentMethod.toLowerCase()) {
                case 'visa':
                    yield this.selectVisaCardType(driver);
                    break;
                case 'cic':
                    yield this.selectCICType(driver);
                    break;
                case 'paypal':
                    yield this.selectPayPalType(driver);
                    break;
                case 'bank_check':
                    yield this.selectBankCheckType(driver);
                    break;
                case 'proforma invoice':
                    yield this.selectProformaInvoiceType(driver);
                    break;
                default:
            }
            return yield this.selectPaymentContinueButton(driver);
        });
    }
}
exports.CheckoutPage = CheckoutPage;
//# sourceMappingURL=checkoutPage.js.map