"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailSteps_1 = require("../../../common/step_definitions/emailSteps");
const orrWebSteps_1 = require("../../../common/step_definitions/orrWebSteps");
const config_1 = require("../support/config");
const testData_1 = require("../support/testData");
const regionalPrintbookPurchaseSteps_1 = require("../../step_definitions/regionalPrintbookPurchaseSteps");
const demand = require("must");
const config = new config_1.Config();
const testData = new testData_1.TestData();
emailSteps_1.EmailSteps(new emailSteps_1.VitalSourceEmail('VitalSource Purchase - Order # {orderNumber}', 'https://www.vitalsource.com/login', 'VitalSource account', false, 'h'), new emailSteps_1.ElsevierNewOrderEmail('Elsevier: New Order # {orderNumber}', 'Your Order #{orderNumber}', false, 'h', (email, isbn) => {
    demand(email).must.contain(`-${isbn}.html?leavereview=1`);
}));
orrWebSteps_1.OrrWebSteps(testData);
regionalPrintbookPurchaseSteps_1.RegionalProductPurchaseSteps(testData, config);
//# sourceMappingURL=commonSteps.js.map