import { IHTTPClient } from './IHTTPClient';
import { AbstractRequest } from './AbstractRequest';
import { Observable, Subject } from 'rxjs';
import { Topic, TopicREST } from 'choicest-barnacle';
import { RequestState } from './IRequest';

export class GetAllTopicsRequest extends AbstractRequest<Topic> {
    constructor(httpClient: IHTTPClient, publishTo: Subject<Topic>) {
        super(httpClient, publishTo, false);
    }

    execute(endpoint: string): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisRequest: AbstractRequest<Topic> = this;
        this.state = RequestState.RUNNING;
        const backendTopics: Observable<Topic> = this.httpClient.get(endpoint + `/topic`);
        backendTopics.subscribe({
            next(value: TopicREST) {
                thisRequest.publishTo.next(AbstractRequest.deserializeTopic(value));
            },
            error() { thisRequest.state = RequestState.ERROR },
            complete() { thisRequest.state = RequestState.FINISHED }
        });
    }
}
