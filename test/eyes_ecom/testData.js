"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseUriPrintBook = 'https://www.elsevier.com/books/robot-builders-cookbook/bishop/978-0-7506-6556-8';
const baseUriJournal = 'https://elsevier.staging.squiz.co.uk/journals/personal/robotics-and-computer-integrated-manufacturing/0736-5845';
const baseUriCheckout = 'https://elsevier.staging.squiz.co.uk/journals/personal/robotics-and-computer-integrated-manufacturing/0736-5845';
const baseUriCKHome = 'http://clinicalkey.staging.ecommerce.elsevier.com';
const baseUriCKProduct = 'http://clinicalkey.staging.ecommerce.elsevier.com/product/otolaryngology/';
const baseUriELCMHomeEnGb = 'https://elsevier.staging.squiz.co.uk/en-gb';
exports.viewport_1200x700 = { width: 1200, height: 700 };
exports.viewport_360x612 = { width: 360, height: 612 };
exports.viewport_834x1120 = { width: 834, height: 1120 };
exports.viewport_414x719 = { width: 414, height: 719 };
exports.testData = [{
        url: baseUriPrintBook,
        appNamePrefix: 'eCom global store',
        testNamePrefix: 'Product page - Print book',
        goto2ndPage: false
    }, {
        url: baseUriJournal,
        appNamePrefix: 'eCom global store',
        testNamePrefix: 'Product page - Journal',
        goto2ndPage: false
    }, {
        url: baseUriCheckout,
        appNamePrefix: 'eCom global store',
        testNamePrefix: 'Checkout page',
        goto2ndPage: false
    }, {
        url: baseUriCKHome,
        appNamePrefix: 'CK store',
        testNamePrefix: 'Home page',
        goto2ndPage: false
    }, {
        url: baseUriCKProduct,
        appNamePrefix: 'CK store',
        testNamePrefix: 'Product page',
        goto2ndPage: false
    },
    {
        url: baseUriELCMHomeEnGb,
        appNamePrefix: 'ELCM',
        testNamePrefix: 'Home page - EN_GB',
        goto2ndPage: false
    }];
exports.testData1 = (envName) => {
    return [{
            url: `${envName} ${baseUriPrintBook}`,
            appNamePrefix: 'Demo app',
            testNamePrefix: 'Elsevier product page',
            goto2ndPage: false
        }];
};
//# sourceMappingURL=testData.js.map