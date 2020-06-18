import { defineStep } from 'cucumber';
import { TestData } from '../support/testData';
import { HomePage } from '../../../common/pages/HealthStores/homePage';

const testData = new TestData();

const homePage = new HomePage(testData);

defineStep(/^I am on the UK Store home page?/, { timeout: 20000 }, async function(): Promise<void> {
    await homePage.getPage(this.driver);
});
