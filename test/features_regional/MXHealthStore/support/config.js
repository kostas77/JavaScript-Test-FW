"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testData_1 = require("./testData");
const commonConfig_1 = require("../../../common/support/commonConfig");
class Config extends commonConfig_1.CommonConfig {
    constructor() {
        super(testData_1.customer, testData_1.prodCustomer);
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map