import { ObjectEventRequest } from './ObjectEventRequest';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: string;

    constructor(newTopic: string) {
        super();
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        return;
    }
}