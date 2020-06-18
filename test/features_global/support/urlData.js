"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlData {
    constructor(testEnv) {
        this.testEnv = testEnv;
        switch (this.testEnv) {
            case 'dev':
                this.squizUri = 'https://elsevier-internet-dev.squiz.co.uk';
                this.checkoutUri = 'https://checkout.dev.ecommerce.elsevier.com';
                this.ckUri = 'http://clinicalkey.dev.ecommerce.elsevier.com';
                this.ckCheckoutUri = 'https://checkout.ck-dev.clinicalkey.com';
                this.amirsysExpertPathUri = 'http://expertpath.dev.ecommerce.elsevier.com/pricing/';
                this.amirsysImmunoQueryUri = 'http://immunoquery.dev.ecommerce.elsevier.com/pricing/';
                this.amirsysPATHPrimerUri = 'http://pathprimer.dev.ecommerce.elsevier.com/pricing/';
                this.amirsysRADPrimerUri = 'http://radprimer.dev.ecommerce.elsevier.com/pricing/';
                this.amirsysSTATdxUri = 'http://statdx.dev.ecommerce.elsevier.com/pricing/';
                this.amirsysCheckoutUri = 'https://checkout-amirsys.dev.ecommerce.elsevier.com';
                this.renewalsUri = 'https://renewals.dev.ecommerce.elsevier.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            case 'staging':
                this.squizUri = 'https://elsevier.staging.squiz.co.uk';
                this.checkoutUri = 'https://checkout.staging.ecommerce.elsevier.com';
                this.ckUri = 'http://clinicalkey.staging.ecommerce.elsevier.com';
                this.amirsysExpertPathUri = 'http://expertpath.staging.ecommerce.elsevier.com/pricing/';
                this.amirsysImmunoQueryUri = 'http://immunoquery.staging.ecommerce.elsevier.com/pricing/';
                this.amirsysPATHPrimerUri = 'http://pathprimer.staging.ecommerce.elsevier.com/pricing/';
                this.amirsysRADPrimerUri = 'http://radprimer.staging.ecommerce.elsevier.com/pricing/';
                this.amirsysSTATdxUri = 'http://statdx.staging.ecommerce.elsevier.com/pricing/';
                this.amirsysCheckoutUri = 'https://checkout-amirsys.staging.ecommerce.elsevier.com';
                this.ckCheckoutUri = 'https://checkout.ck2-cert.clinicalkey.com';
                this.renewalsUri = 'https://renewals.staging.ecommerce.elsevier.com';
                this.sdUri = 'https://www.qa.sciencedirect.com';
                this.sdCheckoutUri = 'https://science-direct-checkout.staging.ecommerce.elsevier.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            case 'production':
                this.squizUri = 'https://www.elsevier.com';
                this.checkoutUri = 'https://checkout.elsevier.com';
                this.ckUri = 'http://store.clinicalkey.com';
                this.amirsysExpertPathUri = 'https://www.expertpath.com/pricing/';
                this.amirsysImmunoQueryUri = 'https://www.immunoquery.com/pricing/';
                this.amirsysPATHPrimerUri = 'https://www.pathprimer.com/pricing/';
                this.amirsysRADPrimerUri = 'https://www.radprimer.com/pricing/';
                this.amirsysSTATdxUri = 'https://www.statdx.com/pricing/';
                this.amirsysCheckoutUri = 'https://checkout-amirsys.elsevier.com';
                this.ckCheckoutUri = 'https://checkout.clinicalkey.com';
                this.renewalsUri = 'https://renewals.elsevier.com';
                this.sdUri = 'https://www.sciencedirect.com';
                this.serviceUri = 'https://service.elsevier.com';
                break;
            default:
                throw new Error('Unrecognised test environment: ' + testEnv);
        }
    }
    getUrlFor() {
        return {
            elsevier: {
                home: this.squizUri,
                homeNoCache: `${this.squizUri}/_nocache`,
                auth: `${this.checkoutUri}/auth`,
                logout: `${this.checkoutUri}/logout`,
                account: `${this.checkoutUri}/account`,
                address: `${this.checkoutUri}/address`,
                orderHistory: `${this.checkoutUri}/order-history`,
                subscriptions: `${this.checkoutUri}/subscriptions`,
                verification: `${this.checkoutUri}/send-verification`,
                cart: `${this.checkoutUri}/cart`,
                catalog: `${this.squizUri}/catalog`,
                embase: `${this.squizUri}/solutions/embase-biomedical-research`,
                books: `${this.squizUri}/books`,
                bookSeries: `${this.squizUri}/books/book-series`,
                personalJournal: `${this.squizUri}/journals/personal`,
                institutionalJournal: `${this.squizUri}/journals/institutional`,
                articleChoice: `${this.squizUri}/solutions/sciencedirect/content/articlechoice`,
                connectAccessibility: `${this.squizUri}/connect/the-many-faces-of-accessibility`,
                kitchenSink: `${this.squizUri}/io/admin/kitchensink`,
                search: `${this.squizUri}/test-folder/elcm-test/search`
            },
            sd: {
                home: this.sdUri,
                article: `${this.sdUri}/science/article/pii`,
                cart: this.sdCheckoutUri,
                checkout: `${this.sdCheckoutUri}/checkout`,
                thanks: `${this.sdCheckoutUri}/thanks`,
                orderHistory: `${this.sdCheckoutUri}/order-history`,
                signout: `${this.sdCheckoutUri}/sign-out`
            },
            ck: {
                home: this.ckUri,
                logout: `${this.ckCheckoutUri}/logout`,
                orderHistory: `${this.ckCheckoutUri}/order-history`
            },
            amirsys: {
                homeExpertPathUri: this.amirsysExpertPathUri,
                homeImmunoQueryUri: this.amirsysImmunoQueryUri,
                homePATHPrimerUri: this.amirsysPATHPrimerUri,
                homeRADPrimerUri: this.amirsysRADPrimerUri,
                homeSTATdxUri: this.amirsysSTATdxUri,
                logout: `${this.amirsysCheckoutUri}/logout`,
                checkoutUri: this.amirsysCheckoutUri,
                orderHistory: `${this.amirsysCheckoutUri}/order-history`
            },
            renewals: {
                home: this.renewalsUri
            },
            service: {
                home: this.serviceUri,
                helpAndContact: `${this.squizUri}/app/home/supporthub/ecommerce`
            }
        };
    }
}
exports.UrlData = UrlData;
//# sourceMappingURL=urlData.js.map