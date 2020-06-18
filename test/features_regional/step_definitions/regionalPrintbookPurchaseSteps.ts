import { defineStep } from 'cucumber';
import { ProductPage } from '../../common/pages/HealthStores/productPage';
import { OptionTableJournalPage } from '../../common/pages/HealthStores/optionTableJournalPage';
import { CheckoutPage } from '../../common/pages/HealthStores/checkoutPage';
import { ThankYouPage } from '../../common/pages/HealthStores/thankYouPage';
import { Helpers } from '../../common/support/helpers';
import { RegistrationPage } from '../../common/pages/HealthStores/registrationPage';
import { ElsevierECapturePage as ECapturePage } from '../../common/pages/eCapture/elsevierECapturePage';
import { RegionalGlobalCollectPage } from '../../common/pages/GlobalCollect/regionalGlobalCollectPage';
import { PayPalLoginPage } from '../../common/pages/PayPal/payPalLoginPage';
import { PayPalPage } from '../../common/pages/PayPal/payPalPage';
import { isSpainStore, isFranceStore, isUSStore, isDEStore, isUKStore, isMEAStore, isEUStore, isMexicoStore } from '@elsevier/ecommerce-stores';
import { RegionalCICPage } from '../../common/pages/CIC/regionalCICPage';
import { ITestData, IProductTestData } from '../../common/support/interfaces';

export function RegionalProductPurchaseSteps(testData: ITestData, _config): void {
    const config = _config;
    const productPage = new ProductPage(testData);
    const optionTableJournalPage = new OptionTableJournalPage();
    const checkoutPage = new CheckoutPage(testData);
    const registrationPage = new RegistrationPage();
    const eCapturePage = new ECapturePage();
    const globalCollect = new RegionalGlobalCollectPage();
    const CIC = new RegionalCICPage();
    const payPalLoginPage = new PayPalLoginPage(testData);
    const payPalPage = new PayPalPage(testData);
    const thankYouPage = new ThankYouPage(testData);

    defineStep(/^I am an existing customer$/, async function (): Promise<void> {
        this.customerDetails = config.getCustomerDetails();
        console.log('- Customer\'s email:', this.customerDetails.emailAddress);
    });

    defineStep(/^I add the following product types in the cart:$/, { timeout: 60 * 1000 }, async function (products): Promise<void> {
        const productsList = products.hashes();

        this.orderDetails.orderTotalItems = 0;
        this.orderDetails.orderTitles = [];
        this.orderDetails.orderIsbns = [];
        this.orderDetails.productTypes = [];
        this.orderDetails.discountedOrder = false;

        // Iterate through the products list
        for (const productInfo of productsList) {
            let product: IProductTestData;
            const productType = productInfo['Product Type'];
            console.log('       - adding productType: "' + productType + '"');
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
                    product = testData.getDataFor().VstEbook;
                    break;
                case 'Inkling EBook':
                    product = testData.getDataFor().InklingEbook;
                    break;
                case 'set of flash cards':
                    product = testData.getDataFor().flashCards;
                    break;
                case 'Online Resources':
                    product = testData.getDataFor().onlineResources;
                    break;
                case 'CD':
                    product = testData.getDataFor().CD;
                    break;
                case 'DVD':
                    product = testData.getDataFor().DVD;
                    break;
                case 'Loose-leaf':
                    product = testData.getDataFor().looseLeaf;
                    break;
                case 'Other':
                    product = testData.getDataFor().other;
                    break;
                case 'Poster':
                    product = testData.getDataFor().poster;
                    break;
                case 'PIN':
                    product = testData.getDataFor().PIN;
                    break;
                default:
                    console.log('- unknown productType: "' + productType + '"');
            }

            await this.driver.get(testData.getUrlFor().HealthStore.home + product.productPath);
            const isJournal = (product.type.toLowerCase() === 'journal');
            const isPin = (product.type.toLowerCase() === 'pin');
            const isVSTEbook = (product.type.toLowerCase() === 'vitalsource ebook');
            const isInklingEbook = (product.type.toLowerCase() === 'inkling ebook');

            const storeId = Number(testData.getDataFor().orrStoreId);

            if (isPin && (isUKStore(storeId) || isEUStore(storeId) || isMEAStore(storeId))) {
                await productPage.selectPinSubscriptionTerm(this.driver);
                await productPage.addProductToCart(this.driver, isJournal, isVSTEbook);
            } else if (isJournal && isFranceStore(storeId)) {
                await Helpers.waitUntilElementHasState(this.driver, 'visible', optionTableJournalPage.mainTitleLocator, 40 * 1000);
                await optionTableJournalPage.addProductToCart(this.driver);
            } else if (isVSTEbook && (isUSStore(storeId) || isDEStore(storeId) || isUKStore(storeId) || isEUStore(storeId) || isMEAStore(storeId))) {
                await productPage.selectVitalSourceEbook(this.driver);
                await productPage.addProductToCart(this.driver, isJournal, isVSTEbook);
            } else if (isInklingEbook && (isUSStore(storeId) || isDEStore(storeId) || isUKStore(storeId) || isEUStore(storeId) || isMEAStore(storeId))) {
                await productPage.selectInklingEbook(this.driver);
                await productPage.addProductToCart(this.driver, isJournal, isInklingEbook);
            } else {
                await Helpers.waitUntilElementHasState(this.driver, 'visible', productPage.locators.mainTitleLocator, 40 * 1000);
                if (isJournal && !isSpainStore(storeId) && !isDEStore(storeId) && !isUKStore(storeId) && !isMEAStore(storeId) && !isEUStore(storeId)) {
                    await productPage.fillJournalSelectors(this.driver);
                }
                await productPage.addProductToCart(this.driver, isJournal, isVSTEbook);
            }

            if (isDEStore(storeId)) {
                await this.driver.sleep(3000);
            }

            // Shopping cart expected if item added to order . . .
            let cartPageTitle: string;
            if (isSpainStore(storeId) || isMexicoStore(storeId)) {
                cartPageTitle = 'Cesta de la Compra';
            } if (isFranceStore(storeId)) {
                cartPageTitle = 'Panier';
            } else {
                cartPageTitle = 'Shopping Cart';
            }
            try {
                await Helpers.waitUntilPageTitleContains(this.driver, cartPageTitle, 5 * 1000);
            } catch {
                // If not on shopping cart then output page source to help with debugging . . .
                const actualPageTitle = await Helpers.getPageTitle(this.driver);
                console.log('         - Not redirected to ' + cartPageTitle + ' : ' + actualPageTitle);
//                const source = await this.driver.getPageSource();
//                console.log(source);
//                await Helpers.waitUntilPageTitleContains(this.driver, cartPageTitle, 5 * 1000);
            }

            this.orderDetails.orderTotalItems += 1;
            this.orderDetails.orderTitles.push(product.shortTitle.toLowerCase());
            this.orderDetails.orderIsbns.push(product.printIsbn);
            this.orderDetails.productTypes.push(product.type);
        }
    });

    defineStep(/^I proceed to the checkout page$/, { timeout: 60 * 1000 }, async function (): Promise<void> {
        await checkoutPage.getPage(this.driver); // TODO: The checkout page needs to actually be the result of clicking the Checkout button, rather than directly visiting the URL
    });

    defineStep(/^I login on the checkout page$/, { timeout: 60 * 1000 }, async function (): Promise<void> {
        await checkoutPage.enterLoginDetails(this.driver, this.customerDetails.emailAddress, this.customerDetails.password);
    });

    defineStep(/^I click on the register button$/, { timeout: 60 * 1000 }, async function(): Promise<void> {
        await checkoutPage.clickOnRegister(this.driver);
    });

    defineStep(/^I register$/, { timeout: 60 * 1000 }, async function(): Promise<void> {
        this.customerDetails = config.getCustomerDetails();
        const customer = testData.getDataFor().customerRegistration;
        await registrationPage.register(this.driver, customer);
        this.customerDetails.emailAddress = customer.emailAddress;
        console.log('- Customer\'s email:', this.customerDetails.emailAddress);
    });

    defineStep(/^I place the order with (.*)?$/, { timeout: 60 * 1000 }, async function (paymentSystem: PaymentSystemType): Promise<void> {

        console.log('       - Select billing address');
        try {
            await checkoutPage.selectBillingContinueButton(this.driver);
        } catch {
            console.log('         - retry attempt');
            await checkoutPage.selectBillingContinueButton(this.driver);
        }
//        await this.driver.sleep(15 * 1000);
        const actualPageTitle = await Helpers.getPageTitle(this.driver);
        console.log('       - Choose billing method / place order (' + actualPageTitle + ')');
        switch (paymentSystem) {
            case 'GlobalCollect':
                await checkoutPage.selectPaymentMethod(this.driver, 'visa');
                break;
            case 'eCapture France':
                try {
                    await checkoutPage.selectPaymentContinueButton(this.driver);
                } catch {
                    console.log('         - retry attempt');
                    await checkoutPage.selectPaymentContinueButton(this.driver);
                }
                paymentSystem = 'eCapture';
                break;
            case 'eCapture Germany':
                paymentSystem = 'eCapture';
                break;
            case 'eCapture UK':
            case 'eCapture MEA':
            case 'eCapture EU':
                // Place order but cater for retry situation where billing address failed to be selected and page advances . . .
                try {
                    await checkoutPage.placeOrderButton(this.driver);
                } catch {
//                        const source = await this.driver.getPageSource();
//                        console.log(source);
                    console.log('         - retry attempt');
                    await checkoutPage.selectBillingContinueButton(this.driver);
                    await checkoutPage.placeOrderButton(this.driver);
                }
                paymentSystem = 'eCapture';
                break;
            case 'CIC':
                await checkoutPage.selectPaymentMethod(this.driver, 'CIC');
                break;
            case 'PayPal':
            case 'PayPal DE':
                await checkoutPage.selectPaymentMethod(this.driver, 'paypal');
                await checkoutPage.selectPaymentContinueButton(this.driver);
                break;
            case 'Bank check':
                await checkoutPage.selectPaymentMethod(this.driver, 'bank_check');
                break;
            case 'Proforma Invoice':
                await checkoutPage.selectPaymentMethod(this.driver, 'Proforma Invoice');
                break;
            case 'Direct Debit':
                await checkoutPage.selectPaymentMethod(this.driver, 'Direct Debit');
                await checkoutPage.enterDirectDebitDetails(this.driver);
                break;
            default:
        }

        //  UK and MEA store are missing the terms and conditions checkbox
        console.log('       - Goto checkout');
        const checkout = await checkoutPage.getCheckout(this.driver);
        console.log('       - Summarise order');
        this.orderDetails.fullPrice = checkout.subtotal;
        this.orderDetails.shippingPrice = checkout.shippingCost;
        this.orderDetails.taxTotal = checkout.taxCost;
        this.orderDetails.orderTotal = checkout.grandTotal;
        console.log(`- Total items:  ${this.orderDetails.orderTotalItems}`);
        console.log(`- Full Price: ${testData.getDataFor().currency} ${this.orderDetails.fullPrice}`);
        console.log(`- Shipping Price: ${testData.getDataFor().currency} ${this.orderDetails.shippingPrice}`);
        console.log(`- Tax total: ${testData.getDataFor().currency} ${this.orderDetails.taxTotal}`);
        console.log(`- Order total: ${testData.getDataFor().currency} ${this.orderDetails.orderTotal}`);
        const storeId = Number(testData.getDataFor().orrStoreId);
        if (!(isUKStore(storeId)) && !(isMEAStore(storeId)) && !(isEUStore(storeId))) {
            await Helpers.waitUntilElementHasState(this.driver, 'located', checkoutPage.locators.termsCheckboxLocator, 60 * 1000);
            await checkoutPage.acceptTerms(this.driver);
            console.log('- Terms Accepted');
        }
        await checkoutPage.placeOrder(this.driver);
        console.log('- Order placed');

        console.log('       - Enter payment details for ' + paymentSystem);
        switch (paymentSystem) {
            case 'GlobalCollect':
                await Helpers.waitUntilElementHasState(this.driver, 'located', globalCollect.globalCollectIFrameLocator, 60 * 1000);
                await globalCollect.enterPaymentDetails(this.driver, 'visa');
                await this.driver.sleep(3000);
                break;
            case 'eCapture':
                await eCapturePage.enterPaymentDetails(this.driver, this.customerDetails, 'visa');
                break;
            case 'CIC':
                await CIC.enterPaymentDetails(this.driver, 'visa');
                break;
            case 'PayPal':
                await payPalLoginPage.enterLoginDetails(this.driver);
                await payPalPage.pay(this.driver);
                await payPalPage.returnToMerchant(this.driver);
                break;
            case 'PayPal DE':
                await payPalLoginPage.enterLoginDetails(this.driver);
                await payPalPage.pay(this.driver);
                await this.driver.sleep(15000);
                break;
            case 'Bank check':
            case 'Proforma Invoice':
            case 'Direct Debit':
                break;
            default:
                throw new Error('Unrecognised payment systems: ' + paymentSystem);
        }
    });

    defineStep(/^The order is displayed in the thank you page$/, { timeout: 60 * 1000 }, async function (): Promise<void> {
        await thankYouPage.verifyPageTitle(this.driver);
        const orderNumber = await thankYouPage.getOrderNumber(this.driver);
        this.orderDetails.orderNumberText = orderNumber;
        console.log('- Order number: ' + orderNumber);
    });
}
