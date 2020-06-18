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
            orrStoreId: '3',
            orderNumberPrefix: 'MS',
            currency: '€',
            prodCustomer,
            customer,
            printBook,
            VstEbook,
            cardDeck,
            journal
        };
    }

    public getTitles() {
        return {
            checkoutPage : {
                grandTotal: 'Total a pagar',
                subtotal: 'Total',
                shipping: 'Gastos',
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

export const customer: CustomerDetails = { ...addresses.ES.billing , ...{
    emailAddress: 'test.elsevier.io+spain@gmail.com',
    password: 'Spoon123'
} };

export const prodCustomer = {
    firstName: 'Will',
    lastName: 'Jenkins',
    emailAddress: 'w.jenkins.1@elsevier.com',
    password: 'Spoon123'
};

const printBook: IProductTestData = {
    productPath: '/medicina-transfusional-perioperatoria-9788491132417.html',
    longTitle: 'Medicina transfusional perioperatoria',
    shortTitle: 'Medicina transfusional perioperatoria',
    printIsbn: '9788491132417',
    type: 'printBook'
};

const cardDeck: IProductTestData = {
    productPath: '/baraja-de-cartas-de-anatomia.html',
    longTitle: 'baraja de cartas de anatomía',
    shortTitle: 'baraja de cartas de anatomía',
    printIsbn: '9852541441563',
    type: 'Flash Cards'
};

const VstEbook: IProductTestData = {
    productPath: '/vst-esmedicina-personalizada-9788445821589.html',
    longTitle: 'Medicina personalizada',
    shortTitle: 'Medicina personalizada',
    printIsbn: '9788445821589',
    type: 'VitalSource eBook'
};

const journal: IProductTestData = {
    productPath: '/fisioterapia-02115638.html',
    longTitle: 'FISIOTERAPIA',
    shortTitle: 'FISIOTERAPIA',
    printIsbn: '0211-5638',
    type: 'journal'
};
