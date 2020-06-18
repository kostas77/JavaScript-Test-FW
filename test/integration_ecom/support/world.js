"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
function CustomWorld() {
    this.defaultTimeout = 60000;
    this.customerDetails = [];
    this.orderDetails = [];
    this.orderActivityLogText = [];
    this.orderNumberText = [];
    this.orrListedOrderedIsbns = [];
    this.orderHistoryListedTitles = [];
    this.orderHistoryListedIsbns = [];
}
cucumber_1.setWorldConstructor(CustomWorld);
//# sourceMappingURL=world.js.map