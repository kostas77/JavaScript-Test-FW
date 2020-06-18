// import {Config} from './config';
// import * as Logger from 'bunyan';
// import {assert} from 'chai';
import { setWorldConstructor } from 'cucumber';


// import {SubscriptionsAPIClient} from '@elsevier/internal-order-api-client';

function CustomWorld(): void {

    // const config = new Config();
    // const logger = Logger.createLogger({
    //     name: 'E2E-tests',
    //     level: 'info'
    // });
    // const subsAPIClient = new SubscriptionsAPIClient(logger, "https://orr-api.staging.ecommerce.elsevier.com/", 10000);

    this.defaultTimeout = 60000;

    this.customerDetails = []; // Used to record current customer details during sign-in step.  Held here so available across multiple steps files
    this.orderDetails = []; // Used to record new order details so can validate against ORR and order xml
    this.orderActivityLogText = [];  // Used to record activity log record text from ORR order page
    this.orderNumberText = [];  // Used to record order number text from Order History page
    this.orrListedOrderedIsbns = []; // Used to hold the ISBNs found on the order's ORR page
    this.orderHistoryListedTitles = []; // Used to hold the titles found on the order's Order History entry
    this.orderHistoryListedIsbns = []; // Used to hold the ISBNs found on the order's Order History entry

}

setWorldConstructor(CustomWorld);
