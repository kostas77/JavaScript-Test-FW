import { GmailHook } from '../../../common/support/gmailHook';
import { CommonHook } from '../../../common/support/commonHook';
import { RegionalHook } from '../../support/regionalHooks';
import { TestData } from '../../FRHealthStore/support/testData';

const testData = new TestData();

GmailHook();
CommonHook();
RegionalHook(testData);
