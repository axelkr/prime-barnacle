import { Logger } from 'sitka';

export class Client {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getLogger({ name: this.constructor.name });
    }
}