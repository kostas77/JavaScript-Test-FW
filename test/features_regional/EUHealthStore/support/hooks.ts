import { GmailHook } from '../../../common/support/gmailHook';
import { CommonHook } from '../../../common/support/commonHook';
import { TestData } from '../../DEHealthStore/support/testData';
import { RegionalHook } from '../../support/regionalHooks';

const testData = new TestData();

GmailHook();
CommonHook();
RegionalHook(testData);
