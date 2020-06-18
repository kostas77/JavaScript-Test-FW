export class CommonConfig {

    public testEnv: Environment;
    private customer: any;
    private prodCustomer: any;
    private customerDetails: any;
    private testServerURL: string;
    private capabilitiesDict: any;
    private seleniumEnv: string;
    public browserName: string;
    private browserVersion: string;

    constructor(customer, prodCustomer) {
        this.customer = customer;
        this.prodCustomer = prodCustomer;
        this.testEnv = <Environment> process.env.NODE_ENV;
        this.testServerURL = process.env.SELENIUM_REMOTE_URL;
        this.seleniumEnv = process.env.SELENIUM_BROWSER;
        this.capabilitiesDict = process.env.SUITE_CONFIG ? JSON.parse(process.env.SUITE_CONFIG) : {};
        this.browserName = this.capabilitiesDict.browser || this.seleniumEnv.split('::')[0].trim();
        this.browserVersion = process.env.BROWSERversion;
    }

    public static getEnv(): Environment {
        return <Environment>process.env.NODE_ENV;
    }

    public getDriverConfig() {
        const server = this.testServerURL;
        const capabilities = this.setDriverCapabilities();
        return { server, capabilities };
    }

    public getCustomerDetails() {
        if (this.testEnv === 'production') {
            this.customerDetails = this.prodCustomer;
        } else {
            this.customerDetails = this.customer;
        }
        // Adding random letters (but not numbers) at the end of the customer name to avoid failing Adyen fraud check
        this.customerDetails.fullName = this.customerDetails.firstName + ' ' + this.customerDetails.lastName + ' ' + Math.random().toString(24).substring(5).replace(/[0-9]/g, '');
        return this.customerDetails;
    }

    private setDriverCapabilities() {
        if (process.env.SUITE_CONFIG) {
            return this.capabilitiesDict;
        }

        switch (this.testServerURL) {
            case 'http://hub-cloud.browserstack.com/wd/hub': // BrowserStack specific capabilities
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
            case 'http://localhost:4444/wd/hub': // Local chrome docker specific capabilities
            case 'http://localhost:4448/wd/hub': // Local firefox docker specific capabilities
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
            args: ['--start-maximized']
        };

        this.capabilitiesDict['browser_version'] = this.browserVersion;
        console.log(this.capabilitiesDict);
        return this.capabilitiesDict;
    }
}
