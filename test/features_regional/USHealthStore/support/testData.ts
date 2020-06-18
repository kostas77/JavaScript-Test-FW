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
                this.healthStoreUri = 'https://us.dev.am.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://us.staging.am.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://www.us.elsevierhealth.com/';
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
            orrStoreId: 11,
            orderNumberPrefix: 'h',
            currency: 'US$',
            prodCustomer,
            customer,
            printBook,
            deltaJournal,
            argiJournal,
            VstEbook,
            flashCards,
            CD,
            DVD
        };
    }

    public getTitles() {
        return {
            checkoutPage: {
                grandTotal: 'Grand Total',
                subtotal: 'Subtotal',
                shipping: 'Shipping',
                tax: 'Tax Cost'
            },
            emptyCart: 'SHOPPING CART IS EMPTY',
            thankYouPage: 'Elsevier: thank you for your order'
        };
    }

    public getProductDataFor() {
        return {};
    }

    public getSelectorOverrides() {
        return {};
    }
}

export const customer: CustomerDetails = { ...addresses.US.billing , ...{
    firstName: 'customer',
    lastName: 'Automation',
    emailAddress: 'test.elsevier.io@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};

const printBook: IProductTestData = {
    productPath: '/anatomy-and-physiology-for-nurses-9780702077418.html',
    longTitle: 'Anatomy and Physiology for Nurses, 14th Edition',
    shortTitle: 'Anatomy and Physiology for Nurses',
    printIsbn: '9780702077418',
    type: 'printBook'
};

const deltaJournal: IProductTestData = {
    productPath: '/the-breast-0960-9776.html',
    longTitle: 'The Breast',
    shortTitle: 'The Breast',
    printIsbn: '0960-9776',
    type: 'journal'
};

const argiJournal: IProductTestData = {
    productPath: '/academic-pediatrics-1876-2859.html',
    longTitle: 'Academic Pediatrics',
    shortTitle: 'Academic Pediatrics',
    printIsbn: '1876-2859',
    type: 'journal'
};

const VstEbook: IProductTestData = {
    productPath: '/psychiatric-and-mental-health-nursing-in-the-uk-9780702080241.html',
    longTitle: 'Psychiatric and Mental Health Nursing in the UK, 1st Edition',
    shortTitle: 'Psychiatric and Mental Health Nursing in the UK',
    printIsbn: '9780702080241',
    type: 'VitalSource eBook'
};

const flashCards: IProductTestData = {
    productPath: '/mosbys-anatomy-physiology-study-and-review-cards-9780323530538.html',
    longTitle: 'Mosby\'s Anatomy & Physiology Study and Review Cards, 3rd Edition',
    shortTitle: 'Mosby\'s Anatomy & Physiology Study and Review Cards',
    printIsbn: '9780323530538',
    type: 'Flash Cards'
};

const CD: IProductTestData = {
    productPath: '/virtual-clinical-excursions-30-for-maternal-child-nursing-9780323101813.html',
    longTitle: 'Virtual Clinical Excursions 3.0 for Maternal Child Nursing, 4th Edition',
    shortTitle: 'Virtual Clinical Excursions 3.0 for Maternal Child Nursing',
    printIsbn: '9780323101813',
    type: 'CD'
};

const DVD: IProductTestData = {
    productPath: '/mosbys-nursing-assistant-video-skills-student-version-dvd-40-9780323222440.html',
    longTitle: 'Mosby\'s Nursing Assistant Video Skills - Student Version DVD 4.0, 4th Edition',
    shortTitle: 'Mosby\'s Nursing Assistant Video Skills - Student Version DVD 4.0',
    printIsbn: '9780323222440',
    type: 'DVD'
};
