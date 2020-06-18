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
const cucumber_1 = require("cucumber");
const submit_order_types_1 = require("@elsevier/submit-order-types");
const request = require("request");
const internal_order_api_client_1 = require("@elsevier/internal-order-api-client");
const logger = require("bunyan");
const expect = require("must");
const sleep_1 = require("sleep");
const config = require("config");
const order_status_api_client_1 = require("@elsevier/order-status-api-client");
const submitAPI = config.get('submitApiUrl');
exports.ordersAPI = config.get('ordersAPIUrl');
const log = logger.createLogger({ name: 'orr-tests', level: 'info', serializers: logger.stdSerializers, src: true });
const api = new internal_order_api_client_1.OrdersAPIClient(log, exports.ordersAPI);
let newStatus;
function generateElsevierOrderNo(prefix) {
    const currentTime = new Date().getTime();
    return `${prefix}${currentTime}`.substr(0, 15);
}
cucumber_1.Given('An order for a CK subscription item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('CK');
    this.order = submit_order_types_1.Fixtures.CKOrder({ elsevierOrderNo, paymentDetails: {
            paymentMethod: 'eCapture',
            creditCardType: 'AMERICAN EXPRESS',
            creditCardToken: 'X2d2fb2d6dbb4-46ed-855d-c88accc7c903',
            creditCardExpiry: '10/20',
            creditCardAuthNumber: '737',
            creditCardName: 'Test Account',
            paymentErrorCode: ''
        } })
        .withItem(submit_order_types_1.Fixtures.CKOrderItem())
        .withCustomer({ email: `test.elsevier.io+CK.${elsevierOrderNo}@gmail.com` })
        .build();
    delete this.order.items[0].fulfillmentInfo['type'];
});
cucumber_1.Given('An order for a US store Inkling eBook item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo, storeId: 11 })
        .withItem(submit_order_types_1.Fixtures.InklingItem().withWholeProductId('42907f85afca41528ca6bec3418ea8f1'))
        .withCustomer({ email: `test.elsevier.io+usinkling.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an Evolve Print Book item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('EVL_');
    this.order = submit_order_types_1.Fixtures.EvolveOrder({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.PrintBook())
        .withCustomer({ email: `test.elsevier.io+evolve.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an Evolve eBook item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('EVL_');
    this.order = submit_order_types_1.Fixtures.EvolveOrder({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.EvolveEbook())
        .withCustomer({ email: `test.elsevier.io+evolve.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for a US store Print Book item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = submit_order_types_1.Fixtures.Order({
        storeId: 11,
        elsevierOrderNo
    })
        .withItem(submit_order_types_1.Fixtures.PrintBook())
        .withCustomer({ email: `test.elsevier.io+usstore.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for a US store CD-ROM item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = submit_order_types_1.Fixtures.Order({
        storeId: 11,
        elsevierOrderNo
    })
        .withItem(submit_order_types_1.Fixtures.PhysicalProduct())
        .withCustomer({ email: `test.elsevier.io+usstore.cdrom${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for a US store Flash Card item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = submit_order_types_1.Fixtures.Order({
        storeId: 11,
        elsevierOrderNo
    })
        .withItem(submit_order_types_1.Fixtures.DeltaFlashCard())
        .withCustomer({ email: `test.elsevier.io+usstore.flashcard${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for a US store Delta Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = submit_order_types_1.Fixtures.Order({
        storeId: 11,
        elsevierOrderNo
    })
        .withItem(submit_order_types_1.Fixtures.DeltaJournal())
        .withCustomer({ email: `test.elsevier.io+us-store-delta-journal.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for a Delta Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('e');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.DeltaJournal())
        .withCustomer({ email: `test.elsevier.io+journal.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an ARGI Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('TT');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.ARGIJournal())
        .withCustomer({ email: `test.elsevier.io+argi.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an ArgiReroute Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('e');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.ARGIJournal())
        .withCustomer({ email: `test.elsevier.io+argi.${elsevierOrderNo}@gmail.com`, firstName: 'reroutemepls' })
        .build();
});
cucumber_1.Given('An order for an Advantage Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('e');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.AdvantageJournal())
        .withCustomer({ email: `test.elsevier.io+advantage.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.When('An order update is sent to ORR', function (callback) {
    const orderStatusUpdateApiUrl = config.get('orderStatusUpdateApiUrl');
    newStatus = order_status_api_client_1.LineItem.StatusEnum.OK;
    const statusUpdate = {
        lineItems: [{
                identifier: {
                    type: order_status_api_client_1.LineItemIdentifier.TypeEnum.Issn,
                    value: String(this.order.items[0].sbn)
                },
                status: newStatus,
                invoiceNumber: '3'
            }]
    };
    const orderStatusUpdateClient = new order_status_api_client_1.OrderStatusAPIClient(orderStatusUpdateApiUrl);
    orderStatusUpdateClient.updateOrder(this.order.elsevierOrderNo, statusUpdate).then(() => {
        sleep_1.sleep(5);
        callback();
    }).catch(error => {
        callback(error);
    });
});
cucumber_1.Then('There exists an update event', function (callback) {
    const timeoutSeconds = 30;
    let timeoutTimer;
    const intervalTimer = setInterval(() => {
        api.getEventsForOrder(this.order.elsevierOrderNo)
            .catch(callback.bind(this, 'failed to retrieve events'))
            .then(events => {
            if (Array.isArray(events)
                && events.length
                && events[0].items
                && events[0].items.length
                && events[0].items[0]
                && events[0].items[0].data
                && events[0].items[0].data.fulfilmentLineStatus
                && events[0].items[0].data.fulfilmentLineStatus === 'COMPLETED') {
                clearTimeout(timeoutTimer);
                clearInterval(intervalTimer);
                callback();
            }
        });
    }, 1000);
    timeoutTimer = setTimeout(() => {
        clearInterval(intervalTimer);
        callback(`no matching status update event found in the allowed ${timeoutSeconds}s timeout`);
    }, timeoutSeconds * 1000);
});
cucumber_1.Then('The status for the item in the order is updated', function (callback) {
    api.getOrder(this.order.elsevierOrderNo).then(updatedOrder => {
        if (updatedOrder.items[0].fulfilmentLineStatus === 'COMPLETED') {
            callback();
        }
        else {
            callback('wrong status');
        }
    });
});
cucumber_1.Given('An order for an eBook item from the spain store is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('MS');
    this.order = submit_order_types_1.Fixtures.Order()
        .fromSpainStore()
        .withItem(submit_order_types_1.Fixtures.EvolveEbook())
        .withCustomer({ email: `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com` })
        .build();
    this.order.elsevierOrderNo = elsevierOrderNo;
});
cucumber_1.Given('An order for an eBook item from the france store is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('MF');
    this.order = submit_order_types_1.Fixtures.Order({
        storeId: 12
    })
        .withItem(submit_order_types_1.Fixtures.EvolveEbook())
        .withCustomer({ email: `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com` })
        .build();
    this.order.elsevierOrderNo = elsevierOrderNo;
});
cucumber_1.Given('An order for a print book item from the france store is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('MF');
    this.order = submit_order_types_1.Fixtures.FranceOrder()
        .withItem(submit_order_types_1.Fixtures.DeltaFranceBook())
        .withCustomer({ email: `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com` })
        .build();
    this.order.elsevierOrderNo = elsevierOrderNo;
});
cucumber_1.Given('An order for a SalesLogix Book item is generated', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const elsevierOrderNo = generateElsevierOrderNo('MS');
        this.order = submit_order_types_1.Fixtures.Order()
            .fromSpainStore()
            .withItem(submit_order_types_1.Fixtures.SalesLogixBook())
            .build();
        this.order.elsevierOrderNo = elsevierOrderNo;
        this.order.customer.email = `test.elsevier.io+book.${elsevierOrderNo}@gmail.com`;
        this.order.customer.id = 'QEMEAA2FLTCN';
        this.order.shippingAddress.id = 'QEMEAA2FLTEQ';
        this.order.billingAddress.id = 'QEMEAA2FLTEP';
    });
});
cucumber_1.Given('An order for an eBook item from the mexico store is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('MS');
    this.order = submit_order_types_1.Fixtures.Order({ elsevierOrderNo, storeId: 4 })
        .withItem(submit_order_types_1.Fixtures.EvolveEbook())
        .withCustomer({ email: `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an Amirsys item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('AM_e');
    this.order = submit_order_types_1.Fixtures.AmirsysOrder({ elsevierOrderNo })
        .withItem(submit_order_types_1.Fixtures.AmirsysSubscription())
        .withCustomer({ email: `test.elsevier.io+amirsys.${elsevierOrderNo}@gmail.com` })
        .build();
});
cucumber_1.Given('An order for an ebook from the b2b platform is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('EOP');
    const email = `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com`;
    this.order = submit_order_types_1.Fixtures.B2BOrder()
        .withItem(submit_order_types_1.Fixtures.ScienceDirectItem())
        .withInvoicePayment(email)
        .build();
    this.order.customer.administrator.email = email;
    this.order.customer.fulfilmentNotificationEmail = email;
    this.order.elsevierOrderNo = elsevierOrderNo;
});
cucumber_1.When('The order is sent to ORR', function (callback) {
    console.log(' - Order number:', this.order.elsevierOrderNo);
    request.post({
        url: submitAPI,
        headers: { 'accept-version': '6' },
        json: this.order
    }, function (error, httpResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error || httpResponse.statusCode >= 400) {
                callback(error || `Failed to send order to ORR: ${httpResponse.statusCode}`);
            }
            else {
                try {
                    sleep_1.sleep(2);
                    const order = yield api.getOrder(this.order.elsevierOrderNo);
                    this.order = order;
                    callback();
                }
                catch (err) {
                    callback(err);
                }
            }
        });
    }.bind(this));
});
function assertEvent(order, expectedSource, expectedStatus, exists, expectedType) {
    return __awaiter(this, void 0, void 0, function* () {
        let attempts = 0;
        let success = false;
        const log = logger.createLogger({ name: 'orr-tests', level: 'info', serializers: logger.stdSerializers, src: true });
        const api = new internal_order_api_client_1.OrdersAPIClient(log, exports.ordersAPI);
        let submittedOrder;
        while (attempts < 5 && !success) {
            attempts++;
            sleep_1.sleep(attempts);
            if (!submittedOrder) {
                try {
                    submittedOrder = yield api.getOrder(order.elsevierOrderNo);
                }
                catch (error) {
                    continue;
                }
            }
            const events = yield api.getEventsForOrder(order.elsevierOrderNo);
            if (!events) {
                continue;
            }
            const filteredEvents = events.filter(event => event.source === expectedSource);
            if (filteredEvents.length === 0) {
                continue;
            }
            const eventStatus = filteredEvents.filter(event => event.status === expectedStatus);
            if (eventStatus.length === 0) {
                continue;
            }
            if (expectedType) {
                const eventType = filteredEvents.filter(event => event.type === expectedType);
                if (eventType.length === 0) {
                    continue;
                }
            }
            success = true;
        }
        expect(success).to.be.equal(exists);
        return success;
    });
}
cucumber_1.Then(/^The order is fulfilled successfully with (.+)$/, { timeout: 30 * 1000 }, function (fulfiller) {
    return __awaiter(this, void 0, void 0, function* () {
        fulfiller = fulfiller === 'A&E' ? 'ANE' : fulfiller;
        return assertEvent(this.order, `${fulfiller.toUpperCase()}-FULFILMENT`, internal_order_api_client_1.OrderEventsAPIClient.StatusSuccess, true)
            .then(() => {
            return assertEvent(this.order, `${fulfiller.toUpperCase()}-FULFILMENT`, internal_order_api_client_1.OrderEventsAPIClient.StatusError, false);
        });
    });
});
function evaluateEvent(order, eventSource, eventType) {
    return __awaiter(this, void 0, void 0, function* () {
        return assertEvent(order, eventSource.toUpperCase(), internal_order_api_client_1.OrderEventsAPIClient.StatusSuccess, true, eventType)
            .then(() => {
            return assertEvent(order, eventSource.toUpperCase(), internal_order_api_client_1.OrderEventsAPIClient.StatusError, false, eventType);
        });
    });
}
cucumber_1.Then(/^The order confirmation email is sent to the customer$/, { timeout: 30 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        return evaluateEvent(this.order, 'ORDER-CONFIRMATION', 'SEND_TO_ORDER_CONFIRMATION');
    });
});
cucumber_1.Then(/^(.+) is taken in ORR for this order$/, { timeout: 30 * 1000 }, function (expectedEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (expectedEvent === 'No payment') {
            return evaluateEvent(this.order, 'PAYMENT', 'NOTHING_TO_PROCESS');
        }
        else if (expectedEvent === 'Payment') {
            return evaluateEvent(this.order, 'PAYMENT', 'TAKE_PAYMENT');
        }
    });
});
cucumber_1.Then(/^The order is routed successfully to (.+)$/, { timeout: 30 * 1000 }, function (fulfiller) {
    return __awaiter(this, void 0, void 0, function* () {
        return assertEvent(this.order, 'FULFILMENT-ROUTER', internal_order_api_client_1.OrderEventsAPIClient.StatusSuccess, true, `ROUTING_TO_${fulfiller.toUpperCase()}`)
            .then(() => {
            return assertEvent(this.order, 'FULFILMENT-ROUTER', internal_order_api_client_1.OrderEventsAPIClient.StatusError, false);
        });
    });
});
//# sourceMappingURL=orrOrderFlowSteps.js.map