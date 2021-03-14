import { IHTTPClient } from './IHTTPClient';
import { ObjectEventRequest } from './ObjectEventRequest';
import { Observable, Subject } from 'rxjs';
import { ObjectEvent, ObjectEventREST, Topic } from 'choicest-barnacle';
import { RequestState } from './IRequest';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: Topic;

    constructor(newTopic: Topic, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        super(httpClient, publishTo, false);
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisRequest: ObjectEventRequest = this;
        this.state = RequestState.RUNNING;
        const backendObjectEvents: Observable<ObjectEventREST> = this.httpClient.get(endpoint + `/objectEvent?topic=` + this.newTopic.id);
        backendObjectEvents.subscribe({
            next(value: ObjectEventREST) {
                thisRequest.publishTo.next(ObjectEventRequest.deserializeSingleEvent(value));
            },
            error() { thisRequest.state = RequestState.ERROR },
            complete() { thisRequest.state = RequestState.FINISHED }
        });
    }
}
