import { IHTTPClient } from './IHTTPClient';
import { ObjectEventRequest } from './ObjectEventRequest';
import { Observable, Subject } from 'rxjs';
import { ObjectEvent, ObjectEventREST } from 'choicest-barnacle';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: string;

    constructor(newTopic: string, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient, publishTo, false);
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisRequest: ObjectEventRequest = this;
        this.state = ObjectEventRequest.RUNNING;
        const backendObjectEvents: Observable<ObjectEventREST> = this.httpClient.get(endpoint + `/objectEvent?topic=` + this.newTopic);
        backendObjectEvents.subscribe({
            next(value: ObjectEventREST) {
                thisRequest.publishTo.next(ObjectEventRequest.deserializeSingleEvent(value));
            },
            error() { thisRequest.state = ObjectEventRequest.ERROR },
            complete() { thisRequest.state = ObjectEventRequest.FINISHED }
        });
    }
}
