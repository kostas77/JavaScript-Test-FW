import { WebDriver } from 'selenium-webdriver';

export class WhatIsThisPage {
    public pageUrl: string;
    public pageTitle: string;
    public mainTextLocator: string;

    constructor() {
        this.pageUrl = 'https://service.elsevier.com/app/answers/detail/a_id/9053/supporthub/ecommerce';
        this.pageTitle = 'A guide to shopping on Elsevier.com - Ecommerce Support';
        this.mainTextLocator = '.border .large-12';
    }

    public async visitPage (driver: WebDriver): Promise<void> {
        return await driver.get(this.pageUrl);
    }
}
