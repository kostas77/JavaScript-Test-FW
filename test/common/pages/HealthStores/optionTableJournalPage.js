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
class OptionTableJournalPage {
    constructor() {
        this.mainTitleLocator = 'div.product-name > h1:nth-child(1)';
        this.addToCartButtonLocator = 'div.small-5:nth-child(2) > div:nth-child(2) > button:nth-child(1)';
    }
    addToCartButton(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.addToCartButtonLocator);
        });
    }
    addProductToCart(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.addToCartButton(driver)).click();
        });
    }
}
exports.OptionTableJournalPage = OptionTableJournalPage;
//# sourceMappingURL=optionTableJournalPage.js.map