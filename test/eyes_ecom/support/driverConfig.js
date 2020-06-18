"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DriverConfig {
    constructor() {
        this.capabilitiesDict = process.env.SUITE_CONFIG ? JSON.parse(process.env.SUITE_CONFIG) : {};
        this.testEnv = process.env.NODE_ENV;
        this.platform = process.env.PLATFORM;
        this.seleniumEnv = process.env.SELENIUM_BROWSER;
        this.browserName = this.capabilitiesDict.browser || this.seleniumEnv.split('::')[0].trim();
        this.browserVersion = process.env.BROWSERversion;
        this.osName = this.capabilitiesDict.os || this.seleniumEnv.split('::')[1].trim();
        this.osVersion = this.capabilitiesDict.os_version || process.env.OSversion;
        this.testServerURL = process.env.SELENIUM_REMOTE_URL;
        this.testTag = process.env.test_tag;
    }
    static getEnv() {
        return process.env.NODE_ENV;
    }
    setDriverCapabilities() {
        if (process.env.SUITE_CONFIG) {
            return this.capabilitiesDict;
        }
        const buildName = process.env.TRAVIS_REPOS || 'Manual Trigger of E2E tests';
        switch (this.testServerURL) {
            case 'http://hub-cloud.browserstack.com/wd/hub':
                this.capabilitiesDict['browserstack.local'] = 'true';
                this.capabilitiesDict['browserstack.localIdentifier'] = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
                this.capabilitiesDict['browserstack.debug'] = 'true';
                this.capabilitiesDict['browserstack.console'] = 'verbose';
                this.capabilitiesDict['browserstack.user'] = process.env.BROWSERSTACK_USERNAME;
                this.capabilitiesDict['browserstack.key'] = process.env.BROWSERSTACK_ACCESS_KEY;
                this.capabilitiesDict['project'] = process.env.test_tag;
                this.capabilitiesDict['build'] = 'Updated Repos: ' + buildName;
                this.capabilitiesDict['name'] = 'Jenkins job: ' + process.env.JOB_NAME + ' - Jenkins BuildID: ' + process.env.BUILD_ID;
                break;
            case 'https://k8s-selenium-grid.staging.ecommerce.elsevier.com/wd/hub/':
                break;
            case 'https://k8s-zalenium-grid.dev.ecommerce.elsevier.com/wd/hub':
                this.capabilitiesDict['build'] = 'Updated Repos: ' + buildName;
                this.capabilitiesDict['name'] = 'Jenkins job: ' + process.env.JOB_NAME + ' - Jenkins BuildID: ' + process.env.BUILD_ID;
                break;
            case 'http://localhost:4444/wd/hub':
                break;
            case 'http://3.16.125.126:4444/wd/hub':
                break;
            default:
                throw new Error('Invalid SELENIUM_REMOTE_URL defined');
        }
        switch (this.osName) {
            case 'WIN':
                this.capabilitiesDict['os'] = 'Windows';
                break;
            case 'MAC':
                this.capabilitiesDict['os'] = 'OS X';
                break;
            case 'IOS':
                this.capabilitiesDict['os'] = 'ios';
                break;
            case 'ANDROID':
                this.capabilitiesDict['os'] = 'android';
                break;
            case 'LINUX':
                this.capabilitiesDict['os'] = 'LINUX';
                break;
            default:
                throw new Error('Invalid OS name requested');
        }
        switch (this.osVersion) {
            case 'XP':
                this.capabilitiesDict['os_version'] = 'XP';
                break;
            case '7':
                this.capabilitiesDict['os_version'] = '7';
                break;
            case '8':
                this.capabilitiesDict['os_version'] = '8';
                break;
            case '8.1':
                this.capabilitiesDict['os_version'] = '8.1';
                break;
            case '10':
                this.capabilitiesDict['os_version'] = '10';
                break;
            case 'MOJAVE':
                this.capabilitiesDict['os_version'] = 'Mojave';
                break;
            case 'HIGH_SIERRA':
                this.capabilitiesDict['os_version'] = 'High Sierra';
                break;
            case 'SIERRA':
                this.capabilitiesDict['os_version'] = 'Sierra';
                break;
            case 'EL_CAPITAN':
                this.capabilitiesDict['os_version'] = 'El Capitan';
                break;
            case 'YOSEMITE':
                this.capabilitiesDict['os_version'] = 'Yosemite';
                break;
            case 'MAVERICKS':
                this.capabilitiesDict['os_version'] = 'Mavericks';
                break;
            case 'MOUNTAIN_LION':
                this.capabilitiesDict['os_version'] = 'Mountain Lion';
                break;
            case 'LION':
                this.capabilitiesDict['os_version'] = 'Lion';
                break;
            case 'SNOW_LEOPARD':
                this.capabilitiesDict['os_version'] = 'Snow Leopard';
                break;
            case '11.0':
                this.capabilitiesDict['os_version'] = '11.0';
                break;
            case '11.2':
                this.capabilitiesDict['os_version'] = '11.2';
                break;
            case 'LINUX':
                this.capabilitiesDict['os_version'] = 'LINUX';
                break;
            default:
                break;
        }
        switch (this.browserName.toLowerCase()) {
            case 'chrome':
                this.capabilitiesDict['browser'] = 'Chrome';
                this.capabilitiesDict['elementScrollBehavior'] = 1;
                this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
                this.capabilitiesDict['resolution'] = '1920x1080';
                this.capabilitiesDict['browserstack.idleTimeout'] = '300';
                this.capabilitiesDict['chromeOptions'] = {
                    args: ['--start-maximized'
                    ]
                };
                break;
            case 'firefox':
                this.capabilitiesDict['browser'] = 'Firefox';
                this.capabilitiesDict['elementScrollBehavior'] = 1;
                this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
                this.capabilitiesDict['browserstack.geckodriver'] = '0.23.0';
                this.capabilitiesDict['resolution'] = '1920x1080';
                break;
            case 'ie':
                this.capabilitiesDict['browser'] = 'IE';
                this.capabilitiesDict['elementScrollBehavior'] = 1;
                this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
                this.capabilitiesDict['browserstack.ie.driver'] = '3.9.0';
                this.capabilitiesDict['browserstack.ie.enablePopups'] = false;
                this.capabilitiesDict['resolution'] = '1920x1080';
                break;
            case 'edge':
                this.capabilitiesDict['browser'] = 'Edge';
                this.capabilitiesDict['elementScrollBehavior'] = 1;
                this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
                this.capabilitiesDict['browserstack.edge.enablePopups'] = false;
                this.capabilitiesDict['resolution'] = '1920x1080';
                break;
            case 'safari':
                this.capabilitiesDict['browser'] = 'Safari';
                this.capabilitiesDict['elementScrollBehavior'] = 1;
                this.capabilitiesDict['browserstack.selenium_version'] = '3.14.0';
                break;
            case 'ipad':
                this.capabilitiesDict['browser'] = 'iPad';
                this.capabilitiesDict['realMobile'] = true;
                this.capabilitiesDict['device'] = this.browserVersion;
                this.capabilitiesDict['browserstack.appium_version'] = '1.9.1';
                break;
            case 'iphone':
                this.capabilitiesDict['browser'] = 'iPhone';
                this.capabilitiesDict['realMobile'] = true;
                this.capabilitiesDict['device'] = this.browserVersion;
                this.capabilitiesDict['browserstack.appium_version'] = '1.9.1';
                break;
            case 'android':
                this.capabilitiesDict['browser'] = 'Android';
                this.capabilitiesDict['realMobile'] = true;
                this.capabilitiesDict['device'] = this.browserVersion;
                this.capabilitiesDict['browserstack.appium_version'] = '1.9.1';
                break;
            default:
                throw new Error('Invalid browser name requested');
        }
        if (this.platform === 'DESKTOP') {
            this.capabilitiesDict['browser_version'] = this.browserVersion;
        }
        if (this.testEnv === 'production' && this.browserName.toLowerCase() !== 'ie') {
            this.capabilitiesDict['chromeOptions'] = {
                args: ['--user-agent=' + 'browserstack_prod_tests_user_agent']
            };
        }
        const usedCapabilities = Object.assign({}, this.capabilitiesDict);
        delete usedCapabilities['browserstack.key'];
        console.log(usedCapabilities);
        return this.capabilitiesDict;
    }
    getDriverConfig() {
        const server = this.testServerURL;
        const capabilities = this.setDriverCapabilities();
        return { server, capabilities };
    }
}
exports.DriverConfig = DriverConfig;
//# sourceMappingURL=driverConfig.js.map