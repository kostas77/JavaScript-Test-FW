import { EmailSteps, VitalSourceEmail, ElsevierNewOrderEmail } from '../../../common/step_definitions/emailSteps';
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
        'https://www.vitalsource.com/en-uk/login',
        'Thank you for your VitalSource eBook order',
        true,
        'MM'),
    new ElsevierNewOrderEmail(
        'Elsevier Order Confirmation. Order # {orderNumber}',
        'Thank you for your order from Elsevier',
        true,
        'MM', (email: string, isbn: string) => {
            demand(email).must.contain(`${isbn}`);
        },
        '.')
);

OrrWebSteps(testData);
RegionalProductPurchaseSteps(testData, config);

