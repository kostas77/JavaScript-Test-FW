import { defineStep } from 'cucumber';
import { DriverConfig } from '../support/driverConfig';
import { Helpers } from '../../common/support/helpers';
import { HomePage } from '../../common/pages/ElsevierGlobalStore/homePage';
import { CatalogPage } from '../../common/pages/ElsevierGlobalStore/products/catalogPage';
import { CkHomePage } from '../../common/pages/Subscriptions/ckHomePage';
import { AmirsysHomePage } from '../../common/pages/Subscriptions/amirsysHomePage';
import { EmbaseHomePage } from '../../common/pages/Subscriptions/embaseHomePage';
import { TestData } from '../support/testData';
import { SdHomePage } from '../../common/pages/ScienceDirectStore/homePage';
import { DatabaseManager, IDBConfig } from '../../common/support/databaseManager';
import * as logger from 'bunyan';
import * as Config from 'config';

const config = new DriverConfig();
const testData = new TestData();

const homePage = new HomePage(testData);
const catalogPage = new CatalogPage(testData);
const ckHomePage = new CkHomePage(testData);
const amirsysHomePage = new AmirsysHomePage(testData);
const embaseHomePage = new EmbaseHomePage(testData);
const sdHomePage = new SdHomePage(testData);


defineStep(/^I am based in (.*)?$/, async function (countryCode: string): Promise<void> {
    this.customerDetails.countryCode = countryCode;
    this.customerDetails = { ...this.customerDetails, ...testData.getCustomerDetails() };
});

defineStep(/^I am an existing customer based in (.*)?$/, async function (countryCode: string): Promise<void> {
    this.customerDetails.countryCode = countryCode;
    this.customerDetails = { ...this.customerDetails, ...testData.getCustomerDetails() };
    console.log('- Customer\'s email:', this.customerDetails.emailAddress);

});

defineStep(/^I am on the Elsevier home page$/, async function (): Promise<void> {
    await homePage.visitPage(this.driver);
    // TODO assertion for home page here
    if (config.browserName !== 'ie') {
        await Helpers.removeSurveyPopupElement(this.driver);
    }
});

defineStep(/^I am on the Catalog home page$/, async function (): Promise<void> {
    await catalogPage.visitPage(this.driver);
    await Helpers.jsWaitUntilPageLoadComplete(this.driver, 10 * 1000);
    const pageTitle = await Helpers.getPageTitle(this.driver);
    this.assert.equal(pageTitle, catalogPage.pageTitle, 'Expected Catalog page title not found');
});

defineStep(/^I have no existing subscriptions$/, async function (): Promise<void> {
    const log = logger.createLogger({ name: 'subscriptions-E2E-tests', level: 'info', serializers: logger.stdSerializers, src: true });
    const databaseManager: DatabaseManager = new DatabaseManager(log, Config.get<IDBConfig>('databases.orr'));
    console.log('- Cancelling existing subscriptions');
    try {
        await databaseManager.runSimpleQuery(`update elsio.subscriptions s
        left join elsio.orders o on s.elsevierOrderNo = o.elsevierOrderNo
        set s.isActive = 0, s.status = 'CANCELLED'
        where s.isActive = 1
            and s.status = 'ACTIVE'
            and customerEmail = '${this.customerDetails.emailAddress}';`);
        databaseManager.close();
    } catch (err) {
        console.error(err.message);
    }
});

defineStep(/^I am on the CK home page$/, async function (): Promise<void> {
    this.orderDetails.solution = 'CK';
    await ckHomePage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', ckHomePage.packages, 5 * 1000);
    // TODO assertion for CK home page here
    await Helpers.removeCkSurveyPopupElement(this.driver);
});

defineStep(/^I am not logged in to CK$/, async function (): Promise<void> {
    await ckHomePage.logout(this.driver);
});

defineStep(/^I am on the Amirsys (.*) home page$/, async function (product: string): Promise<void> {
    this.orderDetails.solution = 'Amirsys';
    await amirsysHomePage.visitPage(this.driver, product);
    await Helpers.jsWaitUntilPageLoadComplete(this.driver, 5 * 1000);
});

defineStep(/^I am not logged in to Amirsys$/, async function (): Promise<void> {
    await amirsysHomePage.logout(this.driver);
});

defineStep(/^I am on the Embase home page$/, async function (): Promise<void> {
    this.orderDetails.solution = 'Embase';
    await embaseHomePage.visitPage(this.driver);
    await Helpers.waitUntilElementHasState(this.driver, 'located', embaseHomePage.footerLogoLocator, 5 * 1000);
    // TODO: assertion for Embase home page here
});

defineStep(/^I am not logged in to ScienceDirect$/, async function (): Promise<void> {
    await sdHomePage.signout(this.driver);
    // TODO: Validate that no account is logged in
});
