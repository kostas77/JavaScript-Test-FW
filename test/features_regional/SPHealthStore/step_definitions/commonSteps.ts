import { ElsevierNewOrderEmail, EmailSteps, VitalSourceEmail } from '../../../common/step_definitions/emailSteps';
import { OrrWebSteps } from '../../../common/step_definitions/orrWebSteps';
import { Config } from '../support/config';
import { TestData } from '../support/testData';
import { RegionalProductPurchaseSteps } from '../../step_definitions/regionalPrintbookPurchaseSteps';

const config = new Config();
const testData = new TestData();

EmailSteps(new VitalSourceEmail(
    'eBook VitalSource – Pedido # {orderNumber}',
    'https://support.vitalsource.com/',
    'Gracias por su pedido de un eBook VitalSource en la Tienda Online de Elsevier',
    true,
    'MS'),
    new ElsevierNewOrderEmail(
        'Elsevier España: Nuevo Pedido # {orderNumber}',
        'su pedido es nÂ° {orderNumber}',
        true,
        'MS', (_email: string, _isbn: string) => {
            // do nothing
        },
        ','));
OrrWebSteps(testData);
RegionalProductPurchaseSteps(testData, config);
