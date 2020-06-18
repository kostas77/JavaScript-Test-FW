"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const driverConfig_1 = require("../support/driverConfig");
const helpers_1 = require("../../common/support/helpers");
const homePage_1 = require("../../common/pages/ElsevierGlobalStore/homePage");
const catalogPage_1 = require("../../common/pages/ElsevierGlobalStore/products/catalogPage");
const ckHomePage_1 = require("../../common/pages/Subscriptions/ckHomePage");
const amirsysHomePage_1 = require("../../common/pages/Subscriptions/amirsysHomePage");
const embaseHomePage_1 = require("../../common/pages/Subscriptions/embaseHomePage");
const testData_1 = require("../support/testData");
const homePage_2 = require("../../common/pages/ScienceDirectStore/homePage");
const DatabaseManager_1 = require("../../common/support/DatabaseManager");
const logger = require("bunyan");
const Config = require("config");
const config = new driverConfig_1.DriverConfig();
const testData = new testData_1.TestData();
const homePage = new homePage_1.HomePage(testData);
const catalogPage = new catalogPage_1.CatalogPage(testData);
const ckHomePage = new ckHomePage_1.CkHomePage(testData);
const amirsysHomePage = new amirsysHomePage_1.AmirsysHomePage(testData);
const embaseHomePage = new embaseHomePage_1.EmbaseHomePage(testData);
const sdHomePage = new homePage_2.SdHomePage(testData);
cucumber_1.Given(/^I am based in (.*)?$/, function (countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        this.customerDetails.countryCode = countryCode;
        this.customerDetails = Object.assign(Object.assign({}, this.customerDetails), testData.getCustomerDetails());
    });
});
cucumber_1.Given(/^I am an existing customer based in (.*)?$/, function (countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        this.customerDetails.countryCode = countryCode;
        this.customerDetails = Object.assign(Object.assign({}, this.customerDetails), testData.getCustomerDetails());
        console.log('- Customer\'s email:', this.customerDetails.emailAddress);
    });
});
cucumber_1.Given(/^I am on the Elsevier home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield homePage.visitPage(this.driver);
        if (config.browserName !== 'ie') {
            yield helpers_1.Helpers.removeSurveyPopupElement(this.driver);
        }
    });
});
cucumber_1.Given(/^I am on the Catalog home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield catalogPage.visitPage(this.driver);
        yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 10 * 1000);
        const pageTitle = yield helpers_1.Helpers.getPageTitle(this.driver);
        this.assert.equal(pageTitle, catalogPage.pageTitle, 'Expected Catalog page title not found');
    });
});
cucumber_1.Given(/^I have no existing subscriptions$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const log = logger.createLogger({ name: 'subscriptions-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
        const databaseManager = new DatabaseManager_1.DatabaseManager(log, Config.get('databases.orr'));
        console.log('- Cancelling existing subscriptions');
        try {
            yield databaseManager.runSimpleQuery(`update elsio.subscriptions s
        left join elsio.orders o on s.elsevierOrderNo = o.elsevierOrderNo
        set s.isActive = 0, s.status = 'CANCELLED'
        where s.isActive = 1
            and s.status = 'ACTIVE'
            and customerEmail = '${this.customerDetails.emailAddress}';`);
            databaseManager.close();
        }
        catch (err) {
            console.error(err.message);
        }
    });
});
cucumber_1.Given(/^I am on the CK home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.solution = 'CK';
        yield ckHomePage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', ckHomePage.packages, 5 * 1000);
        yield helpers_1.Helpers.removeCkSurveyPopupElement(this.driver);
    });
});
cucumber_1.Given(/^I am not logged in to CK$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield ckHomePage.logout(this.driver);
    });
});
cucumber_1.Given(/^I am on the Amirsys (.*) home page$/, function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.solution = 'Amirsys';
        yield amirsysHomePage.visitPage(this.driver, product);
        yield helpers_1.Helpers.jsWaitUntilPageLoadComplete(this.driver, 5 * 1000);
    });
});
cucumber_1.Given(/^I am not logged in to Amirsys$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield amirsysHomePage.logout(this.driver);
    });
});
cucumber_1.Given(/^I am on the Embase home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.orderDetails.solution = 'Embase';
        yield embaseHomePage.visitPage(this.driver);
        yield helpers_1.Helpers.waitUntilElementHasState(this.driver, 'located', embaseHomePage.footerLogoLocator, 5 * 1000);
    });
});
cucumber_1.Given(/^I am not logged in to ScienceDirect$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield sdHomePage.signout(this.driver);
    });
});
//# sourceMappingURL=initialisationSteps.js.map