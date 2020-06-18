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
const commonTestData_1 = require("../../support/commonTestData");
const commonTestData = new commonTestData_1.CommonTestData();
class OrrStoreOrdersListPage {
    constructor(orrPageId) {
        this.pageUrl = commonTestData.getUrlFor().orr.orrStoreSpecificOrdersPage(orrPageId);
        this.orderLinkLocatorTemplate = 'table.layout a[href="/site/' + orrPageId + '/orders/$$ORDER_NUMBER$$"]';
    }
    getPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    getOrderLinkLocator(orderNumber) {
        return this.orderLinkLocatorTemplate.replace('$$ORDER_NUMBER$$', orderNumber);
    }
    getOrderLink(driver, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield helpers_1.Helpers.getElement(driver, this.getOrderLinkLocator(orderNumber));
            }
            catch (err) {
                console.log(`Can't find order ${orderNumber} in orr: ${err.message}`);
                return false;
            }
        });
    }
}
exports.OrrStoreOrdersListPage = OrrStoreOrdersListPage;
//# sourceMappingURL=orrStoreOrdersListPage.js.map