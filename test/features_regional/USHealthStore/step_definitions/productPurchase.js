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
const testData_1 = require("../support/testData");
const homePage_1 = require("../../../common/pages/HealthStores/homePage");
const testData = new testData_1.TestData();
const homePage = new homePage_1.HomePage(testData);
cucumber_1.Given(/^I am on the US health Store home page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield homePage.getPage(this.driver);
    });
});
//# sourceMappingURL=productPurchase.js.map