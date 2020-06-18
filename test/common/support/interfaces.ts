export interface ITestAccountDetails {
    firstName: string;
    lastName: string;
    fullName: string;
    emailAddress: string;
    password: string;
    countryCode: string;
}

export interface ITestAccount {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
}

export interface ITestAccounts {
    [os: string]: {
        [browser: string]: {
            [testTag: string]: ITestAccount;
        }
    };
}

export interface IProductToPurchase {
    productName: string;
    productPath: string;
    productTitle: string;
    productType: 'printBook' | 'vstEBook' | 'sdrmEBook' | 'deltaJournal' | 'argiJournal' | 'articleChoice' | 'sdArticle';
    productCategory: 'book' | 'journal' | 'article' | 'articlechoice';
    bundleFlag: boolean;
    productISBN: string[];
    productSKU: string[];
}

export interface IPurchasableProducts {
    printBook: boolean;
    vstEBook: boolean;
    sdrmEBook: boolean;
    deltaJournal: boolean;
    argiJournal: boolean;
    articleChoice: boolean;
    sdArticle: boolean;
}

export interface IDeltaRenewalToPurchase {
    email: string;
    agentName: string;
    invoiceNumber: string;
    billingAccount: string;
}

export interface IArgiOrAirBusinessRenewalToPurchase {
    email: string;
    agentName: string;
    accountNumber: string;
    publicationCode: string;
}

export interface IOsBrowserTagList {
    [T: string]: {
        firstNamePartial: string;
        emailPartial: string;
    };
}

export interface ITestConfig {
    [T: string]: {
        url: string;
        appName: string;
        testName: string;
        goto2ndPage: boolean;
    };
}

export interface ITestData {
    getUrlFor();
    getProductDataFor();
    getDataFor();
    getTitles();
    getSelectorOverrides();
}

export interface IProductTestData {
    productPath: string;
    longTitle: string;
    shortTitle: string;
    printIsbn: string;
    type: 'VitalSource eBook' | 'Inkling eBook' | 'journal' | 'printBook' | 'Flash Cards' | 'CD' | 'DVD' | 'Loose-leaf' | 'Other' | 'Poster' | 'PIN' | 'Online Resources';
}
