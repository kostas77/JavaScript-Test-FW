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
class SdHomePage {
    constructor(testData) {
        this.pageTitle = 'Elsevier Home';
        this.pageUrl = testData.getUrlFor().sd.home;
        this.signoutUrl = testData.getUrlFor().sd.signout;
        this.elsevierConnectLocator = '.elsevier--fontRevert-serif';
        this.searchBoxLocator = 'input[type="search"]:nth-child(2)';
        this.searchButtonLocator = 'input[type="submit"]:nth-child(1)';
    }
    getPage(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.pageUrl);
        });
    }
    signout(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.signoutUrl);
        });
    }
}
exports.SdHomePage = SdHomePage;
//# sourceMappingURL=homePage.js.map