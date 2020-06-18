import { defineStep } from 'cucumber';
import { Helpers } from '../../common/support/helpers';
import { DriverConfig } from '../support/driverConfig';
import { KitchenSink } from '../../common/pages/ElsevierGlobalStore/kitchenSink';
import { LocationSelector } from '../../common/pages/ElsevierGlobalStore/locationSelector';
import { UrlData } from '../support/urlData';

const config = new DriverConfig();
const kitchenSink = new KitchenSink();
const urlData = new UrlData(process.env.NODE_ENV);

// Back To Top Button
const backToTopParentSelector = '.fixed-side-links.side-bottom.side-fixed';
const backToTopSelector = '.back-to-top';

defineStep(/^the back to top button is not visible$/, async function () {
    const parentClassList = await (await Helpers.getElement(this.driver, backToTopParentSelector)).getAttribute('class');
    this.assert.isTrue(parentClassList.includes('scroll-down'), 'Back to top button parent does not contain class scroll-down');
});

defineStep(/^I scroll to the bottom of the page$/, async function () {
    await Helpers.scrollToElement(this.driver, 'footer');
});

defineStep(/^the scroll to top button is visible$/, async function () {
    const parentClassList = await (await Helpers.getElement(this.driver, backToTopParentSelector)).getAttribute('class');
    this.assert.isTrue(parentClassList.includes('scroll-up'), 'Back to top button parent does not contain class scroll-up');
});

defineStep(/^I click the back to top button$/, async function () {
    await Helpers.clickElement(this.driver, backToTopSelector);
    await Helpers.driverSleep(this.driver, 2000);
});

defineStep(/^I have scrolled to the top of the page$/, async function () {
    const scrollPosition = await Helpers.getCurrentScroll(this.driver);
    this.assert.equal(scrollPosition, 0, 'Scroll position does not match the expected value');
});

// Skip To Content link
const a11yClass = 'accessibility-link';
const a11ySelector = '.accessibility-link';

defineStep(/^I press the tab key$/, async function () {
    await Helpers.sendKeyToElement(this.driver, (config.browserName === 'ie' ? 'html' : 'body') , 'TAB');
});

defineStep(/^the skip to content link is focused$/, async function () {
    const activeElement = await this.driver.switchTo().activeElement();
    this.assert.equal(await activeElement.getAttribute('class'), a11yClass, 'Accessibility link is not focused');
});

defineStep(/^I press enter on the skip to content link$/, async function () {
    await Helpers.sendKeyToElement(this.driver, a11ySelector, 'ENTER');
});

defineStep(/^the main page content is focused$/, async function () {
    const expectedElement = await Helpers.getElement(this.driver, 'main > div');
    const activeElement = await this.driver.switchTo().activeElement();
    this.assert.equal(await activeElement.getAttribute('class'), await expectedElement.getAttribute('class'), 'Active element is not equal to the expected element');
});

// In Page Navigation
defineStep(/^I have navigated to the kitchen sink page$/, async function () {
    await kitchenSink.visitPage(this.driver);
});

defineStep(/^I have captured the expected scroll position of the typography heading$/, async function() {
    this.expectedPosition = await kitchenSink.captureExpectedScrollPosition(this.driver, config.browserName);
    console.log('- Expected scroll position captured', this.expectedPosition);
});

defineStep(/^I click the typography link$/, async function () {
    await kitchenSink.clickTypographyLink(this.driver);
});

defineStep(/^the page scrolls to the expected position$/, async function () {
    const scrollPosition = await Helpers.getCurrentScroll(this.driver);
    console.log('- Scroll position captured', scrollPosition);
    this.assert.isTrue(scrollPosition <= this.expectedPosition + 1 && scrollPosition >= this.expectedPosition - 1, 'Scroll position does not match the expected value'); // Adding 1 pixel buffer to allow for native scroll behaviour

});

// Location Selector
const locationSelectorPage = new LocationSelector();
const locationSelectorLink = '.location-current';

defineStep(/^I click the location selector link in the footer$/, async function () {
    await Helpers.clickElement(this.driver, locationSelectorLink);
    await Helpers.driverSleep(this.driver, 2000);
});

defineStep(/^I am taken to the location selector page$/, async function () {
    const currentURL = await Helpers.getCurrentUrl(this.driver);
    const expectedURL = urlData.getUrlFor().elsevier.locationSelector;
    this.assert.equal(currentURL, expectedURL, 'CurrentURL is not equal to the expectedURL');
});

defineStep(/^I have navigated to the location selector page$/, async function () {
    await locationSelectorPage.visitPage(this.driver);
});

defineStep(/^I click the Spanish site link$/, async function () {
    await locationSelectorPage.clickSpanishSiteLink(this.driver);
});

defineStep(/^I am taken to the Elsevier Spanish site$/, async function () {
    const currentURL = await Helpers.getCurrentUrl(this.driver);
    const expectedURL = urlData.getUrlFor().elsevier.spanishSite;
    this.assert.equal(currentURL, expectedURL, 'CurrentURL is not equal to the expectedURL');
});

defineStep(/^I navigate to the global site$/, async function () {
    await locationSelectorPage.visitGlobalHome(this.driver);
});

defineStep(/^I am automatically redirected to the Elsevier Spanish site$/, async function () {
    const currentURL = await Helpers.getCurrentUrl(this.driver);
    let expectedURL = urlData.getUrlFor().elsevier.spanishSite;
    if (config.testEnv !== 'production') {
        console.log(`Skipping this check for ${config.testEnv}  as the functionality only exists in Production`);
        expectedURL = currentURL;
    }
    this.assert.equal(currentURL, expectedURL, 'CurrentURL is not equal to the expectedURL');
});
