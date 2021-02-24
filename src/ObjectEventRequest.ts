import { ObjectEvent, ObjectEventMappingService, ObjectEventREST } from 'choicest-barnacle';
import { IHTTPClient } from './IHTTPClient';
import { Subject } from 'rxjs';

export abstract class ObjectEventRequest {
    public static readonly WAITING = 0;
    public static readonly RUNNING = 1;
    public static readonly ERROR = 2;
    public static readonly FINISHED = 3;
    public readonly isSynchronuous: boolean;
    public state: number = ObjectEventRequest.WAITING;
    protected readonly httpClient: IHTTPClient;
    public readonly publishTo: Subject<ObjectEvent>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>, isSynchronuous: boolean) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
        this.isSynchronuous = isSynchronuous;
    }

    abstract execute(endpoint: string): void;

    public static deserializeSingleEvent(json: ObjectEventREST): ObjectEvent {
        const mappingService = new ObjectEventMappingService();
        return mappingService.fromObjectEventREST(json);
    }
}
