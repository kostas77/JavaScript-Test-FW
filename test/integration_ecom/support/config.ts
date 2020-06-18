export class Config {
    public testTag: string;

    constructor() {
        this.testTag = process.env.test_tag;
    }

}
