import { IHTTPClient } from './IHTTPClient';
import { AbstractRequest } from './AbstractRequest';
import { Observable, Subject } from 'rxjs';
import { ObjectEvent, ObjectEventREST, Topic } from 'choicest-barnacle';
import { RequestState } from './IRequest';

export enum ObjectType {
    StateModel = 'StateModel',
    Context = 'Context',
    Project = 'Project',
    KanbanCard = 'KanbanCard',
    Task = 'Task',
}

export class SwitchToTopicRequest extends AbstractRequest<ObjectEvent> {
    private readonly newTopic: Topic;
    private readonly objectType: ObjectType;
    private readonly limit = 50;

    constructor(newTopic: Topic, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>, objectType: ObjectType) {
        super(httpClient, publishTo, false);
        this.newTopic = newTopic;
        this.objectType = objectType;
    }

    execute(endpoint: string): void {
        this.state = RequestState.RUNNING;
        this.executePage(endpoint, 0, this.limit);
    }

    public executePage(endpoint: string, start: number, limit: number): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisRequest: SwitchToTopicRequest = this;
        let urlParameters = '';
        urlParameters = this.extendUrlParameters(urlParameters, 'topic', this.newTopic.id);
        urlParameters = this.extendUrlParameters(urlParameters, 'objectType', this.objectType);
        urlParameters = this.extendUrlParameters(urlParameters, 'start', start.toString());
        urlParameters = this.extendUrlParameters(urlParameters, 'limit', limit.toString());

        const backendObjectEvents: Observable<ObjectEventREST> = this.httpClient.get(endpoint + '/objectEvent' + urlParameters);
        let numberObjects = 0;
        backendObjectEvents.subscribe({
            next(value: ObjectEventREST) {
                numberObjects = 1 + numberObjects;
                thisRequest.publishTo.next(AbstractRequest.deserializeObjectEvent(value));
            },
            error() { thisRequest.state = RequestState.ERROR },
            complete() {
                if (numberObjects === 0) {
                    thisRequest.state = RequestState.FINISHED;
                } else {
                    thisRequest.executePage(endpoint, start + limit, limit);
                }
            }
        });
    }

    private extendUrlParameters(urlParameters: string, key: string, value: string): string {
        if (urlParameters.length === 0) {
            urlParameters = '?'
        } else {
            urlParameters = urlParameters + '&';
        }
        return urlParameters + key + '=' + value;
    }
}
