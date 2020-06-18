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
emailSteps_1.EmailSteps(new emailSteps_1.VitalSourceEmail('Achat eBook : votre code d’accès', 'https://bookshelf.vitalsource.com/', 'sur le site Elsevier Masson.fr. Vous trouverez ci-dessous tous les', true, 'MF'), new emailSteps_1.ElsevierNewOrderEmail('Elsevier Masson - Confirmation de votre commande n° {orderNumber}', 'Vous trouverez la confirmation de votre commande nÂ° {orderNumber}', true, 'MF', (email, isbn) => {
    demand(email).must.contain(`${isbn}`);
}, ','));
orrWebSteps_1.OrrWebSteps(testData);
regionalPrintbookPurchaseSteps_1.RegionalProductPurchaseSteps(testData, config);
//# sourceMappingURL=commonSteps.js.map