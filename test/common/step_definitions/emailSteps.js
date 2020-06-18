"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const fs_1 = require("fs");
const path = require("path");
const moment = require("moment");
const demand = require("must");
const helpers_1 = require("../support/helpers");
class VitalSourceEmail {
    constructor(subject, link, body, ignorePrefix = false, prefix) {
        this.subject = subject;
        this.link = link;
        this.body = body;
        this.ignorePrefix = ignorePrefix;
        this.prefix = prefix;
    }
    getOrderNumber(orderNumber) {
        return this.ignorePrefix ? orderNumber.replace(this.prefix, '') : orderNumber;
    }
    Verify(gmail, orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            let email;
            if (this.subject.indexOf('{orderNumber}') <= 0) {
                email = yield gmail.getEmailBySubjectAndBody(this.subject, this.getOrderNumber(orderDetails.orderNumberText));
            }
            else {
                email = yield gmail.getEmailBySubject(this.subject.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText)));
            }
            if (email) {
                demand(email.text()).must.contain(this.body);
                demand(email.html()).must.contain(this.link);
                demand(email.text()).must.contain(this.getOrderNumber(orderDetails.orderNumberText));
            }
        });
    }
}
exports.VitalSourceEmail = VitalSourceEmail;
class ElsevierNewOrderEmail {
    constructor(subject, body, ignorePrefix, prefix, verifyReviewLink, centsSeparator = '.') {
        this.subject = subject;
        this.body = body;
        this.ignorePrefix = ignorePrefix;
        this.prefix = prefix;
        this.verifyReviewLink = verifyReviewLink;
        this.centsSeparator = centsSeparator;
    }
    getOrderNumber(orderNumber) {
        return this.ignorePrefix ? orderNumber.replace(this.prefix, '') : orderNumber;
    }
    Verify(gmail, orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield gmail.getEmailBySubject(this.subject.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText)));
            demand(email).not.be.undefined();
            const price = orderDetails.fullPrice.replace('.', this.centsSeparator);
            demand(email.text()).must.contain(price);
            demand(email.text()).must.contain(this.body.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText)));
            demand(orderDetails.orderIsbns.length).must.be.at.least(1);
            for (const isbn of orderDetails.orderIsbns) {
                demand(email.text()).must.contain(isbn);
                this.verifyReviewLink(email.html(), isbn);
            }
            for (const productTitle of orderDetails.orderTitles) {
                demand(email.text().toLowerCase()).must.contain(productTitle);
            }
        });
    }
}
exports.ElsevierNewOrderEmail = ElsevierNewOrderEmail;
function EmailSteps(vitalSourceEmail, elsevierNewOrderEmail) {
    cucumber_1.Then(/^I receive (?:a|an) ((?:\w+ ){1,})email(?: within (\d+) (\w+)(?: with a (\d+) second interval))?$/, { timeout: 5 * 60 * 1000 }, function (emailType, expQty, expUnits, intSeconds) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const timeoutQty = parseInt(expQty || '5', 10);
            const timeoutUnits = expUnits || 'minutes';
            const expiryTime = moment().add(timeoutQty, timeoutUnits);
            const seconds = parseInt(intSeconds, 10) || 2;
            while (expiryTime > moment()) {
                let email;
                try {
                    switch (emailType.trim()) {
                        case 'eBook access links':
                            email = yield this.gmail.getEmailBySubject(`Your eBook Access Links for Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                            if (email) {
                                fs_1.writeFileSync(path.join(process.cwd(), 'DownloadLinksEmail.html'), email.html());
                                this.orderDetails.downloadLinksEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                            break;
                        case 'order confirmation':
                            email = yield this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                            if (email) {
                                fs_1.writeFileSync(path.join(process.cwd(), 'OrderConfirmationEmail.html'), email.html());
                                this.orderDetails.orderConfirmationEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                            break;
                        case 'vital source':
                            yield vitalSourceEmail.Verify(this.gmail, this.orderDetails);
                            return resolve();
                        case 'Elsevier new order confirmation':
                            yield elsevierNewOrderEmail.Verify(this.gmail, this.orderDetails);
                            return resolve();
                        case 'CK order confirmation':
                            email = yield this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} from ClinicalKey`);
                            if (email) {
                                fs_1.writeFileSync(path.join(process.cwd(), 'CKOrderConfirmationEmail.html'), email.html());
                                this.orderDetails.orderConfirmationEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                            break;
                        default:
                            return reject(`Email type '${emailType.trim()}' not configured`);
                    }
                }
                catch (err) {
                    if (err !== 'No emails found') {
                        return reject(err);
                    }
                }
                yield helpers_1.Helpers.driverSleep(this.driver, seconds * 1000);
            }
            return reject(`Failed to find email after ${timeoutQty} ${timeoutUnits}`);
        }));
    });
}
exports.EmailSteps = EmailSteps;
//# sourceMappingURL=emailSteps.js.map