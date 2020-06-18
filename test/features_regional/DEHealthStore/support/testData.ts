import { Config } from './config';
import { addresses, CustomerDetails } from '../../../common/support/addressesData';
import { ITestData, IProductTestData } from '../../../common/support/interfaces';

export class TestData implements ITestData {

    protected testEnv: Environment;
    protected healthStoreUri: string;

    constructor() {
        this.testEnv = Config.getEnv();
        switch (this.testEnv) {
            case 'dev':
                this.healthStoreUri = 'https://de.dev.eu.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://de.staging.eu.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://de.prod.eu.regional.elsevier.com';
                break;
            default:
                throw new Error('Unrecognised test environment: ' + this.testEnv);
        }
    }

    public getUrlFor() {
        return {
            HealthStore: {
                home: this.healthStoreUri,
                checkout: this.healthStoreUri + '/checkout/onepage/',
                cart: this.healthStoreUri + '/checkout/cart/'
            }
        };
    }

    public getDataFor() {
        return {
            orrStoreId: 16,
            orderNumberPrefix: 'MD',
            currency: '',
            prodCustomer,
            payPalAccount,
            bankAccount,
            customer,
            customerRegistration,
            printBook,
            VstEbook,
            journal,
            flashCards,
            looseLeaf,
            other,
            poster,
            PIN,
            DVD,
            CD
        };
    }

    public getTitles() {
        return {
            checkoutPage : {
                grandTotal: 'SUMME (INKL. MWST.):',
                subtotal: 'Zwischensumme',
                shipping: 'Lieferung und Verarbeitung (keine Versandkosten - Deutschland)',
                tax: null
            },
            emptyCart: 'IHR WARENKORB IST LEER',
            thankYouPage: 'Danke für Ihren Einkauf!'
        };
    }

    public getProductDataFor() {
        return {};
    }

    public getSelectorOverrides() {
        return {
            checkoutPage: {
                termsCheckboxLocator: '#checkout-agreements > ol > li > div > input',
                payPalTypeLocator: '#p_sub_method_840'
            },
            payPalPage: {
                continueButtonLocator: '#payment-submit-btn'
            }
        };
    }
}

export const customer: CustomerDetails = { ...addresses.DE.billing , ...{
    emailAddress: 'test.elsevier.io+germany2@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Bøb',
    lastName: 'German',
    emailAddress: `test.elsevier.io+germany${new Date().getTime().toString()}@gmail.com`,
    password: 'Spoon123'
};

const payPalAccount = {
    email: 'sb-xdviu663122@personal.example.com',
    password: 'M5Xgk!6Q',
    cvv: '111'
};

const customerRegistration: CustomerDetails = { ...addresses.DE.shipping , ...{
    emailAddress: `test.elsevier.io+germany${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
} };

const bankAccount = {
    iban: 'DE12500105170648489890',
    bic: '50010517'
};

const VstEbook: IProductTestData = {
    productPath: '/praktische-endokrinologie-9783437246807.html',
    longTitle: 'Praktische Endokrinologie',
    shortTitle: 'Praktische Endokrinologie',
    printIsbn: '9783437246807',
    type: 'VitalSource eBook'
};

const printBook: IProductTestData = {
    productPath: '/sobotta-anatomy-textbook-9780702067600.html',
    longTitle: 'Sobotta Anatomy Textbook',
    shortTitle: 'Sobotta Anatomy Textbook',
    printIsbn: '9780702067600',
    type: 'printBook'
};

const journal: IProductTestData = {
    productPath: '/journal-of-herbal-medicine-2210-8033.html',
    longTitle: 'Journal of Herbal Medicine',
    shortTitle: 'Journal of Herbal Medicine',
    printIsbn: '2210-8033',
    type: 'journal'
};

const flashCards: IProductTestData = {
    productPath: '/lernkarten-altenpflege-9783437285127.html',
    longTitle: 'Lernkarten Altenpflege',
    shortTitle: 'Lernkarten Altenpflege',
    printIsbn: '9783437285127',
    type: 'Flash Cards'
};

const looseLeaf: IProductTestData = {
    productPath: '/miq-12-lyme-borreliose-9783437226052.html',
    longTitle: 'MIQ 12: Lyme-Borreliose',
    shortTitle: 'MIQ 12: Lyme-Borreliose',
    printIsbn: '9783437226052',
    type: 'Loose-leaf'
};

const other: IProductTestData = {
    productPath: '/erinner-dich-9783437281082.html',
    longTitle: 'Erinner\' Dich!',
    shortTitle: 'Erinner\' Dich!',
    printIsbn: '9783437281082',
    type: 'Other'
};

const poster: IProductTestData = {
    productPath: '/taping-wandtafel-techniken-9783437453724.html',
    longTitle: 'Taping Wandtafel Techniken',
    shortTitle: 'Taping Wandtafel Techniken',
    printIsbn: '9783437453724',
    type: 'Poster'
};

const PIN: IProductTestData = {
    productPath: '/therapie-handbuch-online-only-abonnement-9783437220890.html',
    longTitle: 'Therapie-Handbuch Online-Only-Abonnement',
    shortTitle: 'Therapie-Handbuch Online-Only-Abonnement',
    printIsbn: '9783437220890',
    type: 'PIN'
};

const DVD: IProductTestData = {
    productPath: '/kommunikation-in-der-pflege-9783437277603.html',
    longTitle: 'Kommunikation In Der Pflege',
    shortTitle: 'Kommunikation In Der Pflege',
    printIsbn: '9783437277603',
    type: 'DVD'
};

const CD: IProductTestData = {
    productPath: '/hoerspiele-fuer-senioren-9783437282904.html',
    longTitle: 'Hörspiele für Senioren',
    shortTitle: 'Hörspiele für Senioren',
    printIsbn: '9783437282904',
    type: 'CD'
};
