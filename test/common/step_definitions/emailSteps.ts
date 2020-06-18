import { defineStep } from 'cucumber';
import { writeFileSync } from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import * as demand from 'must';
import { Helpers } from '../support/helpers';
import { EMailPage } from '../pages/eMailPage';

export class VitalSourceEmail {
    private readonly subject: string;
    private readonly link: string;
    private readonly body: string;
    private readonly ignorePrefix: boolean;
    private readonly prefix: string;

    constructor (subject: string, link: string, body: string, ignorePrefix: boolean = false, prefix: string) {
        this.subject = subject;
        this.link = link;
        this.body = body;
        this.ignorePrefix = ignorePrefix;
        this.prefix = prefix;
    }

    private getOrderNumber(orderNumber: string): string {
        return this.ignorePrefix ? orderNumber.replace(this.prefix, '') : orderNumber;
    }

    public async Verify(gmail: EMailPage, orderDetails: { orderNumberText: string }): Promise<void> {
        let email: any;
        if (this.subject.indexOf('{orderNumber}') <= 0) {
            email = await gmail.getEmailBySubjectAndBody(this.subject, this.getOrderNumber(orderDetails.orderNumberText));
        } else {
            email = await gmail.getEmailBySubject(this.subject.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText)));
        }
        if (email) {
            console.log('  - Email must contain "' + this.body + '"');
            demand(email.text()).must.contain(this.body);
            console.log('  - Email must contain "' + this.link + '"');
            demand(email.html()).must.contain(this.link);
            console.log('  - Email must contain "' + this.getOrderNumber(orderDetails.orderNumberText) + '"');
            demand(email.text()).must.contain(this.getOrderNumber(orderDetails.orderNumberText));
        }
    }
}

export class ElsevierNewOrderEmail {
    private readonly subject: string;
    private readonly body: string;
    private readonly ignorePrefix: boolean;
    private readonly prefix: string;
    private readonly verifyReviewLink: Function;
    private readonly centsSeparator: string;
    private readonly skipIsbnCheck: boolean;

    constructor(
        subject: string, body: string,
        ignorePrefix: boolean,
        prefix: string,
        verifyReviewLink: Function,
        centsSeparator: string = '.',
        skipIsbnCheck: boolean = false
    ) {
        this.subject = subject;
        this.body = body;
        this.ignorePrefix = ignorePrefix;
        this.prefix = prefix;
        this.verifyReviewLink = verifyReviewLink;
        this.centsSeparator = centsSeparator;
        this.skipIsbnCheck = skipIsbnCheck;
    }

    private getOrderNumber(orderNumber: string): string {
        return this.ignorePrefix ? orderNumber.replace(this.prefix, '') : orderNumber;
    }

    public async Verify(gmail: EMailPage, orderDetails: { orderNumberText: string, orderIsbns: string[], fullPrice: string, orderTitles: string[] }): Promise<void> {

        const emailSubject: string = this.subject.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText));
        console.log('  - Retrieving email with subject "' + emailSubject + '"');
        const email: any = await gmail.getEmailBySubject(emailSubject);
        console.log('  - Has email been found?');
        demand(email).not.be.undefined();

        const emailText = email.text();
        const loweredEmailText = emailText.toLowerCase();
        const emailHtml = email.html();

        const price = orderDetails.fullPrice.replace('.', this.centsSeparator);
        console.log('  - Checking for price ' + price);
        demand(emailText).must.contain(price);

        console.log('  - Checking for order number ' + this.getOrderNumber(orderDetails.orderNumberText));
        demand(emailText).must.contain(this.body.replace('{orderNumber}', this.getOrderNumber(orderDetails.orderNumberText)));

        if (!this.skipIsbnCheck) {
            console.log('  - Must have at least one ISBN');
            demand(orderDetails.orderIsbns.length).must.be.at.least(1);
            for (const isbn of orderDetails.orderIsbns) {
                console.log('    - Checking for ISBN ' + isbn);
                demand(emailText).must.contain(isbn);
                this.verifyReviewLink(emailHtml, isbn);
            }
        }

        for (const productTitle of orderDetails.orderTitles) {
            console.log('    - Checking for title ' + productTitle);
            demand(loweredEmailText).must.contain(productTitle);
        }
    }

}

export function EmailSteps(vitalSourceEmail: VitalSourceEmail, elsevierNewOrderEmail: ElsevierNewOrderEmail): void {
    defineStep(/^I receive (?:a|an) ((?:\w+ ){1,})email(?: within (\d+) (\w+)(?: with a (\d+) second interval))?$/, { timeout: 5 * 60 * 1000 }, function (emailType: string, expQty?: string, expUnits?: string, intSeconds?: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const timeoutQty: number = parseInt(expQty || '5', 10);
            const timeoutUnits: string = expUnits || 'minutes';
            const expiryTime = moment().add(
                timeoutQty as moment.DurationInputArg1,
                timeoutUnits as moment.DurationInputArg2
            );
            const seconds: number = parseInt(intSeconds, 10) || 2;

            while (expiryTime > moment()) {
                let email;
                try {
                    switch (emailType.trim()) {
                        case 'eBook access links':
                            email = await this.gmail.getEmailBySubject(`Your eBook Access Links for Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                            if (email) {
                                writeFileSync(path.join(process.cwd(), 'DownloadLinksEmail.html'), email.html());
                                this.orderDetails.downloadLinksEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                        case 'order confirmation':
                            email = await this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} on Elsevier.com`);
                            if (email) {
                                writeFileSync(path.join(process.cwd(), 'OrderConfirmationEmail.html'), email.html());
                                this.orderDetails.orderConfirmationEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                        case 'vital source':
                            await vitalSourceEmail.Verify(this.gmail, this.orderDetails);
                            return resolve();
                        case 'Elsevier new order confirmation':
                            await elsevierNewOrderEmail.Verify(this.gmail, this.orderDetails);
                            return resolve();
                        case 'CK order confirmation':
                            email = await this.gmail.getEmailBySubject(`Your Order ${this.orderDetails.orderNumberText} from ClinicalKey`);
                            if (email) {
                                writeFileSync(path.join(process.cwd(), 'CKOrderConfirmationEmail.html'), email.html());
                                this.orderDetails.orderConfirmationEmail = email;
                                return resolve();
                            }
                            return reject('The email could not be found');
                        default:
                            return reject(`Email type '${emailType.trim()}' not configured`);
                    }
                } catch (err) {
                    if (err !== 'No emails found') {
                        return reject(err);
                    }
                }
                await Helpers.driverSleep(this.driver, seconds * 1000);
            }

            return reject(`Failed to find email after ${timeoutQty} ${timeoutUnits}`);
        });
    });
}
