"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonConfig_1 = require("./commonConfig");
class CommonTestData {
    constructor() {
        this.testEnv = commonConfig_1.CommonConfig.getEnv();
        switch (this.testEnv) {
            case 'dev':
                this.orrUri = 'https://orr-web.dev.ecommerce.elsevier.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            case 'staging':
                this.orrUri = 'https://orr-web.staging.ecommerce.elsevier.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            case 'production':
                this.orrUri = 'https://orr-web.prod.ecommerce.elsevier.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            default:
                throw new Error('Unrecognised test environment: ' + this.testEnv);
        }
    }
    getUrlFor() {
        return {
            orr: {
                home: this.orrUri,
                orders: this.orrUri + '/orders',
                orrStoreSpecificOrdersPage: (orrStoreId) => { return this.orrUri + '/site/' + orrStoreId + '/orders'; },
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
exports.CommonTestData = CommonTestData;
exports.orrAccountDetails = {
    orrUsername: 'svc-scielsoxwllbrd01',
    orrPassword: '4usuXe&8ed&N'
};
exports.creditCardDetails = {
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
exports.CICDebitCard = {
    visa: '0000010000000002',
    cvv: 123,
    expDateMonth: 12,
    expDateYear: 2019
};
//# sourceMappingURL=commonTestData.js.map