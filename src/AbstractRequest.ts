import { Topic, MappingService, TopicREST, ObjectEventREST, ObjectEvent } from 'choicest-barnacle';
import { IHTTPClient } from './IHTTPClient';
import { Subject } from 'rxjs';
import { IRequest, RequestState } from './IRequest';

export abstract class AbstractRequest<T> implements IRequest {
    public readonly isSynchronuous: boolean;
    public state: RequestState = RequestState.WAITING;

    protected readonly httpClient: IHTTPClient;
    protected readonly mappingService = new MappingService();
    public readonly publishTo: Subject<T>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<T>, isSynchronuous: boolean) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
        this.isSynchronuous = isSynchronuous;
    }

    abstract execute(endpoint: string): void;

    public static deserializeTopic(json: TopicREST): Topic {
        const mappingService = new MappingService();
        return mappingService.fromTopicREST(json);
    }

    public static deserializeObjectEvent(json: ObjectEventREST): ObjectEvent {
        const mappingService = new MappingService();
        return mappingService.fromObjectEventREST(json);
    }
}
