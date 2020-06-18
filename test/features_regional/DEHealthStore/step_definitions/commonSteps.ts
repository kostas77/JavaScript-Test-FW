import { EmailSteps, VitalSourceEmail, ElsevierNewOrderEmail } from '../../../common/step_definitions/emailSteps';
import { OrrWebSteps } from '../../../common/step_definitions/orrWebSteps';
import { Config } from '../support/config';
import { TestData } from '../support/testData';
import { RegionalProductPurchaseSteps } from '../../step_definitions/regionalPrintbookPurchaseSteps';

const config = new Config();
const testData = new TestData();

EmailSteps(
    new VitalSourceEmail(
        'VitalSource Purchase - Order # {orderNumber}',
        'https://www.vitalsource.com/de/login',
        'bei der Elsevier GmbH. Sie kÃ¶nnen Ihr',
        true,
        'MD'),
    new ElsevierNewOrderEmail(
        'Vielen Dank für Ihre Bestellung! # {orderNumber}',
        'Ihre Bestellung Nr. {orderNumber}',
        true,
        'MD', (_email: string, _isbn: string) => {
            // do nothing
        },
        ',',
        true)
);
OrrWebSteps(testData);
RegionalProductPurchaseSteps(testData, config);

