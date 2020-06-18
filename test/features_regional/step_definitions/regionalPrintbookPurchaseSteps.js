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
const cucumber_1 = require("cucumber");
const productPage_1 = require("../../common/pages/HealthStores/productPage");
const optionTableJournalPage_1 = require("../../common/pages/HealthStores/optionTableJournalPage");
const checkoutPage_1 = require("../../common/pages/HealthStores/checkoutPage");
const thankYouPage_1 = require("../../common/pages/HealthStores/thankYouPage");
const helpers_1 = require("../../common/support/helpers");
const registrationPage_1 = require("../../common/pages/HealthStores/registrationPage");
const elsevierECapturePage_1 = require("../../common/pages/eCapture/elsevierECapturePage");
const regionalGlobalCollectPage_1 = require("../../common/pages/GlobalCollect/regionalGlobalCollectPage");
const payPalLoginPage_1 = require("../../common/pages/PayPal/payPalLoginPage");
const payPalPage_1 = require("../../common/pages/PayPal/payPalPage");
const ecommerce_stores_1 = require("@elsevier/ecommerce-stores");
const regionalCICPage_1 = require("../../common/pages/CIC/regionalCICPage");
function RegionalProductPurchaseSteps(testData, _config) {
    const config = _config;
    const productPage = new productPage_1.ProductPage();
    const optionTableJournalPage = new optionTableJournalPage_1.OptionTableJournalPage();
    const checkoutPage = new checkoutPage_1.CheckoutPage(testData);
    const registrationPage = new registrationPage_1.RegistrationPage();
    const eCapturePage = new elsevierECapturePage_1.ElsevierECapturePage();
    const globalCollect = new regionalGlobalCollectPage_1.RegionalGlobalCollectPage();
    const CIC = new regionalCICPage_1.RegionalCICPage();
    const payPalLoginPage = new payPalLoginPage_1.PayPalLoginPage(testData);
    const payPalPage = new payPalPage_1.PayPalPage();
    const thankYouPage = new thankYouPage_1.ThankYouPage(testData);
    cucumber_1.Given(/^I am an existing customer$/, function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.customerDetails = config.getCustomerDetails();
            console.log('- Customer\'s email:', this.customerDetails.emailAddress);
        });
    });
    cucumber_1.When(/^I add the following product types in the cart:$/, { timeout: 7 * 60 * 1000 }, function (products) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsList = products.hashes();
            this.orderDetails.orderTotalItems = 0;
            this.orderDetails.orderTitles = [];
            this.orderDetails.orderIsbns = [];
            this.orderDetails.productTypes = [];
            this.orderDetails.discountedOrder = false;
            for (const productInfo of productsList) {
                let product;
                const productType = productInfo['Product Type'];
                switch (productType) {
                    case 'Printbook':
                        product = testData.getDataFor().printBook;
                        break;
                    case 'Delta journal':
                        product = testData.getDataFor().deltaJournal;
                        break;
                    case 'Argi journal':
                        product = testData.getDataFor().argiJournal;
                        break;
                    case 'Journal':
                        product = testData.getDataFor().journal;
                        break;
                    case 'VST EBook':
                        product = testData.getDataFor().eBook;
                        break;
                    case 'set of flash cards':
                        product = testData.getDataFor().flashCards;
                        break;
                    case 'CD':
                        product = testData.getDataFor().CD;
                        break;
                    case 'DVD':
                        product = testData.getDataFor().DVD;
                        break;
                    default:
                }
                yield this.driver.get(testData.getUrlFor().HealthStore.home + product.productPath);
                const isJournal = (product.type.toLowerCase() === 'journal');
                if (isJournal && ecommerce_stores_1.isFranceStore(Number(testData.getDataFor().orrStoreId))) {
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', optionTableJournalPage.mainTitleLocator, 40 * 1000);
                    yield optionTableJournalPage.addProductToCart(this.driver);
                }
                else {
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'visible', productPage.mainTitleLocator, 40 * 1000);
                    if (isJournal && !ecommerce_stores_1.isSpainStore(Number(testData.getDataFor().orrStoreId))) {
                        yield productPage.fillJournalSelectors(this.driver);
                    }
                    yield productPage.addProductToCart(this.driver, isJournal);
                }
                this.orderDetails.orderTotalItems += 1;
                this.orderDetails.orderTitles.push(product.shortTitle.toLowerCase());
                this.orderDetails.orderIsbns.push(product.printIsbn);
                this.orderDetails.productTypes.push(product.type);
            }
        });
    });
    cucumber_1.Given(/^I proceed to the checkout page$/, { timeout: 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkoutPage.getPage(this.driver);
        });
    });
    cucumber_1.Given(/^I login on the checkout page$/, { timeout: 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkoutPage.enterLoginDetails(this.driver, this.customerDetails.emailAddress, this.customerDetails.password);
        });
    });
    cucumber_1.Given(/^I click on the register button$/, { timeout: 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkoutPage.clickOnRegister(this.driver);
        });
    });
    cucumber_1.Given(/^I register$/, { timeout: 60 * 1000 }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.customerDetails = config.getCustomerDetails();
            const customer = testData.getDataFor().customerRegistration;
            yield registrationPage.register(this.driver, customer);
            this.customerDetails.emailAddress = customer.emailAddress;
            console.log('- Customer\'s email:', this.customerDetails.emailAddress);
        });
    });
    cucumber_1.Given(/^I place the order with (.*)?$/, { timeout: 4 * 60 * 1000 }, function (paymentSystem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkoutPage.selectBillingContinueButton(this.driver);
            yield this.driver.sleep(10 * 1000);
            switch (paymentSystem) {
                case 'GlobalCollect':
                    yield checkoutPage.selectPaymentMethod(this.driver, 'visa');
                    break;
                case 'eCapture France':
                    yield checkoutPage.selectPaymentContinueButton(this.driver);
                    paymentSystem = 'eCapture';
                    break;
                case 'CIC':
                    yield checkoutPage.selectPaymentMethod(this.driver, 'CIC');
                    break;
                case 'PayPal':
                    yield checkoutPage.selectPaymentMethod(this.driver, 'paypal');
                    yield checkoutPage.selectPaymentContinueButton(this.driver);
                    break;
                case 'Bank check':
                    yield checkoutPage.selectPaymentMethod(this.driver, 'bank_check');
                    break;
                case 'Proforma Invoice':
                    yield checkoutPage.selectPaymentMethod(this.driver, 'Proforma Invoice');
                    break;
                default:
            }
            yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', checkoutPage.termsCheckboxLocator, 60 * 1000);
            yield checkoutPage.acceptTerms(this.driver);
            const checkout = yield checkoutPage.getCheckout(this.driver);
            this.orderDetails.fullPrice = checkout.subtotal;
            this.orderDetails.shippingPrice = checkout.shippingCost;
            this.orderDetails.taxTotal = checkout.taxCost;
            this.orderDetails.orderTotal = checkout.grandTotal;
            console.log(`- Total items:  ${this.orderDetails.orderTotalItems}`);
            console.log(`- Full Price: ${testData.getDataFor().currency} ${this.orderDetails.fullPrice}`);
            console.log(`- Shipping Price: ${testData.getDataFor().currency} ${this.orderDetails.shippingPrice}`);
            console.log(`- Tax total: ${testData.getDataFor().currency} ${this.orderDetails.taxTotal}`);
            console.log(`- Order total: ${testData.getDataFor().currency} ${this.orderDetails.orderTotal}`);
            yield checkoutPage.placeOrder(this.driver);
            console.log('- Order placed');
            switch (paymentSystem) {
                case 'GlobalCollect':
                    yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', globalCollect.globalCollectIFrameLocator, 60 * 1000);
                    yield globalCollect.enterPaymentDetails(this.driver, 'visa');
                    break;
                case 'eCapture':
                    yield eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, 'visa');
                    break;
                case 'CIC':
                    yield CIC.enterPaymentDetails(this.driver, 'visa');
                    break;
                case 'PayPal':
                    yield payPalLoginPage.enterLoginDetails(this.driver);
                    yield payPalPage.pay(this.driver);
                    break;
                case 'Bank check':
                case 'Proforma Invoice':
                    break;
                default:
                    throw new Error('Unrecognised payment systems: ' + paymentSystem);
            }
        });
    });
    cucumber_1.Then(/^The order is displayed in the thank you page$/, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield thankYouPage.verifyPageTitle(this.driver);
            const orderNumber = yield thankYouPage.getOrderNumber(this.driver);
            this.orderDetails.orderNumberText = orderNumber;
            console.log('- Order number: ' + orderNumber);
        });
    });
}
exports.RegionalProductPurchaseSteps = RegionalProductPurchaseSteps;
//# sourceMappingURL=regionalPrintbookPurchaseSteps.js.map