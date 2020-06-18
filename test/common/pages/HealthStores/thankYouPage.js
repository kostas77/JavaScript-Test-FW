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
const chai_1 = require("chai");
class ThankYouPage {
    constructor(testData) {
        this.pageTitle = testData.getTitles().thankYouPage;
        this.prefix = testData.getDataFor().orderNumberPrefix;
        this.pageTitleLocator = '.sub-title';
    }
    getOrderNumber(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderNumber;
            let orderNumberMessage;
            switch (this.prefix) {
                case 'h':
                    orderNumberMessage = yield (yield helpers_1.Helpers.getElement(driver, '.sub-title')).getText();
                    orderNumber = orderNumberMessage.split(': ')[1];
                    break;
                case 'MS':
                case 'MX':
                    orderNumberMessage = yield (yield helpers_1.Helpers.getElement(driver, '.col-main > p:nth-child(3) > a:nth-child(1)')).getText();
                    orderNumber = this.prefix + orderNumberMessage;
                    break;
                case 'MF':
                    orderNumberMessage = yield (yield helpers_1.Helpers.getElement(driver, '.col-main > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(1) > strong:nth-child(1) > a:nth-child(1)')).getText();
                    orderNumber = this.prefix + orderNumberMessage;
                    break;
                default:
                    throw new Error('Unrecognised orderNumber prefix: ' + this.prefix);
            }
            return orderNumber;
        });
    }
    verifyPageTitle(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield helpers_1.Helpers.waitUntilElementHasState(driver, 'located', this.pageTitleLocator, 60 * 1000);
            chai_1.assert(yield (yield helpers_1.Helpers.getElement(driver, this.pageTitleLocator)).getText(), this.pageTitle);
        });
    }
}
exports.ThankYouPage = ThankYouPage;
//# sourceMappingURL=thankYouPage.js.map