import { ObjectEventRequest } from './ObjectEventRequest';
import { ObjectEvent } from 'choicest-barnacle';
import { Subject } from 'rxjs';
import { IHTTPClient } from './IHTTPClient';

export class PublishObjectEventRequest extends ObjectEventRequest {
    private readonly toPublish: ObjectEvent;

    constructor(anObjectEvent: ObjectEvent, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient, publishTo, true);
        this.toPublish = anObjectEvent;
    }

    execute(endpoint: string): void {
        const asJSON = this.mappingService.toObjectEventREST(this.toPublish);
        this.httpClient.postJson(endpoint + '/objectEvent', asJSON);
    }
}