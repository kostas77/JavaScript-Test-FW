import { Config } from './config';
import { addresses, CustomerDetails } from '../../../common/support/addressesData';
import { IProductTestData, ITestData } from '../../../common/support/interfaces';

export class TestData implements ITestData {

    protected testEnv: Environment;
    protected healthStoreUri: string;

    constructor() {
        this.testEnv = Config.getEnv();
        switch (this.testEnv) {
            case 'dev':
                this.healthStoreUri = 'https://fr.dev.eu.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://fr.staging.eu.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://www.elsevier-masson.fr';
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
            orrStoreId: 12,
            orderNumberPrefix: 'MF',
            currency: '',
            prodCustomer,
            payPalAccount,
            customer,
            customerRegistration,
            VstEbook,
            printBook,
            journal
        };
    }

    public getTitles() {
        return {
            checkoutPage : {
                grandTotal: 'Total final',
                subtotal: 'Sous-total',
                shipping: 'Expédition et traitement',
                tax: null
            },
            emptyCart: 'Le panier est vide',
            thankYouPage: 'Votre commande a bien été enregistrée.'
        };
    }

    public getProductDataFor() {
        return {};
    }

    public getSelectorOverrides() {
        return {};
    }
}

export const customer: CustomerDetails = { ...addresses.FR.billing , ...{
    emailAddress: 'test.elsevier.io+france@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};

const payPalAccount = {
    email: 'sb-xdviu663122@personal.example.com',
    password: 'M5Xgk!6Q',
    cvv: '111'
};

const customerRegistration: CustomerDetails = { ...addresses.FR.shipping , ...{
    emailAddress: `test.elsevier.io+france${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
} };

const VstEbook: IProductTestData = {
    productPath: '/handicap-et-famille-9782294717413.html',
    longTitle: 'Handicap et famille',
    shortTitle: 'Handicap et famille',
    printIsbn: '9782294717413',
    type: 'VitalSource eBook'
};

const printBook: IProductTestData = {
    productPath: '/voyage-en-biochimie-9782842995478.html',
    longTitle: 'Voyage en biochimie',
    shortTitle: 'Voyage en biochimie',
    printIsbn: '9782842995478',
    type: 'printBook'
};

const journal: IProductTestData = {
    productPath: '/revue-de-pneumologie-clinique-0761-8417.html',
    longTitle: 'Revue De Pneumologie Clinique',
    shortTitle: 'Revue De Pneumologie Clinique',
    printIsbn: '0761-8417',
    type: 'journal'
};
