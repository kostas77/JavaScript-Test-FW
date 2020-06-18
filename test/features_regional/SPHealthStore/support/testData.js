"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const addressesData_1 = require("../../../common/support/addressesData");
class TestData {
    constructor() {
        this.testEnv = config_1.Config.getEnv();
        switch (this.testEnv) {
            case 'dev':
                this.healthStoreUri = 'https://sp.dev.eu.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://sp.staging.eu.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://tienda.elsevier.es';
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
            orrStoreId: '3',
            orderNumberPrefix: 'MS',
            currency: '€',
            prodCustomer: exports.prodCustomer,
            customer: exports.customer,
            printBook,
            eBook,
            cardDeck,
            journal
        };
    }
    getTitles() {
        return {
            checkoutPage: {
                grandTotal: 'Total a pagar',
                subtotal: 'Total',
                shipping: 'Gastos',
                tax: 'Impuestos'
            },
            emptyCart: 'El cesta de la compra está vacío',
            thankYouPage: '¡Gracias por su compra!'
        };
    }
    getProductDataFor() {
        return {};
    }
}
exports.TestData = TestData;
exports.customer = Object.assign(Object.assign({}, addressesData_1.addresses.ES.billing), {
    emailAddress: 'test.elsevier.io+spain@gmail.com',
    password: 'Spoon123'
});
exports.prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};
const printBook = {
    productPath: '/medicina-transfusional-perioperatoria-9788491132417.html',
    longTitle: 'Medicina transfusional perioperatoria',
    shortTitle: 'Medicina transfusional perioperatoria',
    printIsbn: '9788491132417',
    type: 'printBook'
};
const cardDeck = {
    productPath: '/baraja-de-cartas-de-anatomia.html',
    longTitle: 'baraja de cartas de anatomía',
    shortTitle: 'baraja de cartas de anatomía',
    printIsbn: '9852541441563',
    type: 'Flash Cards'
};
const eBook = {
    productPath: '/vst-esmedicina-personalizada-9788445821589.html',
    longTitle: 'Medicina personalizada',
    shortTitle: 'Medicina personalizada',
    printIsbn: '9788445821589',
    type: 'VitalSource eBook'
};
const journal = {
    productPath: '/fisioterapia-02115638.html',
    longTitle: 'FISIOTERAPIA',
    shortTitle: 'FISIOTERAPIA',
    printIsbn: '0211-5638',
    type: 'journal'
};
//# sourceMappingURL=testData.js.map