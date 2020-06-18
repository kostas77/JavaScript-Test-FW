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
const helpers_1 = require("../../support/helpers");
class CkProductPage {
    constructor() {
        this.annualSubscriptionButtonLocator = '.purchase-button-annual';
        this.monthlySubscriptionButtonLocator = '.purchase-button-monthly';
    }
    subscriptionOption(driver, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (duration) {
                case '1 Year Subscription':
                    return yield helpers_1.Helpers.getElement(driver, this.annualSubscriptionButtonLocator);
                    break;
                case '30 Day Subscription':
                    return yield helpers_1.Helpers.getElement(driver, this.monthlySubscriptionButtonLocator);
                    break;
                default:
                    throw new Error('Invalid option for CK subscription requested');
            }
        });
    }
    clickSubscriptionOption(driver, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.subscriptionOption(driver, duration)).click();
        });
    }
}
exports.CkProductPage = CkProductPage;
//# sourceMappingURL=ckProductPage.js.map