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
                this.healthStoreUri = 'https://uk.dev.eu.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://uk.staging.eu.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https:///www.uk.elsevierhealth.com';
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
            orrStoreId: 13,
            orderNumberPrefix: 'MU',
            currency: '£',
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
                shipping: 'Shipping & Handling (FREE)',
                tax: null
            },
            emptyCart: 'SHOPPING CART IS EMPTY',
            thankYouPage: 'Thank you for your purchase!'
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

export const customer: CustomerDetails = { ...addresses.GB.billing , ...{
    emailAddress: 'test.elsevier.io+uk@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};

const customerRegistration: CustomerDetails = { ...addresses.GB.shipping , ...{
    emailAddress: `test.elsevier.io+uk${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
} };

const printBook: IProductTestData = {
    productPath: '/psychiatric-drugs-explained-9780702045080.html',
    longTitle: 'Psychiatric Drugs Explained, 6th Edition',
    shortTitle: 'Psychiatric Drugs Explained',
    printIsbn: '9780702045080',
    type: 'printBook'
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

const flashCards: IProductTestData = {
    productPath: '/cell-biology-playing-cards-9780323655583.html',
    longTitle: 'Cell Biology Playing Cards, 1st Edition',
    shortTitle: 'Cell Biology Playing Cards',
    printIsbn: '9780323655583',
    type: 'Flash Cards'
};

const poster: IProductTestData = {
    productPath: '/netter-clinical-charts-9781416054580.html',
    longTitle: 'Netter Clinical Charts, 1st Edition',
    shortTitle: 'Netter Clinical Charts',
    printIsbn: '9781416054580',
    type: 'Poster'
};

const VstEbook: IProductTestData = {
    productPath: '/essential-surgery-9780702076336.html',
    longTitle: 'Essential Surgery, 6th Edition',
    shortTitle: 'Essential Surgery',
    printIsbn: '9780702076336',
    type: 'VitalSource eBook'
};

const InklingEbook: IProductTestData = {
    productPath: '/cytology-9780323636384.html',
    longTitle: 'Cytology, 5th Edition',
    shortTitle: 'Cytology',
    printIsbn: '9780323636384', // Alternate ISBN is 9780323608398 9780323608381
    type: 'Inkling eBook'
};

const onlineResources: IProductTestData = {
    productPath: '/secrets-heart-lung-sounds-audio-workshop-access-code-9780323415293.html',
    longTitle: 'Secrets Heart & Lung Sounds Audio Workshop Access Code, 2nd Edition',
    shortTitle: 'Secrets Heart & Lung Sounds Audio Workshop Access Code',
    printIsbn: '9780323415293',
    type: 'Online Resources'
};

const PIN: IProductTestData = {
    productPath: '/elsevier-examprep-uk-basic-science-9780702061974.html',
    longTitle: 'Elsevier ExamPrep UK Basic Science, 1st Edition',
    shortTitle: 'Elsevier ExamPrep UK Basic Science',
    printIsbn: '9780702061974',
    type: 'PIN'
};

const journal: IProductTestData = {
    productPath: '/advances-in-integrative-medicine-22129588.html',
    longTitle: 'Advances in Integrative Medicine',
    shortTitle: 'Advances in Integrative Medicine',
    printIsbn: '2212-9588',
    type: 'journal'
};



