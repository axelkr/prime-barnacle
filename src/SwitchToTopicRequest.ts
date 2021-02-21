import { IHTTPClient, ObjectEventBackEnd } from './IHTTPClient';
import { ObjectEventRequest } from './ObjectEventRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: string;

    constructor(newTopic: string, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient, publishTo);
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        const backendObjectEvents: ObjectEventBackEnd[] = this.httpClient.get(endpoint + `/objectEvent?topic=` + this.newTopic);
        backendObjectEvents.forEach(aObject => {
            this.publishTo.next(ObjectEventRequest.deserializeSingleEvent(aObject));
        });
    }
}
