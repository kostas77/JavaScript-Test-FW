import { customer, prodCustomer } from './testData';
import { CommonConfig } from '../../../common/support/commonConfig';

export class Config extends CommonConfig {
    constructor() {
        super(customer, prodCustomer);
    }
}
