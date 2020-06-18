"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driverConfig_1 = require("./driverConfig");
const config = new driverConfig_1.DriverConfig();
class UserData {
    constructor(testEnv) {
        this.testEnv = testEnv;
    }
    getCustomerDetails() {
        if (this.testEnv === 'production' && config.testTag !== 'eCommerceMenusPROD') {
            this.customerDetails = exports.prodCustomer;
        }
        else {
            const os = config.osName === 'WIN' ? `${config.osName}${config.osVersion}` : config.osName;
            const browser = config.browserName.toLowerCase();
            this.customerDetails = getTestAccount(os, browser, config.testTag);
        }
        this.customerDetails.fullName = this.customerDetails.firstName + ' ' + this.customerDetails.lastName + ' ' + Math.random().toString(24).substring(5).replace(/[0-9]/g, '');
        return this.customerDetails;
    }
}
exports.UserData = UserData;
function getTestAccount(os, browser, testTag) {
    if (testTag.includes('ElcmE2E')) {
        return {
            firstName: 'Shared Elcm',
            lastName: 'Autom',
            emailAddress: 'test.elsevier.io+shared+elcm@gmail.com',
            password: 'Spoon123'
        };
    }
    else {
        return {
            firstName: `${exports.osList[os].firstNamePartial}${exports.browserList[browser].firstNamePartial} ${exports.testTagList[testTag].firstNamePartial}`,
            lastName: 'Autom',
            emailAddress: `test.elsevier.io+${exports.osList[os].emailPartial}${exports.browserList[browser].emailPartial}+${exports.testTagList[testTag].emailPartial}@gmail.com`,
            password: 'Spoon123'
        };
    }
}
exports.getTestAccount = getTestAccount;
exports.osList = {
    'WIN7': {
        firstNamePartial: 'WinSev',
        emailPartial: 'w7'
    },
    'WIN8': {
        firstNamePartial: 'WinEig',
        emailPartial: 'w8'
    },
    'WIN8.1': {
        firstNamePartial: 'WinEig',
        emailPartial: 'w8'
    },
    'WIN10': {
        firstNamePartial: 'WinTen',
        emailPartial: 'w10'
    },
    'MAC': {
        firstNamePartial: 'osX',
        emailPartial: 'm'
    },
    'LINUX': {
        firstNamePartial: 'nux',
        emailPartial: 'l'
    },
    'IOS': {
        firstNamePartial: 'iOS',
        emailPartial: 'ios'
    },
    'ANDROID': {
        firstNamePartial: 'An',
        emailPartial: 'an'
    }
};
exports.browserList = {
    chrome: {
        firstNamePartial: 'Ch',
        emailPartial: 'c'
    },
    firefox: {
        firstNamePartial: 'FF',
        emailPartial: 'f'
    },
    ie: {
        firstNamePartial: 'IE',
        emailPartial: 'ie'
    },
    edge: {
        firstNamePartial: 'Ed',
        emailPartial: 'e'
    },
    safari: {
        firstNamePartial: 'Sa',
        emailPartial: 's'
    },
    ipad: {
        firstNamePartial: 'IPd',
        emailPartial: 'ipd'
    },
    iphone: {
        firstNamePartial: 'IPh',
        emailPartial: 'iph'
    },
    android: {
        firstNamePartial: 'Droid',
        emailPartial: 'droid'
    }
};
exports.testTagList = {
    SubsE2E: {
        firstNamePartial: 'Subs',
        emailPartial: 'cksub'
    },
    CKSubsE2E: {
        firstNamePartial: 'CKSubs',
        emailPartial: 'cksub'
    },
    AmirsysSubsE2E: {
        firstNamePartial: 'AmSubs',
        emailPartial: 'cksub'
    },
    EmbaseSubsE2E: {
        firstNamePartial: 'EmSubs',
        emailPartial: 'cksub'
    },
    TaxDisplayE2E: {
        firstNamePartial: 'Tax',
        emailPartial: 'tax'
    },
    ProductPurchaseE2E: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchase'
    },
    GSCheckoutE2E: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchase'
    },
    ProductPageFunctionalityE2E: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchase'
    },
    SDCheckoutE2E: {
        firstNamePartial: 'SD',
        emailPartial: 'prodpurchase'
    },
    ProductPurchaseE2Esdrm: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchasesdrm'
    },
    RenewalsE2E: {
        firstNamePartial: 'Ren',
        emailPartial: 'renewals'
    },
    eCommerceMenusE2E: {
        firstNamePartial: 'eCom',
        emailPartial: 'ecommenus'
    },
    ProductListingsE2E: {
        firstNamePartial: 'PL',
        emailPartial: 'prodlist'
    },
    DailyE2E: {
        firstNamePartial: 'Day',
        emailPartial: 'ecommenus'
    },
    SubsE2Emob: {
        firstNamePartial: 'Subs',
        emailPartial: 'cksub'
    },
    CKSubsE2Emob: {
        firstNamePartial: 'CKSubs',
        emailPartial: 'cksub'
    },
    AmirsysSubsE2Emob: {
        firstNamePartial: 'AmSubs',
        emailPartial: 'cksub'
    },
    EmbaseSubsE2Emob: {
        firstNamePartial: 'EmSubs',
        emailPartial: 'cksub'
    },
    TaxDisplayE2Emob: {
        firstNamePartial: 'Tax',
        emailPartial: 'tax'
    },
    ProductPurchaseE2Emob: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchase'
    },
    ProductPageFunctionalityE2Emob: {
        firstNamePartial: 'PP',
        emailPartial: 'prodpurchase'
    },
    SDCheckoutE2Emob: {
        firstNamePartial: 'SD',
        emailPartial: 'prodpurchase'
    },
    RenewalsE2Emob: {
        firstNamePartial: 'Ren',
        emailPartial: 'renewals'
    },
    eCommerceMenusE2Emob: {
        firstNamePartial: 'eCom',
        emailPartial: 'ecommenus'
    },
    ProductListingsE2Emob: {
        firstNamePartial: 'PL',
        emailPartial: 'prodlist'
    },
    DailyE2Emob: {
        firstNamePartial: 'Day',
        emailPartial: 'ecommenus'
    },
    eCommerceMenusPROD: {
        firstNamePartial: 'eCom',
        emailPartial: 'ecommenus'
    },
    visual_eyes: {
        firstNamePartial: 'visual',
        emailPartial: 'ecommenus'
    },
    visual_gs: {
        firstNamePartial: 'visual',
        emailPartial: 'ecommenus'
    },
    visual_ck: {
        firstNamePartial: 'visual',
        emailPartial: 'ecommenus'
    },
    visual_elcm: {
        firstNamePartial: 'visual',
        emailPartial: 'ecommenus'
    }
};
exports.orrAccountDetails = {
    orrUsername: 'svc-scielsoxwllbrd01',
    orrPassword: '4usuXe&8ed&N'
};
exports.prodCustomer = {
    firstName: 'Kostas',
    lastName: 'Tseronis',
    emailAddress: 'k.tseronis@elsevier.com',
    password: 'Spoon123'
};
//# sourceMappingURL=userData.js.map