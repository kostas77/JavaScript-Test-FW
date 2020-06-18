"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonConfig {
    constructor(customer, prodCustomer) {
        this.customer = customer;
        this.prodCustomer = prodCustomer;
        this.testEnv = process.env.NODE_ENV;
        this.testServerURL = process.env.SELENIUM_REMOTE_URL;
        this.seleniumEnv = process.env.SELENIUM_BROWSER;
        this.capabilitiesDict = process.env.SUITE_CONFIG ? JSON.parse(process.env.SUITE_CONFIG) : {};
        this.browserName = this.capabilitiesDict.browser || this.seleniumEnv.split('::')[0].trim();
        this.browserVersion = process.env.BROWSERversion;
    }
    static getEnv() {
        return process.env.NODE_ENV;
    }
    getDriverConfig() {
        const server = this.testServerURL;
        const capabilities = this.setDriverCapabilities();
        return { server, capabilities };
    }
    getCustomerDetails() {
        if (this.testEnv === 'production') {
            this.customerDetails = this.prodCustomer;
        }
        else {
            this.customerDetails = this.customer;
        }
        this.customerDetails.fullName = this.customerDetails.firstName + ' ' + this.customerDetails.lastName + ' ' + Math.random().toString(24).substring(5).replace(/[0-9]/g, '');
        return this.customerDetails;
    }
    setDriverCapabilities() {
        if (process.env.SUITE_CONFIG) {
            return this.capabilitiesDict;
        }
        switch (this.testServerURL) {
            case 'http://hub-cloud.browserstack.com/wd/hub':
                this.capabilitiesDict['browserstack.local'] = 'true';
                this.capabilitiesDict['browserstack.localIdentifier'] = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
                this.capabilitiesDict['browserstack.debug'] = 'true';
                this.capabilitiesDict['browserstack.console'] = 'verbose';
                this.capabilitiesDict['browserstack.user'] = process.env.BROWSERSTACK_USERNAME;
                this.capabilitiesDict['browserstack.key'] = process.env.BROWSERSTACK_ACCESS_KEY;
                this.capabilitiesDict['project'] = process.env.test_tag;
                const buildName = process.env.TRAVIS_REPOS || 'Manual Trigger of E2E tests';
                this.capabilitiesDict['build'] = 'Updated Repos: ' + buildName;
                this.capabilitiesDict['name'] = 'Jenkins job: ' + process.env.JOB_NAME + ' - Jenkins BuildID: ' + process.env.BUILD_ID;
                break;
            case 'http://localhost:3100/wd/hub':
                break;
            default:
                throw new Error('Invalid Selenium Grid server defined');
        }
        this.capabilitiesDict['os'] = 'OS X';
        this.capabilitiesDict['os_version'] = 'Mojave';
        this.capabilitiesDict['browser'] = 'Chrome';
        this.capabilitiesDict['elementScrollBehavior'] = 1;
        this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
        this.capabilitiesDict['resolution'] = '1920x1080';
        this.capabilitiesDict['acceptSslCert'] = 'true';
        this.capabilitiesDict['chromeOptions'] = {
            args: ['--start-maximized'
            ]
        };
        this.capabilitiesDict['browser_version'] = this.browserVersion;
        console.log(this.capabilitiesDict);
        return this.capabilitiesDict;
    }
}
exports.CommonConfig = CommonConfig;
//# sourceMappingURL=commonConfig.js.map