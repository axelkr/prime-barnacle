import { ObjectEventRequest } from './ObjectEventRequest';
import { ObjectEvent } from 'happy-barnacle';

export class PublishObjectEventRequest extends ObjectEventRequest {
    private readonly toPublish: ObjectEvent;

    constructor(anObjectEvent: ObjectEvent) {
        super();
        this.toPublish = anObjectEvent;
    }

    execute(endpoint: string): void {
        const asJSON = {
            topic: this.toPublish.topic,
            eventType: this.toPublish.eventType,
            object: this.toPublish.object,
            objectType: this.toPublish.objectType,
            payload: JSON.stringify(Array.from(this.toPublish.payload.entries()))
        };

        // TODO: Track state ob request in a status at ObjectEventRequest, then the processor knows the status and how to proceed.
        //const headers = { 'content-type': 'application/json' };
        //this.httpClient.post(this.endpoint + '/objectEvent', JSON.stringify(asJSON), { headers }).subscribe();
    }
}