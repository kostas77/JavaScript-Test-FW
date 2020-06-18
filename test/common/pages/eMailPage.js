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
const selenium_webdriver_1 = require("selenium-webdriver");
const chai_1 = require("chai");
const Imap = require("imap");
const cheerio = require("cheerio");
const quoted_printable_1 = require("quoted-printable");
class EMailPage {
    constructor(config) {
        this.defaultConfig = {
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        };
        this.config = Object.assign(Object.assign({}, config), this.defaultConfig);
        this.pageTitlePrefix = 'Gmail - ';
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    close() {
        this.connection.end();
    }
    getEmailBySubject(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.openBox('INBOX', (err) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(this.searchForEmail([['SUBJECT', subject]]));
                });
            });
        });
    }
    getEmailBySubjectAndBody(subject, orderNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.openBox('INBOX', (err) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(this.searchForEmail([['SUBJECT', subject], ['BODY', orderNumber]]));
                });
            });
        });
    }
    searchForEmail(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.search(parameters, (err, uids) => {
                    if (err) {
                        return reject(err);
                    }
                    else if (!uids.length) {
                        return reject('No emails found');
                    }
                    else if (uids.length > 1) {
                        return reject(`${uids.length} emails found`);
                    }
                    return resolve(this.getEmailBody(uids[0]));
                });
            });
        });
    }
    getEmailBody(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const fetch = this.connection.fetch(uid, {
                    bodies: 'TEXT'
                });
                let response;
                fetch.on('message', (msg, seqno) => {
                    const prefix = '(#' + seqno + ') ';
                    msg.on('body', (stream) => {
                        let buffer = '';
                        stream.on('data', (chunk) => {
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', () => {
                            response = cheerio.load(quoted_printable_1.decode(buffer));
                        });
                    });
                    msg.once('end', () => {
                        console.log(`- Finished downloading e-mail ${prefix}`);
                    });
                });
                fetch.once('error', reject);
                fetch.once('end', () => {
                    resolve(response);
                });
            });
        });
    }
    downloadLinkRedirectsToVST(driver, downloadLink) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield driver.get(downloadLink);
                yield driver.wait(selenium_webdriver_1.until.urlContains('https://full-bookshelf.vitalsource.com'), 5 * 1000);
                const url = yield driver.getCurrentUrl();
                chai_1.assert.isTrue(/^https:\/\/full-bookshelf.vitalsource.com/.test(url));
                return;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.EMailPage = EMailPage;
//# sourceMappingURL=eMailPage.js.map