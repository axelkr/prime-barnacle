import { Topic, MappingService, TopicREST } from 'choicest-barnacle';
import { IHTTPClient } from './IHTTPClient';
import { Subject } from 'rxjs';
import { IRequest, RequestState } from './IRequest';

export abstract class TopicRequest implements IRequest {
    public readonly isSynchronuous: boolean;
    public state: RequestState = RequestState.WAITING;
    
    protected readonly httpClient: IHTTPClient;
    protected readonly mappingService = new MappingService();
    public readonly publishTo: Subject<Topic>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<Topic>, isSynchronuous: boolean) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
        this.isSynchronuous = isSynchronuous;
    }

    abstract execute(endpoint: string): void;

    public static deserializeSingleTopic(json: TopicREST): Topic {
        const mappingService = new MappingService();
        return mappingService.fromTopicREST(json);
    }
}
