"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const addressesData_1 = require("../../../common/support/addressesData");
class TestData {
    constructor() {
        this.testEnv = config_1.Config.getEnv();
        switch (this.testEnv) {
            case 'dev':
                this.healthStoreUri = 'https://mx.dev.am.regional.elsevier.com';
                break;
            case 'staging':
                this.healthStoreUri = 'https://mx.staging.am.regional.elsevier.com';
                break;
            case 'production':
                this.healthStoreUri = 'https://tienda.elsevierhealth.com';
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
            orrStoreId: 4,
            orderNumberPrefix: 'MX',
            currency: 'US$',
            prodCustomer: exports.prodCustomer,
            customer: exports.customer,
            customerRegistration: exports.customerRegistration,
            eBook: exports.eBook
        };
    }
    getTitles() {
        return {
            checkoutPage: {
                grandTotal: 'Total a pagar',
                subtotal: 'Total',
                shipping: null,
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
exports.customer = Object.assign(Object.assign({}, addressesData_1.addresses.MX.billing), {
    emailAddress: 'test.elsevier.io@gmail.com',
    password: 'Spoon123'
});
exports.prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};
exports.customerRegistration = Object.assign(Object.assign({}, addressesData_1.addresses.MX.shipping), {
    emailAddress: `test.elsevier.io+mexico${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
});
exports.eBook = {
    productPath: '/terapias-para-el-tratamiento-de-la-psoriasis-grave-9788491132851.html',
    longTitle: 'terapias para el tratamiento de la psoriasis grave',
    shortTitle: 'terapias para el tratamiento de la psoriasis grave',
    printIsbn: '9788491132851',
    type: 'VitalSource eBook'
};
//# sourceMappingURL=testData.js.map