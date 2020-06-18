import { EMailPage } from '../pages/eMailPage';
import { After, Before } from 'cucumber';
import * as Imap from 'imap';

export function GmailHook(): void {
    let gmail: EMailPage;

    Before({ tags: '@email' }, async function() {
        const config: Imap.Config = {
            user: 'test.elsevier.io@gmail.com',
            password: 'Sp00n123'
        };
        gmail = new EMailPage(config);
        await gmail.init();
    });

    After({ tags: '@email' }, async function() {
        gmail.close();
    });

    Before({ tags: '@email' }, async function() {
        this.gmail = gmail;
    });
}
