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
class AmirsysProductPage {
    constructor() {
        this.trialToggleCheckboxLocator = '.item-amirsys-trial';
    }
    subscriptionOption(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.trialToggleCheckboxLocator);
        });
    }
    clickSubscriptionOption(driver, isTrial) {
        return __awaiter(this, void 0, void 0, function* () {
            this.trialToggleCheckbox = yield this.subscriptionOption(driver);
            if ((this.trialToggleCheckbox.isSelected() && isTrial === false) || (!this.trialToggleCheckbox.isSelected() && isTrial === true)) {
                return yield this.trialToggleCheckbox.click();
            }
        });
    }
}
exports.AmirsysProductPage = AmirsysProductPage;
//# sourceMappingURL=amirsysProductPage.js.map