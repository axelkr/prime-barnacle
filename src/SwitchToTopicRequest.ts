import { IHTTPClient, ObjectEventBackEnd } from './IHTTPClient';
import { ObjectEventRequest } from './ObjectEventRequest';
import { Observable, Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: string;

    constructor(newTopic: string, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient, publishTo, false);
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        this.state = ObjectEventRequest.RUNNING;
        const backendObjectEvents: Observable<ObjectEventBackEnd> = this.httpClient.get(endpoint + `/objectEvent?topic=` + this.newTopic);
        backendObjectEvents.subscribe(((value: ObjectEventBackEnd) => {
            this.publishTo.next(ObjectEventRequest.deserializeSingleEvent(value));
        }), () => { this.state = ObjectEventRequest.ERROR },
            () => { this.state = ObjectEventRequest.FINISHED })
    }
}
