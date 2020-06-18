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
            orrStoreId: 4,
            orderNumberPrefix: 'MX',
            currency: 'US$',
            prodCustomer,
            customer,
            customerRegistration,
            VstEbook
        };
    }

    public getTitles() {
        return {
            checkoutPage : {
                grandTotal: 'Total a pagar',
                subtotal: 'Total',
                shipping: null,
                tax: 'Impuestos'
            },
            emptyCart: 'El cesta de la compra está vacío',
            thankYouPage: '¡Gracias por su compra!'
        };
    }

    public getProductDataFor() {
        return {};
    }

    public getSelectorOverrides() {
        return {};
    }
}

export const customer: CustomerDetails = { ...addresses.MX.billing , ...{
    emailAddress: 'test.elsevier.io@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};

export const customerRegistration: CustomerDetails = { ...addresses.MX.shipping , ...{
    emailAddress: `test.elsevier.io+mexico${new Date().getTime().toString()}@gmail.com`,
    password: 'Sp00n123'
} };

export const VstEbook: IProductTestData = {
    productPath: '/terapias-para-el-tratamiento-de-la-psoriasis-grave-9788491132851.html',
    longTitle: 'terapias para el tratamiento de la psoriasis grave',
    shortTitle: 'terapias para el tratamiento de la psoriasis grave',
    printIsbn: '9788491132851',
    type: 'VitalSource eBook'
};
