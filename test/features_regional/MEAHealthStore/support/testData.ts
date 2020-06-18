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
                this.healthStoreUri = 'https://mea.dev.eu.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://mea.staging.eu.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://www.mea.elsevierhealth.com';
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
            orrStoreId: 14,
            orderNumberPrefix: 'MM',
            currency: '$',
            prodCustomer,
            customer,
            customerRegistration,
            printBook,
            DVD,
            CD,
            flashCards,
            poster,
            VstEbook,
            onlineResources,
            PIN,
            journal,
            InklingEbook
        };
    }

    public getProductDataFor() {
        return {};
    }

    public getTitles() {
        return {
            checkoutPage : {
                grandTotal: 'Total (inc. VAT)',
                subtotal: 'Subtotal',
                shipping: 'Shipping & Handling (Flat)',
                tax: 'Tax'
            },
            emptyCart: 'SHOPPING CART IS EMPTY',
            thankYouPage: 'YOUR ORDER HAS BEEN RECEIVED.'
        };
    }

    public getSelectorOverrides() {
        return {
            productPage: {
                vitalSourceEbookSelectorLocator: '#add-to-cart-pdf',
                inklingEbookSelectorLocator: '#add-to-cart-virtual'
            }
        };
    }
}

export const customer: CustomerDetails = { ...addresses.SA.billing , ...{
    emailAddress: 'test.elsevier.io+mea@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Prince',
    lastName: 'Salman',
    emailAddress: `test.elsevier.io+mea${new Date().getTime().toString()}@gmail.com`,
    password: 'Spoon123'
};

const customerRegistration: CustomerDetails = { ...addresses.SA.shipping , ...{
    emailAddress: `test.elsevier.io+mea${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
} };

const printBook: IProductTestData = {
    productPath: '/acupuncture-and-moxibustion-9780443045561.html',
    longTitle: 'Acupuncture and Moxibustion, 1st Edition',
    shortTitle: 'Acupuncture and Moxibustion',
    printIsbn: '9780443045561',
    type: 'printBook'
};

const VstEbook: IProductTestData = {
    productPath: '/essential-surgery-9780702076336.html',
    longTitle: 'Essential Surgery, 6th Edition',
    shortTitle: 'Essential Surgery',
    printIsbn: '9780702076336',
    type: 'VitalSource eBook'
};

const InklingEbook: IProductTestData = {
    productPath: '/pediatric-dentistry-9780323610049.html',
    longTitle: 'Pediatric Dentistry, 6th Edition',
    shortTitle: 'Pediatric Dentistry',
    printIsbn: '9780323610049', // Alternate ISBN is 9780323608398 9780323608381
    type: 'Inkling eBook'
};

const journal: IProductTestData = {
    productPath: '/advances-in-integrative-medicine-22129588.html',
    longTitle: 'Advances in Integrative Medicine',
    shortTitle: 'Advances in Integrative Medicine',
    printIsbn: '2212-9588',
    type: 'journal'
};

const flashCards: IProductTestData = {
    productPath: '/mosbys-anatomy-physiology-study-and-review-cards-9780323530538.html',
    longTitle: 'Mosby\'s Anatomy & Physiology Study and Review Cards, 3rd Edition',
    shortTitle: 'Mosby\'s Anatomy & Physiology Study And Review Cards',
    printIsbn: '9780323530538',
    type: 'Flash Cards'
};

const poster: IProductTestData = {
    productPath: '/peptic-ulcer-chart-9781933247212.html',
    longTitle: 'Peptic Ulcer Chart, 1st Edition',
    shortTitle: 'Peptic Ulcer Chart',
    printIsbn: '9781933247212',
    type: 'Poster'
};

const PIN: IProductTestData = {
    productPath: '/elsevier-examprep-uk-medical-finals-9780702061967.html',
    longTitle: 'Elsevier ExamPrep UK Medical Finals, 1st Edition',
    shortTitle: 'Elsevier ExamPrep UK Medical Finals',
    printIsbn: '9780702061967',
    type: 'PIN'
};

const onlineResources: IProductTestData = {
    productPath: '/secrets-heart-lung-sounds-audio-workshop-access-code-9780323415293.html',
    longTitle: 'Secrets Heart & Lung Sounds Audio Workshop Access Code, 2nd Edition',
    shortTitle: 'Secrets Heart & Lung Sounds Audio Workshop Access Code',
    printIsbn: '9780323415293',
    type: 'Online Resources'
};

const DVD: IProductTestData = {
    productPath: '/physical-examination-and-health-assessment-dvd-series-dvd-8-abdomen-version-2-9781416040200.html',
    longTitle: 'Physical Examination and Health Assessment DVD Series: DVD 8: Abdomen, Version 2, 1st Edition',
    shortTitle: 'Physical Examination and Health Assessment DVD Series: DVD 8',
    printIsbn: '9781416040200',
    type: 'DVD'
};

const CD: IProductTestData = {
    productPath: '/medisoft-version-16-demo-cd-9781437743616.html',
    longTitle: 'Medisoft Version 16 Demo CD, 1st Edition',
    shortTitle: 'Medisoft Version 16 Demo CD',
    printIsbn: '9781437743616',
    type: 'CD'
};

