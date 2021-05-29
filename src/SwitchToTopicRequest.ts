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
    private readonly objectType: ObjectType

    constructor(newTopic: Topic, httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>, objectType: ObjectType) {
        super(httpClient, publishTo, false);
        this.newTopic = newTopic;
        this.objectType = objectType;
    }

    execute(endpoint: string): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisRequest: AbstractRequest<ObjectEvent> = this;
        this.state = RequestState.RUNNING;
        const backendObjectEvents: Observable<ObjectEventREST> = this.httpClient.get(endpoint + `/objectEvent?topic=` + this.newTopic.id + '&objectType=' + this.objectType);
        backendObjectEvents.subscribe({
            next(value: ObjectEventREST) {
                thisRequest.publishTo.next(AbstractRequest.deserializeObjectEvent(value));
            },
            error() { thisRequest.state = RequestState.ERROR },
            complete() { thisRequest.state = RequestState.FINISHED }
        });
    }
}
