"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const addressesData_1 = require("../../../common/support/addressesData");
class TestData {
    constructor() {
        this.testEnv = config_1.Config.getEnv();
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
    getUrlFor() {
        return {
            HealthStore: {
                home: this.healthStoreUri,
                checkout: this.healthStoreUri + '/checkout/onepage/',
                cart: this.healthStoreUri + '/checkout/cart/'
            }
        };
    }
    getDataFor() {
        return {
            orrStoreId: 11,
            orderNumberPrefix: 'h',
            currency: 'US$',
            prodCustomer: exports.prodCustomer,
            customer: exports.customer,
            printBook,
            deltaJournal,
            argiJournal,
            eBook,
            flashCards,
            CD,
            DVD
        };
    }
    getTitles() {
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
    getProductDataFor() {
        return {};
    }
}
exports.TestData = TestData;
exports.customer = Object.assign(Object.assign({}, addressesData_1.addresses.US.billing), {
    firstName: 'customer',
    lastName: 'Automation',
    emailAddress: 'test.elsevier.io@gmail.com',
    password: 'Spoon123'
});
exports.prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};
const printBook = {
    productPath: '/sepsis-an-issue-of-critical-care-clinics-9780323566339.html',
    longTitle: 'Sepsis, An Issue of Critical Care Clinics, 1st Edition',
    shortTitle: 'Sepsis, An Issue of Critical Care Clinics',
    printIsbn: '9780323566339',
    type: 'printBook'
};
const deltaJournal = {
    productPath: '/the-breast-0960-9776.html',
    longTitle: 'The Breast',
    shortTitle: 'The Breast',
    printIsbn: '0960-9776',
    type: 'journal'
};
const argiJournal = {
    productPath: '/academic-pediatrics-1876-2859.html',
    longTitle: 'Academic Pediatrics',
    shortTitle: 'Academic Pediatrics',
    printIsbn: '1876-2859',
    type: 'journal'
};
const eBook = {
    productPath: '/vst-oral-disease-e-book-9780702040276.html',
    longTitle: 'Oral Disease E-Book, 2nd Edition',
    shortTitle: 'Oral Disease E-Book',
    printIsbn: '9780702040276',
    type: 'VitalSource eBook'
};
const flashCards = {
    productPath: '/mosbys-anatomy-physiology-study-and-review-cards-9780323530538.html',
    longTitle: 'Mosby\'s Anatomy & Physiology Study and Review Cards, 3rd Edition',
    shortTitle: 'Mosby\'s Anatomy & Physiology Study and Review Cards',
    printIsbn: '9780323530538',
    type: 'Flash Cards'
};
const CD = {
    productPath: '/virtual-clinical-excursions-30-for-maternal-child-nursing-9780323101813.html',
    longTitle: 'Virtual Clinical Excursions 3.0 for Maternal Child Nursing, 4th Edition',
    shortTitle: 'Virtual Clinical Excursions 3.0 for Maternal Child Nursing',
    printIsbn: '9780323101813',
    type: 'CD-ROM'
};
const DVD = {
    productPath: '/mosbys-nursing-assistant-video-skills-student-version-dvd-40-9780323222440.html',
    longTitle: 'Mosby\'s Nursing Assistant Video Skills - Student Version DVD 4.0, 4th Edition',
    shortTitle: 'Mosby\'s Nursing Assistant Video Skills - Student Version DVD 4.0',
    printIsbn: '9780323222440',
    type: 'DVD'
};
//# sourceMappingURL=testData.js.map