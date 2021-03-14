import { ObjectEvent, MappingService, ObjectEventREST } from 'choicest-barnacle';
import { IHTTPClient } from './IHTTPClient';
import { IRequest, RequestState } from './IRequest';
import { Subject } from 'rxjs';

export abstract class ObjectEventRequest implements IRequest {
    public readonly isSynchronuous: boolean;
    public state: RequestState = RequestState.WAITING;
    
    protected readonly httpClient: IHTTPClient;
    protected readonly mappingService = new MappingService();
    public readonly publishTo: Subject<ObjectEvent>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>, isSynchronuous: boolean) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
        this.isSynchronuous = isSynchronuous;
    }

    abstract execute(endpoint: string): void;

    public static deserializeSingleEvent(json: ObjectEventREST): ObjectEvent {
        const mappingService = new MappingService();
        return mappingService.fromObjectEventREST(json);
    }
}
