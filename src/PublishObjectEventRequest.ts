import { ObjectEventRequest } from './ObjectEventRequest';
import { ObjectEvent } from './ObjectEvent';
import { Subject } from 'rxjs';
import { IHTTPClient } from './IHTTPClient';

export class PublishObjectEventRequest extends ObjectEventRequest {
    private readonly toPublish: ObjectEvent;

    constructor(anObjectEvent: ObjectEvent, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient,publishTo,true);
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
        this.httpClient.postJson(endpoint + '/objectEvent',asJSON);
    }
}