import { until } from 'selenium-webdriver';
import { assert } from 'chai';
import * as Imap from 'imap';
import * as cheerio from 'cheerio';
import { decode } from 'quoted-printable';

export class EMailPage {
    private readonly config: Imap.Config;
    private defaultConfig: Partial<Imap.Config> = {
        host: 'imap.gmail.com',
        port: 993,
        tls: true
    };
    private connection: Imap;
    public pageTitlePrefix: string;

    constructor(config: Partial<Imap.Config>) {
        this.config = <Imap.Config>{ ...config, ...this.defaultConfig };
        this.pageTitlePrefix = 'Gmail - ';
    }

    public async init(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection = new Imap(this.config);
            this.connection.once('ready', () => {
                return resolve();
            });
            this.connection.once('error', (err) => {
                console.log(err);
                return reject();
            });
            this.connection.connect();
        });
    }

    public close() {
        this.connection.end();
    }

    public async getEmailBySubject(subject: string) {
        return new Promise((resolve, reject) => {
            this.connection.openBox('INBOX', (err: Error) => {
                if (err) {
                    return reject(err);
                }
                return resolve(this.searchForEmail([['SUBJECT', subject]]));
            });
        });
    }

    // public async getEmailBySubject(subject: string) {
    //     await this.connection.openBox('INBOX', async (err: Error) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log('testing3......');
    //         return await this.searchForEmail([['SUBJECT', subject]]);
    //     });
    // }

    public async getEmailBySubjectAndBody(subject: string, orderNumber: string) {
        return new Promise((resolve, reject) => {
            this.connection.openBox('INBOX', (err: Error) => {
                if (err) {
                    return reject(err);
                }

                return resolve(this.searchForEmail([['SUBJECT', subject], ['BODY', orderNumber]]));
            });
        });
    }

    private async searchForEmail(parameters: [string, string][]) {
        return new Promise((resolve, reject) => {
            this.connection.search(parameters, (err: Error, uids: number[]) => {
                if (err) {
                    return reject(err);
                } else if (!uids.length) {
                    return reject('No emails found');
                } else if (uids.length > 1) {
                    return reject(`${uids.length} emails found`);
                }
                return resolve(this.getEmailBody(uids[0]));
            });
        });
    }

    // private async searchForEmail(parameters: [string, string][]) {
    //     await this.connection.search(parameters, async (err: Error, uids: number[]) => {
    //         if (err) {
    //             throw err;
    //         } else if (!uids.length) {
    //             throw new Error('No emails found');
    //         } else if (uids.length > 1) {
    //             console.log('testing1......');
    //             throw new Error(`${uids.length} emails found`);
    //         }
    //         console.log('testing2......');
    //         return await this.getEmailBody(uids[0]);
    //     });
    // }

    private async getEmailBody(uid: number) {
        return new Promise((resolve, reject) => {
            const fetch = this.connection.fetch(uid, {
                bodies: 'TEXT'
            });
            let response;

            fetch.on('message', (msg, seqno) => {
                // console.log(`Downloading message ${seqno}`);
                const prefix = '(#' + seqno + ') ';
                msg.on('body', (stream) => {
                    let buffer = '';
                    stream.on('data', (chunk) => {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', () => {
                        response = cheerio.load(decode(buffer));
                    });
                });
                msg.once('end', () => {
                    console.log(`- Finished downloading e-mail ${prefix}`);
                });
            });
            fetch.once('error', reject);
            fetch.once('end', () => {
                // console.log('- Done fetching all messages');
                resolve(response);
            });
        });
    }

    public async downloadLinkRedirectsToVST (driver: any, downloadLink: string): Promise<void> {
        try {
            await driver.get(downloadLink);
            await driver.wait(until.urlContains('https://full-bookshelf.vitalsource.com'), 5 * 1000);
            const url = await driver.getCurrentUrl();
            assert.isTrue(/^https:\/\/full-bookshelf.vitalsource.com/.test(url));
            return;
        } catch (err) {
            return err;
        }
    }

}
