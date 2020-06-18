"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const cartPage_1 = require("../../common/pages/HealthStores/cartPage");
function RegionalHook(testData) {
    cucumber_1.After({ timeout: 90 * 1000 }, function (scenarioResult) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scenarioResult.result.status === 'failed') {
                const cartPage = new cartPage_1.CartPage(testData);
                console.log('- Scenario failed: Remove all items for the cart, so subsequent tests are not impacted');
                yield cartPage.getPage(this.driver);
                yield cartPage.clearCart(this.driver);
            }
        });
    });
}
exports.RegionalHook = RegionalHook;
//# sourceMappingURL=regionalHooks.js.map