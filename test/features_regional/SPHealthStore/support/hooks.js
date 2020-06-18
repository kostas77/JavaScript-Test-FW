"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gmailHook_1 = require("../../../common/support/gmailHook");
const commonHook_1 = require("../../../common/support/commonHook");
const testData_1 = require("./testData");
const regionalHooks_1 = require("../../support/regionalHooks");
const testData = new testData_1.TestData();
gmailHook_1.GmailHook();
commonHook_1.CommonHook();
regionalHooks_1.RegionalHook(testData);
//# sourceMappingURL=hooks.js.map