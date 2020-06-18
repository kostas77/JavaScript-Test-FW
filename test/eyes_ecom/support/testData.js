"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseUriPrintBook = 'https://www.elsevier.com/books/robot-builders-cookbook/bishop/978-0-7506-6556-8';
const baseUriJournal = 'https://elsevier.staging.squiz.co.uk/journals/personal/robotics-and-computer-integrated-manufacturing/0736-5845';
const baseUriPersonalDetails = 'https://checkout.staging.ecommerce.elsevier.com/account';
const baseUriAddressBook = 'https://checkout.staging.ecommerce.elsevier.com/address';
const baseUriChangePassword = 'https://checkout.staging.ecommerce.elsevier.com/change-password';
const baseUriOnlineSubscriptions = 'https://checkout.staging.ecommerce.elsevier.com/subscriptions';
const baseUriOrderHistory = 'https://checkout.staging.ecommerce.elsevier.com/order-history';
const baseUriCheckout = 'https://elsevier.staging.squiz.co.uk/checkout';
const baseUriCKPersonalDetails = 'https://checkout.ck2-cert.clinicalkey.com/account';
const baseUriCKAddressBook = 'https://checkout.ck2-cert.clinicalkey.com/address';
const baseUriCKChangePassword = 'https://checkout.staging.ecommerce.elsevier.com/change-password';
const baseUriCKOnlineSubscriptions = 'https://checkout.staging.ecommerce.elsevier.com/subscriptions';
const baseUriCKOrderHistory = 'https://checkout.staging.ecommerce.elsevier.com/order-history';
const baseUriCKHome = 'http://clinicalkey.staging.ecommerce.elsevier.com';
const baseUriCKAboutUs = 'http://clinicalkey.staging.ecommerce.elsevier.com/about/';
const baseUriCKResidents = 'http://clinicalkey.staging.ecommerce.elsevier.com/residents/';
const baseUriCKPathologyExtended = 'http://clinicalkey.staging.ecommerce.elsevier.com/product/pathology-extended/';
const baseUriCKotolaryngology = 'http://clinicalkey.staging.ecommerce.elsevier.com/product/otolaryngology/';
const baseUriCKRheumatology = 'http://clinicalkey.staging.ecommerce.elsevier.com/product/rheumatology/';
const baseUriCKCheckout = 'https://checkout.ck2-cert.clinicalkey.com/checkout';
const baseUriELCMHomeEnGb = 'https://elsevier.staging.squiz.co.uk/en-gb';
exports.viewport_1200x700 = { width: 1200, height: 700 };
exports.viewport_360x612 = { width: 360, height: 612 };
exports.viewport_834x1120 = { width: 834, height: 1120 };
exports.viewport_414x719 = { width: 414, height: 719 };
exports.testData = {
    'GS - Book': {
        url: baseUriPrintBook,
        appName: 'eCom global store',
        testName: 'Product page - Print book',
        goto2ndPage: false
    },
    'GS - Journal ARGI': {
        url: baseUriJournal,
        appName: 'eCom global store',
        testName: 'Product page - Journal',
        goto2ndPage: false
    },
    'GS - Address Book': {
        url: baseUriAddressBook,
        appName: 'eCom global store',
        testName: 'My Account - Address Book',
        goto2ndPage: false
    },
    'GS - Change Password': {
        url: baseUriChangePassword,
        appName: 'eCom global store',
        testName: 'My Account - Change Password',
        goto2ndPage: false
    },
    'GS - Online Subscriptions': {
        url: baseUriOnlineSubscriptions,
        appName: 'eCom global store',
        testName: 'My Account - Online Subscriptions',
        goto2ndPage: false
    },
    'GS - Order History': {
        url: baseUriOrderHistory,
        appName: 'eCom global store',
        testName: 'My Account - Order History',
        goto2ndPage: false
    },
    'GS - Personal Details': {
        url: baseUriPersonalDetails,
        appName: 'eCom global store',
        testName: 'My Account - Personal Details',
        goto2ndPage: false
    },
    'GS - Checkout': {
        url: baseUriCheckout,
        appName: 'eCom global store',
        testName: 'Checkout page',
        goto2ndPage: false
    },
    'CK - Home': {
        url: baseUriCKHome,
        appName: 'CK store',
        testName: 'Home page',
        goto2ndPage: false
    },
    'CK - About Us': {
        url: baseUriCKAboutUs,
        appName: 'CK store',
        testName: 'Home page',
        goto2ndPage: false
    },
    'CK - Residents': {
        url: baseUriCKResidents,
        appName: 'CK store',
        testName: 'Home page',
        goto2ndPage: false
    },
    'CK - Pathology Extended': {
        url: baseUriCKPathologyExtended,
        appName: 'CK store',
        testName: 'Product page - Pathology Extended',
        goto2ndPage: false
    },
    'CK - Otolaryngology': {
        url: baseUriCKotolaryngology,
        appName: 'CK store',
        testName: 'Product page - Pathology Extended',
        goto2ndPage: false
    },
    'CK - Rheumatology': {
        url: baseUriCKRheumatology,
        appName: 'CK store',
        testName: 'Product page - Pathology Extended',
        goto2ndPage: false
    },
    'CK - Address Book': {
        url: baseUriCKAddressBook,
        appName: 'CK store',
        testName: 'My Account - Address Book',
        goto2ndPage: false
    },
    'CK - Change Password': {
        url: baseUriCKChangePassword,
        appName: 'CK store',
        testName: 'My Account - Change Password',
        goto2ndPage: false
    },
    'CK - Online Subscriptions': {
        url: baseUriCKOnlineSubscriptions,
        appName: 'CK store',
        testName: 'My Account - Online Subscriptions',
        goto2ndPage: false
    },
    'CK - Order History': {
        url: baseUriCKOrderHistory,
        appName: 'CK store',
        testName: 'My Account - Order History',
        goto2ndPage: false
    },
    'CK - Personal Details': {
        url: baseUriCKPersonalDetails,
        appName: 'CK store',
        testName: 'My Account - Personal Details',
        goto2ndPage: false
    },
    'CK - Checkout': {
        url: baseUriCKCheckout,
        appName: 'CK store',
        testName: 'Checkout page',
        goto2ndPage: false
    },
    'ELCM - Home': {
        url: baseUriELCMHomeEnGb,
        appName: 'ELCM',
        testName: 'Home page - EN_GB',
        goto2ndPage: false
    }
};
//# sourceMappingURL=testData.js.map