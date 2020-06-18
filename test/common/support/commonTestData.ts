import { CommonConfig } from './commonConfig';
import { PaymentDetails } from '@elsevier/submit-order-types/types';

export class CommonTestData {

    protected testEnv: string;
    protected orrUri: string;
    protected serviceUri: string;

    constructor() {
        this.testEnv = CommonConfig.getEnv();
        this.serviceUri = 'https://service.elsevier.com';
        switch (this.testEnv) {
            case 'dev':
                this.orrUri = 'https://orr-web.dev.ecommerce.elsevier.com';
                break;
            case 'localhost':
            case 'staging':
                this.orrUri = 'https://orr-web.staging.ecommerce.elsevier.com';
                break;
            case 'production':
                this.orrUri = 'https://orr-web.prod.ecommerce.elsevier.com';
                break;
            default:
                throw new Error('Unrecognised test environment: ' + this.testEnv);
        }
    }

    public getUrlFor() {
        return {
            orr: {
                home: this.orrUri,
                orders: this.orrUri + '/orders',
                orrStoreSpecificOrdersPage: (orrStoreId: number): string => { return this.orrUri + '/site/' + orrStoreId + '/orders'; },
                blacklistEmails: this.orrUri + '/blacklists/emails',
                blacklistAddresses: this.orrUri + '/blacklists/shipping-addresses',
                whitelistAddresses: this.orrUri + '/whitelists/shipping-addresses'
            },
            service: {
                home: this.serviceUri
            }
        };
    }
}

export const orrAccountDetails = {
    orrUsername: 'svc-scielsoxwllbrd01',
    orrPassword: '4usuXe&8ed&N'
};

export const creditCardDetails = {
    visa: 4444333322221111,
    mastercard: 2222400010000008,
    amex: 370000000000002,
    jcb: 3569990010095841,
    discover: 6445644564456445,
    cvv: 737,
    cid: 7373,
    expDateMonth: 10,
    expDateYear: 2020,
    expDateYearShort: 20
};

export const CkCreditCardDetails: PaymentDetails = {
    paymentMethod: 'eCapture',
    creditCardType: 'AMERICAN EXPRESS',
    creditCardToken: 'X2d2fb2d6dbb4-46ed-855d-c88accc7c903',
    creditCardExpiry: '03/30',
    creditCardAuthNumber: '737',
    creditCardName: 'Test Account',
    paymentErrorCode: ''
};

export const CICDebitCard = {
    visa: '0000010000000002',
    cvv: 123,
    expDateMonth: 12,
    expDateYear: 2021
};
