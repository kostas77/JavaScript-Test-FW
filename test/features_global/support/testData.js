"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlData_1 = require("./urlData");
const userData_1 = require("./userData");
const driverConfig_1 = require("./driverConfig");
class TestData {
    constructor() {
        this.testEnv = driverConfig_1.DriverConfig.getEnv();
        this.testUrl = new urlData_1.UrlData(this.testEnv);
        this.testUser = new userData_1.UserData(this.testEnv);
    }
    getUrlFor() {
        return this.testUrl.getUrlFor();
    }
    getCustomerDetails() {
        return this.testUser.getCustomerDetails();
    }
    getProductDataFor() {
        return {
            productsToPurchase: [
                {
                    productName: 'Print book',
                    productPath: this.getUrlFor().elsevier.books + '/robot-builders-cookbook/author/9780750665568',
                    productTitle: 'Robot Builder\'s Cookbook',
                    productType: 'printBook',
                    productCategory: 'book',
                    bundleFlag: false,
                    productISBN: ['9780750665568'],
                    productSKU: ['EST_GLB_BS-SKU-9780750665568_Physical']
                },
                {
                    productName: 'Print book - (preorder)',
                    productPath: this.getUrlFor().elsevier.books + '/title/author/9780128190784',
                    productTitle: 'Enhancing Disaster Preparedness',
                    productType: 'printBook',
                    productCategory: 'book',
                    bundleFlag: false,
                    productISBN: ['9780128190784'],
                    productSKU: ['EST_GLB_BS-SKU-9780128190784_Physical']
                },
                {
                    productName: 'SDRM ebook',
                    productPath: this.getUrlFor().elsevier.books + '/cima-pass-first-time/author/9781856177986',
                    productTitle: 'CIMA: Pass First Time!',
                    productType: 'sdrmEBook',
                    productCategory: 'book',
                    bundleFlag: false,
                    productISBN: ['9780080963068'],
                    productSKU: ['EST_GLB_BS-SKU-9780080963068_SDRM']
                },
                {
                    productName: 'SDRM bundle',
                    productPath: this.getUrlFor().elsevier.books + '/blogs-and-tweets-texting-and-friending/dejong/978-0-12-408128-4',
                    productTitle: 'Blogs and Tweets, Texting and Friending',
                    productType: 'sdrmEBook',
                    productCategory: 'book',
                    bundleFlag: true,
                    productISBN: ['9780124081284', '9780124080683'],
                    productSKU: ['EST_GLB_BS-SKU-9780124081284_Physical', 'EST_GLB_BS-SKU-9780124080683_SDRM']
                },
                {
                    productName: 'VST ebook',
                    productPath: this.getUrlFor().elsevier.books + '/title/author/9780124078406/_nocache',
                    productTitle: 'Corridors to Extinction and the Australian Megafauna',
                    productType: 'vstEBook',
                    productCategory: 'book',
                    bundleFlag: false,
                    productISBN: ['9780124078406'],
                    productSKU: ['EST_GLB_BS-SKU-9780124078406_VITAL']
                },
                {
                    productName: 'VST bundle',
                    productPath: this.getUrlFor().elsevier.books + '/title/author/9780444626981',
                    productTitle: 'Pediatric Neurology, Part I',
                    productType: 'vstEBook',
                    productCategory: 'book',
                    bundleFlag: true,
                    productISBN: ['9780444528919', '9780444626981'],
                    productSKU: ['EST_GLB_BS-SKU-9780444528919_Physical', 'EST_GLB_BS-SKU-9780444626981_VITAL']
                },
                {
                    productName: 'eBook - GBP, EUR, AUD',
                    productPath: this.getUrlFor().elsevier.books + '/title/author/9780124078406',
                    productTitle: 'Corridors to Extinction and the Australian Megafauna',
                    productType: 'vstEBook',
                    productCategory: 'book',
                    bundleFlag: false,
                    productISBN: ['9780124078406'],
                    productSKU: ['EST_GLB_BS-SKU-9780124078406_VITAL']
                },
                {
                    productName: 'Personal journal - GBP, EUR, JPY',
                    productPath: this.getUrlFor().elsevier.personalJournal + '/dental-materials/0109-5641',
                    productTitle: 'Dental Materials - 1 Year Subscription',
                    productType: 'argiJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['01095641'],
                    productSKU: ['EST_GLB_BS-SKU-0109-5641-PP-1Year']
                },
                {
                    productName: 'Institutional journal - GBP, EUR, JPY',
                    productPath: this.getUrlFor().elsevier.institutionalJournal + '/journal-of-second-language-writing/1060-3743',
                    productTitle: 'Journal of Second Language Writing - 1 Year Subscription',
                    productType: 'deltaJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['10603743'],
                    productSKU: ['EST_GLB_BS-SKU-1060-3743-IN-1Year']
                },
                {
                    productName: 'Delta personal journal',
                    productPath: this.getUrlFor().elsevier.personalJournal + '/robotics-and-computer-integrated-manufacturing/0736-5845',
                    productTitle: 'Robotics and Computer-Integrated Manufacturing - 1 Year Subscription',
                    productType: 'deltaJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['07365845'],
                    productSKU: ['EST_GLB_BS-SKU-0736-5845-PP-1Year']
                },
                {
                    productName: 'Delta institutional journal',
                    productPath: this.getUrlFor().elsevier.institutionalJournal + '/trends-in-biochemical-sciences/0968-0004',
                    productTitle: 'Trends in Biochemical Sciences - 1 Year Subscription',
                    productType: 'deltaJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['09680004'],
                    productSKU: ['EST_GLB_BS-SKU-0968-0004-IN-1Year']
                },
                {
                    productName: 'ARGI personal journal (1 year)',
                    productPath: this.getUrlFor().elsevier.personalJournal + '/journal-of-nutrition-education-and-behavior/1499-4046',
                    productTitle: 'Journal of Nutrition Education and Behavior - 1 Year Subscription',
                    productType: 'argiJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['14994046'],
                    productSKU: ['EST_GLB_BS-SKU-1499-4046-PP-1Year']
                },
                {
                    productName: 'ARGI institutional journal (3 years)',
                    productPath: this.getUrlFor().elsevier.institutionalJournal + '/the-journal-of-foot-and-ankle-surgery/1067-2516',
                    productTitle: 'The Journal of Foot & Ankle Surgery - 3 Year Subscription',
                    productType: 'argiJournal',
                    productCategory: 'journal',
                    bundleFlag: false,
                    productISBN: ['10672516'],
                    productSKU: ['EST_GLB_BS-SKU-1067-2516-IN-3Year']
                },
                {
                    productName: 'ArticleChoice (20 articles)',
                    productPath: this.getUrlFor().elsevier.articleChoice,
                    productTitle: 'ArticleChoice 20 Articles',
                    productType: 'articleChoice',
                    productCategory: 'articlechoice',
                    bundleFlag: false,
                    productISBN: ['ArticleChoice_20'],
                    productSKU: ['EST_GLB_BS-SKU-AC_20']
                },
                {
                    productName: 'SD Article',
                    productPath: this.getUrlFor().sd.article + '/S0009250908004089',
                    productTitle: 'Modelling mass transport in solid oxide fuel cell anodes: a case for a multidimensional dusty gas-based model',
                    productType: 'sdArticle',
                    productCategory: 'article',
                    bundleFlag: false,
                    productISBN: ['0009-2509'],
                    productSKU: ['SD_S0009250908004089']
                },
                {
                    productName: 'N/A',
                    productPath: '',
                    productTitle: '',
                    productType: '',
                    productCategory: '',
                    bundleFlag: false,
                    productISBN: [],
                    productSKU: []
                }
            ]
        };
    }
    getDeltaRenewalsDataFor() {
        return {
            deltaRenewalsToPurchase: [
                {
                    email: 'test.elsevier.io+mc+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877192X',
                    billingAccount: '611355'
                },
                {
                    email: 'test.elsevier.io+android+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877193X',
                    billingAccount: '611356'
                },
                {
                    email: 'test.elsevier.io+iosipd+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877194X',
                    billingAccount: '611357'
                },
                {
                    email: 'test.elsevier.io+w10ie+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877195X',
                    billingAccount: '611358'
                },
                {
                    email: 'test.elsevier.io+iosiph+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877196X',
                    billingAccount: '611359'
                },
                {
                    email: 'test.elsevier.io+w7c+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877197X',
                    billingAccount: '611360'
                },
                {
                    email: 'test.elsevier.io+lc+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877197X',
                    billingAccount: '611360'
                },
                {
                    email: 'test.elsevier.io+w10e+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877198X',
                    billingAccount: '611361'
                },
                {
                    email: 'test.elsevier.io+w8f+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877199X',
                    billingAccount: '611362'
                },
                {
                    email: 'test.elsevier.io+lf+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    invoiceNumber: '5877199X',
                    billingAccount: '611362'
                }
            ]
        };
    }
    getArgiRenewalsDataFor() {
        return {
            argiRenewalsToPurchase: [
                {
                    email: 'test.elsevier.io+mc+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-2',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+android+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-3',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+iosipd+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-4',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+w10ie+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-5',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+iosiph+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-6',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+w7c+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-7',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+lc+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-7',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+w10e+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-8',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+w8f+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-9',
                    publicationCode: 'J004'
                },
                {
                    email: 'test.elsevier.io+lf+renewals@gmail.com',
                    agentName: 'Ren Autom',
                    accountNumber: '411355-9',
                    publicationCode: 'J004'
                }
            ]
        };
    }
    getDataFor() {
        return {};
    }
    getTitles() {
        return {};
    }
}
exports.TestData = TestData;
exports.knownProdOrder = {
    orderNumber: 'e100000022',
    orderItemISBN: ['9780124045842'],
    orderItemTitle: 'Freeman - Forensic Epidemiology - Edition 1',
    orderTotalPrice: '141.00',
    totalItemCount: '1'
};
exports.catalogFilters = {
    Books: 'books',
    Journals: 'journals',
    MajorReferenceWorks: 'works',
    Engineering: '27370',
    ChemicalEngineering: '27360',
    Pharma: '27340',
    Medicine: '27336',
    Chemistry: '27362',
    ComputationalMechanics: '27906',
    CellBiology: '27498',
    Catalysis: '27810',
    Pharmacology: '32856',
    ComputationalMethods: '34772',
    CellularBiology: '32584',
    Biocatalysis: '34046',
    DrugAdverseReactionsandInteractions: '37803'
};
//# sourceMappingURL=testData.js.map