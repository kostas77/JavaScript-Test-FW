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
const connectPage_1 = require("../../common/pages/ElsevierGlobalStore/connectPage");
const testData_1 = require("../support/testData");
const testData = new testData_1.TestData();
const connectPage = new connectPage_1.ConnectPage(testData);
cucumber_1.When(/^I visit an article page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectPage.visitPage(this.driver);
    });
});
cucumber_1.Then(/^I see the article actions bar at the bottom of the page$/, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const articleActions = yield connectPage.getArticleActionsBar(this.driver);
        const articleProperties = {
            displayed: yield articleActions.isDisplayed(),
            bottom: yield articleActions.getCssValue('bottom'),
            position: yield articleActions.getCssValue('position')
        };
        this.assert.isTrue(articleProperties.displayed);
        this.assert.equal(articleProperties.bottom, '0px');
        this.assert.equal(articleProperties.position, 'fixed');
    });
});
//# sourceMappingURL=connectSteps.js.map