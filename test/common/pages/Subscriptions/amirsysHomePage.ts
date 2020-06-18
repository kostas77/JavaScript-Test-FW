import { WebDriver, WebElement } from 'selenium-webdriver';
import { Helpers } from '../../support/helpers';
import { ITestData } from '../../support/interfaces';

export class AmirsysHomePage {
    public pageTitle: string;
    public pageExpertPathTitle: string;
    public pageImmunoQueryTitle: string;
    public pagePATHPrimerTitle: string;
    public pageRADPrimerTitle: string;
    public pageSTATdxTitle: string;
    public pageExpertPathUri: string;
    public pageImmunoQueryUri: string;
    public pagePATHPrimerUri: string;
    public pageRADPrimerUri: string;
    public pageSTATdxUri: string;
    public logoutUrl: string;
    public checkoutUri: string;

    constructor(testData: ITestData) {
        this.pageExpertPathTitle = 'ExpertPath | Your Most Direct Path to the Right Diagnosis';
        this.pageImmunoQueryTitle = 'ImmunoQuery | Get It Right. Right Now.';
        this.pagePATHPrimerTitle = 'PATHPrimer - The definitive online learning source for pathologists - PATHPrimer Site';
        this.pageRADPrimerTitle = 'RADPrimer';
        this.pageSTATdxTitle = 'STATdx | Diagnostic Imaging for Radiology';
        this.pageExpertPathUri = testData.getUrlFor().amirsys.homeExpertPathUri;
        this.pageImmunoQueryUri = testData.getUrlFor().amirsys.homeImmunoQueryUri;
        this.pagePATHPrimerUri = testData.getUrlFor().amirsys.homePATHPrimerUri;
        this.pageRADPrimerUri = testData.getUrlFor().amirsys.homeRADPrimerUri;
        this.pageSTATdxUri = testData.getUrlFor().amirsys.homeSTATdxUri;
        this.logoutUrl = testData.getUrlFor().amirsys.logout;
        this.checkoutUri = testData.getUrlFor().amirsys.checkoutUri;
    }

    public async visitPage (driver: WebDriver, product: string): Promise<void> {
        switch (product) {
            case 'ExpertPath':
                return await driver.get(this.pageExpertPathUri);
            case 'ImmunoQuery':
                return await driver.get(this.pageImmunoQueryUri);
            case 'PATHPrimer':
                return await driver.get(this.pagePATHPrimerUri);
            case 'RADPrimer':
                return await driver.get(this.pageRADPrimerUri);
            case 'STATdx':
                return await driver.get(this.pageSTATdxUri);
            default:
                throw new Error('Unknown product requested : ' + product);
        }
    }

    public async logout (driver: WebDriver): Promise<void> {
        return await driver.get(this.logoutUrl);
    }

    public async productItem (driver: WebDriver, sku: string): Promise<WebElement> {
        return await Helpers.getElement(driver, `a[href*="${sku}"]`);
    }

    public async productItemClick (driver: WebDriver, sku: string): Promise<void> {
        return await (await this.productItem(driver, sku)).click();
    }
}
