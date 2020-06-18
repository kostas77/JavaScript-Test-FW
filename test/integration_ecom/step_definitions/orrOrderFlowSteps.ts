import { defineStep, CallbackStepDefinition } from 'cucumber';
import { Fixtures } from '@elsevier/submit-order-types';
import * as request from 'request';
import { OrdersAPIClient, OrderEventsAPIClient, IOrder } from '@elsevier/internal-order-api-client';
import * as logger from 'bunyan';
import * as expect from 'must';
import { sleep } from 'sleep';
import * as config from 'config';
import { OrderStatusAPIClient, LineItem, LineItemIdentifier } from '@elsevier/order-status-api-client';
import { SubmittedOrderBuilder } from '@elsevier/submit-order-types/fixtures/SubmittedOrderBuilder';
import { CkCreditCardDetails } from '../../common/support/commonTestData';

const submitAPI = config.get('submitApiUrl');
export const ordersAPI = config.get('ordersAPIUrl');

const log = logger.createLogger({ name: 'orr-tests', level: 'info', serializers: logger.stdSerializers, src: true });
const api = new OrdersAPIClient(log, ordersAPI);
let newStatus: LineItem.StatusEnum;

function generateElsevierOrderNo(prefix: string): string {
    const currentTime = new Date().getTime();
    return `${prefix}${currentTime}`.substr(0, 15);
}

defineStep('An order for a US store Inkling eBook item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('h');
    this.order = Fixtures.Order({ elsevierOrderNo, storeId: 11 })
        .withItem(Fixtures.InklingItem().withWholeProductId('42907f85afca41528ca6bec3418ea8f1'))
        .withCustomer({ email: `test.elsevier.io+usinkling.${elsevierOrderNo}@gmail.com` })
        .build();
});

defineStep('An order for a CK subscription item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('CK');
    this.order = Fixtures.CKOrder({
        elsevierOrderNo,
        paymentDetails: CkCreditCardDetails
    })
        .withItem(Fixtures.CKOrderItem())
        .withCustomer({ email: `test.elsevier.io+CK.${elsevierOrderNo}@gmail.com` })
        .build();
    delete this.order.items[0].fulfillmentInfo['type'];
});

defineStep('An order for a SalesLogix Book item is generated', async function () {
    const elsevierOrderNo = generateElsevierOrderNo('MS');
    this.order = Fixtures.Order()
        .fromSpainStore()
        .withItem(Fixtures.SalesLogixBook())
        .build();
    this.order.elsevierOrderNo = elsevierOrderNo;
    this.order.customer.email = `test.elsevier.io+book.${elsevierOrderNo}@gmail.com`;
    this.order.customer.id = 'QEMEAA2FLTCN';
    this.order.shippingAddress.id = 'QEMEAA2FLTEQ';
    this.order.billingAddress.id = 'QEMEAA2FLTEP';
});

defineStep('A B2B order for an ebook is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('EOP');
    const email = `test.elsevier.io+ebook.${elsevierOrderNo}@gmail.com`;
    this.order = Fixtures.B2BOrder()
        .withItem(Fixtures.ScienceDirectItem())
        .withInvoicePayment(email)
        .build();
    this.order.customer.administrator.email = email;
    this.order.customer.fulfilmentNotificationEmail = email;
    this.order.elsevierOrderNo = elsevierOrderNo;
});

// MSF TODO: Advantage integration - remove this when Advantage goes live
defineStep('An order for an ArgiReroute Journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('e');
    this.order = Fixtures.Order({ elsevierOrderNo })
        .withItem(Fixtures.ARGIJournal())
        .withCustomer({ email: `test.elsevier.io+argi.${elsevierOrderNo}@gmail.com`, firstName: 'reroutemepls' })
        .build();
});

defineStep('An order from France Store for a journal item is generated', function () {
    const elsevierOrderNo = generateElsevierOrderNo('MF');
    this.order = Fixtures.FranceOrder()
        .withItem(Fixtures.DeltaFranceJournal())
        .withCustomer({ email: `test.elsevier.io+journal.${elsevierOrderNo}@gmail.com` })
        .paidWithPaypal()
        .build();
    this.order.elsevierOrderNo = elsevierOrderNo;
});

// Simple order creation based upon provided site and product type . . .
defineStep(/^An order for (.+) item from the (.+) store is generated/, { timeout: 30 * 1000 }, async function (productType: string, store: string) {

    const productTypeTidy: string = productType.toUpperCase().replace('A ', '').replace('AN ', '').replace(' ', '_');
    let orderBuild: SubmittedOrderBuilder;
    let elsevierOrderNo: string;

    // Assign store and generate the order number . . .
    switch (store.toUpperCase()) {
        case 'UK':
            elsevierOrderNo = generateElsevierOrderNo('MU');
            orderBuild = Fixtures.UkOrder({ elsevierOrderNo });
            break;
        case 'EU':
            elsevierOrderNo = generateElsevierOrderNo('ME');
            orderBuild = Fixtures.EuOrder({ elsevierOrderNo });
            break;
        case 'MEA':
            elsevierOrderNo = generateElsevierOrderNo('MM');
            orderBuild = Fixtures.MeaOrder({ elsevierOrderNo });
            break;
        case 'DE':
            elsevierOrderNo = generateElsevierOrderNo('MD');
            orderBuild = Fixtures.DeOrder({ elsevierOrderNo });
            break;
        case 'FR':
        case 'FRANCE':
            elsevierOrderNo = generateElsevierOrderNo('MF');
            orderBuild = Fixtures.FranceOrder({ elsevierOrderNo });
            break;
        case 'ES':
        case 'SPAIN':
            elsevierOrderNo = generateElsevierOrderNo('MS');
            orderBuild = Fixtures.SpainOrder({ elsevierOrderNo });
            break;
        case 'MX':
        case 'MEXICO':
            elsevierOrderNo = generateElsevierOrderNo('MS');
            orderBuild = Fixtures.Order({ elsevierOrderNo, storeId: 4 });
            break;
        case 'US':
            elsevierOrderNo = generateElsevierOrderNo('h');
            orderBuild = Fixtures.Order({ elsevierOrderNo, storeId: 11 });
            break;
        case 'EVOLVE':
            elsevierOrderNo = generateElsevierOrderNo('EVL_');
            orderBuild = Fixtures.EvolveOrder({ elsevierOrderNo });
            break;
        case 'NON-SPECIFIC':
        case 'NON_SPECIFIC':
            elsevierOrderNo = generateElsevierOrderNo('h');
            orderBuild = Fixtures.Order({ elsevierOrderNo });
            break;
        case 'B2B':
            elsevierOrderNo = generateElsevierOrderNo('EOP');
            orderBuild = Fixtures.B2BOrder({ elsevierOrderNo });
            break;
        case 'AMIRSYS':
            elsevierOrderNo = generateElsevierOrderNo('AM_e');
            orderBuild = Fixtures.Order({ elsevierOrderNo });
            break;
        case 'CK':
        case 'CLINICAL_KEY':
            elsevierOrderNo = generateElsevierOrderNo('CK');
            orderBuild = Fixtures.CKOrder({
                elsevierOrderNo ,
                paymentDetails: CkCreditCardDetails
            })
                .withCustomer({ id: 'QEMEAA2FLTCN' });
            break;
        case 'SALESLOGIX':
            elsevierOrderNo = generateElsevierOrderNo('MS');
            break;
        default:
            throw new Error('Store ' + store.toUpperCase() + ' unknown');
    }

    // Define the email address . . .
    orderBuild.withCustomer({ email: `test.elsevier.io+${productTypeTidy}.${elsevierOrderNo}@gmail.com` });

    // Add item to the order . . .
    switch (productTypeTidy) {
        case 'PRINT_BOOK':
            orderBuild.withItem(Fixtures.DeltaPrintBook());
            break;
        case 'FRENCH_BOOK':
        case 'FRENCH_PRINT_BOOK':
        case 'FRANCE_BOOK':
        case 'DELTA_FRANCE_BOOK':
        case 'DELTA_FRANCE_PRINT_BOOK':
            orderBuild.withItem(Fixtures.DeltaFranceBook());
            break;
        case 'EBOOK':
            orderBuild.withItem(Fixtures.DeltaVSTEbook());
            break;
        case 'EVOLVE_EBOOK':
            orderBuild.withItem(Fixtures.EvolveEbook());
            break;
        case 'INKLING_EBOOK':
            orderBuild.withItem(Fixtures.DeltaInklingEbook());
            break;
        case 'JOURNAL':
        case 'DELTA_JOURNAL':
            orderBuild.withItem(Fixtures.DeltaJournal2());
            break;
        case 'FRENCH_JOURNAL':
        case 'FRANCE_JOURNAL':
        case 'DELTA_FRANCE_JOURNAL':
            orderBuild.withItem(Fixtures.DeltaFranceJournal());
            break;
        case 'ARGI_JOURNAL':
            orderBuild.withItem(Fixtures.ARGIJournal());
            break;
        case 'REROUTE_ARGI_JOURNAL':
            orderBuild.withItem(Fixtures.ARGIJournal());
            orderBuild.withCustomer({ firstName: 'reroutemepls' });
            break;
        case 'ADVANTAGE_JOURNAL':
            orderBuild.withItem(Fixtures.AdvantageJournal());
            break;
        case 'PHYSICAL_PRODUCT':
            orderBuild.withItem(Fixtures.PhysicalProduct());
            break;
        case 'FLASH_CARD':
            orderBuild.withItem(Fixtures.DeltaFlashCard());
            break;
        case 'ONLINE':
            orderBuild.withItem(Fixtures.DeltaOnlineResource());
            break;
        case 'CDROM':
            orderBuild.withItem(Fixtures.DeltaCDROM());
            break;
        case 'DVD':
            orderBuild.withItem(Fixtures.DeltaDVD());
            break;
        case 'POSTER':
            orderBuild.withItem(Fixtures.DeltaPoster());
            break;
        case 'PIN':
            orderBuild.withItem(Fixtures.DeltaOnlineResource());
            break;
        case 'CK_SUBSCRIPTION':
            orderBuild.withItem(Fixtures.CKOrderItem());
            break;
        case 'SALESLOGIX_BOOK':
            orderBuild.withItem(Fixtures.SalesLogixBook());
            break;
        case 'SALESLOGIX_JOURNAL':
            orderBuild.withItem(Fixtures.SalesLogixJournal());
            break;
        case 'AMIRSYS_SUBSCRIPTION':
            orderBuild.withItem(Fixtures.AmirsysSubscription());
            break;
        case 'AMIRSYS':
            orderBuild.withItem(Fixtures.AmirsysSubscription());
            break;
        case 'SCIENCEDIRECT':
            orderBuild.withItem(Fixtures.ScienceDirectItem());
            break;
        default:
            throw new Error('Product type ' + productTypeTidy.toUpperCase() + ' unknown');
    }

    // Finally build the order . . .
    this.order = orderBuild.build();

});

defineStep('An order update is sent to ORR', function (callback: CallbackStepDefinition) {

    const orderStatusUpdateApiUrl = config.get('orderStatusUpdateApiUrl');
    const currentStatus = this.order.items[0].fulfilmentLineStatus;
    newStatus = currentStatus === undefined ? LineItem.StatusEnum.OK : currentStatus;
    const statusUpdate = {
        lineItems: [{
            identifier: {
                type: LineItemIdentifier.TypeEnum.Issn,
                value: String(this.order.items[0].sbn)
            },
            status: newStatus,
            invoiceNumber: '3'
        }]
    };

    const orderStatusUpdateClient = new OrderStatusAPIClient(orderStatusUpdateApiUrl);
    orderStatusUpdateClient.updateOrder(this.order.elsevierOrderNo, statusUpdate).then(() => {
        sleep(5); // MSF: give some time for processing
        callback();
    }).catch(error => {
        callback(error);
    });
});

defineStep('There exists an update event', function (callback) {
    // MSF: polling for up to 30 seconds (lambda can take a while to spin up for the first time)

    const timeoutSeconds = 30;
    let timeoutTimer;

    const intervalTimer = setInterval(() => {
        api.getEventsForOrder(this.order.elsevierOrderNo)
          .catch(callback.bind(this, 'failed to retrieve events'))
          .then(events => {
              if (
                Array.isArray(events)
                && events.length
                && events[0].items
                && events[0].items.length
                && events[0].items[0]
                && events[0].items[0].data
                && events[0].items[0].data.fulfilmentLineStatus
                && events[0].items[0].data.fulfilmentLineStatus === 'COMPLETED'
            ) {
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

defineStep('The status for the item in the order is updated', function (callback) {

    api.getOrder(this.order.elsevierOrderNo).then(updatedOrder => {
        if (updatedOrder.items[0].fulfilmentLineStatus === 'COMPLETED') {
            callback();
        } else {
            callback('wrong status');
        }
    });
});

defineStep('The order is sent to ORR', { timeout: 10 * 1000 }, function (callback: CallbackStepDefinition) {
    console.log('     - Order number:', this.order.elsevierOrderNo);
    request.post({
        url: submitAPI,
        headers: { 'accept-version': '6' },
        json: this.order
    }, async function (error, httpResponse) {
        if (error || httpResponse.statusCode >= 400) {
            callback(error || `Failed to send order to ORR: ${httpResponse.statusCode}`);
        } else {
            const order = await waitUntilGetOrder(this.order.elsevierOrderNo, 6 * 1000);
            if (order.elsevierOrderNo === this.order.elsevierOrderNo) {
                this.order = order;
                callback();
            } else {
                callback(order.err);
            }
        }
    }.bind(this));
});

async function waitUntilGetOrder(elsevierOrderNo: string, timeout: number): Promise<any> {
    sleep(2);
    const remainingTime = timeout - 2000;
    try {
        return await api.getOrder(elsevierOrderNo);
    } catch (err) {
        if (remainingTime >= 2000) {
            // Take care, recursive function here
            return await waitUntilGetOrder(elsevierOrderNo, remainingTime);
        } else {
            return { err };
        }
    }
}

async function assertEvent(order: IOrder, expectedSource: string, expectedStatus: string, exists: boolean, expectedType?: string): Promise<boolean> {
    let attempts = 0;
    let success = false;
    const log = logger.createLogger({ name: 'orr-tests', level: 'info', serializers: logger.stdSerializers, src: true });
    const api = new OrdersAPIClient(log, ordersAPI);
    let submittedOrder: IOrder;

    while (attempts < 5 && !success) {
        attempts++;
        // Note that sleep() blocks the Node event loop. That is fine here but we need to be aware of it if we are running multiple tests
        sleep(attempts);
        if (!submittedOrder) {
            try {
                submittedOrder = await api.getOrder(order.elsevierOrderNo);
            } catch (error) {
                continue;
            }
        }
        const events = await api.getEventsForOrder(order.elsevierOrderNo);
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
}

defineStep(/^The order is fulfilled successfully with (.+)$/, { timeout: 30 * 1000 }, async function (fulfiller: string): Promise<boolean> {
    fulfiller = fulfiller === 'A&E' ? 'ANE' : fulfiller;
    return assertEvent(this.order, `${fulfiller.toUpperCase()}-FULFILMENT`, OrderEventsAPIClient.StatusSuccess, true)
            .then(() => {
                return assertEvent(this.order, `${fulfiller.toUpperCase()}-FULFILMENT`, OrderEventsAPIClient.StatusError, false);
            });
});

async function evaluateEvent(order: IOrder, eventSource: string, eventType: string): Promise<boolean> {
    return assertEvent(order, eventSource.toUpperCase(), OrderEventsAPIClient.StatusSuccess, true, eventType)
        .then(() => {
            return assertEvent(order, eventSource.toUpperCase(), OrderEventsAPIClient.StatusError, false, eventType);
        });
}

defineStep(/^The order confirmation email is sent to the customer$/, { timeout: 30 * 1000 }, async function (): Promise<boolean> {
    return evaluateEvent(this.order, 'ORDER-CONFIRMATION', 'SEND_TO_ORDER_CONFIRMATION');
});

defineStep(/^(.+) is taken in ORR for this order$/, { timeout: 30 * 1000 }, async function(expectedEvent: string): Promise<boolean> {
    if (expectedEvent === 'No payment') {
        return evaluateEvent(this.order, 'PAYMENT', 'NOTHING_TO_PROCESS');
    } else if (expectedEvent === 'Payment') {
        return evaluateEvent(this.order, 'PAYMENT', 'TAKE_PAYMENT');
    }
});

defineStep(/^The order is routed successfully to (.+)$/, { timeout: 30 * 1000 }, async function (fulfiller: string): Promise<boolean> {

    return assertEvent(this.order, 'FULFILMENT-ROUTER', OrderEventsAPIClient.StatusSuccess, true, `ROUTING_TO_${fulfiller.toUpperCase()}`)
        .then(() => {
            return assertEvent(this.order, 'FULFILMENT-ROUTER', OrderEventsAPIClient.StatusError, false);
        });
});
