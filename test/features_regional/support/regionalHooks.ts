import { After, HookScenarioResult } from 'cucumber';
import { CartPage } from '../../common/pages/HealthStores/cartPage';

export function RegionalHook(testData): void {

    After({ timeout: 90 * 1000 }, async function (scenarioResult: HookScenarioResult): Promise<void> {
        if (scenarioResult.result.status === 'failed') {
            const cartPage = new CartPage(testData);
            console.log('- Scenario failed: Remove all items for the cart, so subsequent tests are not impacted');
            await cartPage.getPage(this.driver);
            await cartPage.clearCart(this.driver);
        }
    });
}
