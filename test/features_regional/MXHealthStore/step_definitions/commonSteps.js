"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailSteps_1 = require("../../../common/step_definitions/emailSteps");
const orrWebSteps_1 = require("../../../common/step_definitions/orrWebSteps");
const config_1 = require("../support/config");
const testData_1 = require("../support/testData");
const regionalPrintbookPurchaseSteps_1 = require("../../step_definitions/regionalPrintbookPurchaseSteps");
const config = new config_1.Config();
const testData = new testData_1.TestData();
emailSteps_1.EmailSteps(new emailSteps_1.VitalSourceEmail('eBook VitalSource – Pedido # {orderNumber}', 'https://support.vitalsource.com/', 'Gracias por su pedido de un eBook VitalSource en la Tienda Online de Elsevier', true, 'MX'), new emailSteps_1.ElsevierNewOrderEmail('Elsevier: Nuevo Pedido # {orderNumber}', 'Su pedido #{orderNumber}', true, 'MX', (_email, _isbn) => {
}));
orrWebSteps_1.OrrWebSteps(testData);
regionalPrintbookPurchaseSteps_1.RegionalProductPurchaseSteps(testData, config);
//# sourceMappingURL=commonSteps.js.map