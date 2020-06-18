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
        'Achat eBook : votre code d’accès',
        'https://bookshelf.vitalsource.com/',
        'sur le site Elsevier Masson.fr. Vous trouverez ci-dessous tous les',
        true,
        'MF'),
    new ElsevierNewOrderEmail(
        'Elsevier Masson - Confirmation de votre commande n° {orderNumber}',
        'Vous trouverez la confirmation de votre commande nÂ° {orderNumber}',
        true,
        'MF', (email: string, isbn: string) => {
            demand(email).must.contain(`${isbn}`);
        },
        ',')
);
OrrWebSteps(testData);
RegionalProductPurchaseSteps(testData, config);

