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
class ConnectPage {
    constructor(testData) {
        this.pageUrl = testData.getUrlFor().elsevier.connectAccessibility;
        this.pageTitle = 'The many faces of accessibility';
        this.articleActionsLocator = '.article-actions-container-fixed';
        this.connectLocator = '.elsevier--fontRevert-serif';
    }
    visitPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield driver.get(this.pageUrl);
            const actualPageTitle = yield helpers_1.Helpers.getPageTitle(driver);
            chai_1.assert.equal(actualPageTitle, this.pageTitle, 'Expected page title not found');
        });
    }
    getArticleActionsBar(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, this.articleActionsLocator);
        });
    }
}
exports.ConnectPage = ConnectPage;
//# sourceMappingURL=connectPage.js.map