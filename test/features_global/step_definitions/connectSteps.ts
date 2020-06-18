import { defineStep } from 'cucumber';
import { ConnectPage } from '../../common/pages/ElsevierGlobalStore/connectPage';
import { TestData } from '../support/testData';

const testData = new TestData();
const connectPage = new ConnectPage(testData);

defineStep(/^I visit an article page$/, async function () {
    await connectPage.visitPage(this.driver);
});

defineStep(/^I see the article actions bar at the bottom of the page$/, async function () {
    const articleActions = await connectPage.getArticleActionsBar(this.driver);
    const articleProperties = {
        displayed : await articleActions.isDisplayed(),
        bottom    : await articleActions.getCssValue('bottom'),
        position  : await articleActions.getCssValue('position')
    };
    this.assert.isTrue(articleProperties.displayed);
    this.assert.equal(articleProperties.bottom, '0px');
    this.assert.equal(articleProperties.position, 'fixed');
});
