import { ElsevierNewOrderEmail, EmailSteps, VitalSourceEmail } from '../../../common/step_definitions/emailSteps';
import { OrrWebSteps } from '../../../common/step_definitions/orrWebSteps';
import { Config } from '../support/config';
import { TestData } from '../support/testData';
import { RegionalProductPurchaseSteps } from '../../step_definitions/regionalPrintbookPurchaseSteps';
import * as demand from 'must';


const config = new Config();
const testData = new TestData();

EmailSteps(
    new VitalSourceEmail(
        'VitalSource Purchase - Order # {orderNumber}',
        'https://www.vitalsource.com/login',
        'VitalSource account',
        false,
        'h'),
    new ElsevierNewOrderEmail(
        'Elsevier: New Order # {orderNumber}',
        'Your Order #{orderNumber}',
        false,
        'h', (email: string, isbn: string) => {
            demand(email).must.contain(`-${isbn}.html?leavereview=1`);
        })
    );
OrrWebSteps(testData);
RegionalProductPurchaseSteps(testData, config);

