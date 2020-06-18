import { Before, After, HookScenarioResult } from 'cucumber';
import { Helpers } from './helpers';
import { Config } from '../../features_regional/USHealthStore/support/config';
import * as request from 'request';

export function CommonHook(): void {
    Before({ timeout: 90 * 1000 }, async function (): Promise<void> {
        console.log('- WebDriver BrowserStack session URL BEFORE FEATURE hook');
        await Helpers.driverSleep(this.driver, 1000);
        const sessionData = await this.driver.session_;
        const sessionData = await this.dr;
        const sessionID = sessionData.id_;
        const config = new Config();
        const getDriverConfig = config.getDriverConfig();
        if (getDriverConfig.server.includes('browserstack')) {
            const options = {
                method: 'GET',
                url: 'https://www.browserstack.com/automate/sessions/' + sessionID + '.json',
                headers: {
                    'cache-control': 'no-cache',
                    'authorization': 'Basic ' + Buffer.from(process.env.BROWSERSTACK_USERNAME + ':' + process.env.BROWSERSTACK_ACCESS_KEY).toString('base64')
                }
            };
            await Helpers.driverSleep(this.driver, 1000);
            await request(options, function (error, _response, body) {
                if (error) { throw new Error(error); }
                const parsedJSON = JSON.parse(body);
                console.log('Public session URL: ', parsedJSON.automation_session.public_url);
            });
        }
    });

    Before(async function (): Promise<void> {
        if (this.platform === 'DESKTOP') {
            console.log('- Maximize Window BEFORE FEATURE hook');
            await Helpers.driverSleep(this.driver, 1000);
            await this.driver.manage().window().maximize();
        }
    });

    After(async function (scenarioResult: HookScenarioResult): Promise<void> {
        if (!(process.env.DEBUG_STAY_OPEN === 'TRUE' && scenarioResult.result.status === 'failed')) {
            console.log('- WebDriver Quit AFTER FEATURE hook');
            await this.driver.quit();
        }
    });
}
