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
class AmirsysHomePage {
    constructor(testData) {
        this.pageExpertPathTitle = 'ExpertPath | Your Most Direct Path to the Right Diagnosis';
        this.pageImmunoQueryTitle = 'ImmunoQuery | Get It Right. Right Now.';
        this.pagePATHPrimerTitle = 'PATHPrimer - The definitive online learning source for pathologists - PATHPrimer Site';
        this.pageRADPrimerTitle = 'RADPrimer';
        this.pageSTATdxTitle = 'STATdx | Diagnostic Imaging for Radiology';
        this.pageExpertPathUri = testData.getUrlFor().amirsys.homeExpertPathUri;
        this.pageImmunoQueryUri = testData.getUrlFor().amirsys.homeImmunoQueryUri;
        this.pagePATHPrimerUri = testData.getUrlFor().amirsys.homePATHPrimerUri;
        this.pageRADPrimerUri = testData.getUrlFor().amirsys.homeRADPrimerUri;
        this.pageSTATdxUri = testData.getUrlFor().amirsys.homeSTATdxUri;
        this.logoutUrl = testData.getUrlFor().amirsys.logout;
        this.checkoutUri = testData.getUrlFor().amirsys.checkoutUri;
    }
    visitPage(driver, product) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (product) {
                case 'ExpertPath':
                    return yield driver.get(this.pageExpertPathUri);
                    break;
                case 'ImmunoQuery':
                    return yield driver.get(this.pageImmunoQueryUri);
                    break;
                case 'PATHPrimer':
                    return yield driver.get(this.pagePATHPrimerUri);
                    break;
                case 'RADPrimer':
                    return yield driver.get(this.pageRADPrimerUri);
                    break;
                case 'STATdx':
                    return yield driver.get(this.pageSTATdxUri);
                    break;
                default:
                    throw new Error('Unknown product requested : ' + product);
            }
        });
    }
    logout(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield driver.get(this.logoutUrl);
        });
    }
    productItem(driver, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield helpers_1.Helpers.getElement(driver, `a[href*="${sku}"]`);
        });
    }
    productItemClick(driver, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.productItem(driver, sku)).click();
        });
    }
}
exports.AmirsysHomePage = AmirsysHomePage;
//# sourceMappingURL=amirsysHomePage.js.map