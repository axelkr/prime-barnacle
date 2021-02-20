import { ObjectEventRequest } from './ObjectEventRequest';
import { ObjectEvent } from 'happy-barnacle';

export class PublishObjectEventRequest extends ObjectEventRequest {
    private readonly toPublish: ObjectEvent;

    constructor(anObjectEvent: ObjectEvent) {
        super();
        this.toPublish = anObjectEvent;
    }

    execute(endpoint: string): void {
        return;
    }
}