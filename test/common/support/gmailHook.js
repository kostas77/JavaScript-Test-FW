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
const eMailPage_1 = require("../../common/pages/eMailPage");
const cucumber_1 = require("cucumber");
function GmailHook() {
    let gmail;
    cucumber_1.Before({ tags: '@email' }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                user: 'test.elsevier.io@gmail.com',
                password: 'Sp00n123'
            };
            gmail = new eMailPage_1.EMailPage(config);
            yield gmail.init();
        });
    });
    cucumber_1.After({ tags: '@email' }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            gmail.close();
        });
    });
    cucumber_1.Before({ tags: '@email' }, function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.gmail = gmail;
        });
    });
}
exports.GmailHook = GmailHook;
//# sourceMappingURL=gmailHook.js.map