"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const addressesData_1 = require("../../../common/support/addressesData");
class TestData {
    constructor() {
        this.testEnv = config_1.Config.getEnv();
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
            orrStoreId: 12,
            orderNumberPrefix: 'MF',
            currency: '',
            prodCustomer: exports.prodCustomer,
            payPalAccount,
            customer: exports.customer,
            customerRegistration,
            eBook,
            printBook,
            journal
        };
    }
    getTitles() {
        return {
            checkoutPage: {
                grandTotal: 'Total final',
                subtotal: 'Sous-total',
                shipping: 'Expédition et traitement',
                tax: null
            },
            emptyCart: 'Le panier est vide',
            thankYouPage: 'Votre commande a bien été enregistrée.'
        };
    }
    getProductDataFor() {
        return {};
    }
}
exports.TestData = TestData;
exports.customer = Object.assign(Object.assign({}, addressesData_1.addresses.FR.billing), {
    emailAddress: 'test.elsevier.io+france@gmail.com',
    password: 'Spoon123'
});
exports.prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};
const payPalAccount = {
    email: 'vineet.agarwal@infoprolearning.com',
    password: 'vineet@123x'
};
const customerRegistration = Object.assign(Object.assign({}, addressesData_1.addresses.FR.shipping), {
    emailAddress: `test.elsevier.io+france${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
});
const eBook = {
    productPath: '/handicap-et-famille-9782294717413.html',
    longTitle: 'Handicap et famille',
    shortTitle: 'Handicap et famille',
    printIsbn: '9782294717413',
    type: 'VitalSource eBook'
};
const printBook = {
    productPath: '/voyage-en-biochimie-9782842995478.html',
    longTitle: 'Voyage en biochimie',
    shortTitle: 'Voyage en biochimie',
    printIsbn: '9782842995478',
    type: 'printBook'
};
const journal = {
    productPath: '/annales-de-pathologie-0242-6498.html',
    longTitle: 'Annales de pathologie',
    shortTitle: 'Annales de pathologie',
    printIsbn: '0242-6498',
    type: 'journal'
};
//# sourceMappingURL=testData.js.map