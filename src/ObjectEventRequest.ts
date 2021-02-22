import { ObjectEvent } from 'happy-barnacle';
import { IHTTPClient,ObjectEventBackEnd } from './IHTTPClient';
import { Subject } from 'rxjs';

export abstract class ObjectEventRequest {
    public static readonly WAITING = 0;
    public static readonly RUNNING = 1;
    public static readonly ERROR = 2;
    public static readonly FINISHED = 3;
    public readonly isSynchronuous: boolean;
    public state: number = ObjectEventRequest.WAITING;
    protected readonly httpClient: IHTTPClient;
    protected readonly publishTo: Subject<ObjectEvent>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>, isSynchronuous: boolean) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
        this.isSynchronuous = isSynchronuous;
    }

    abstract execute(endpoint: string): void;

    public static deserializeSingleEvent(json: ObjectEventBackEnd): ObjectEvent {
        return {
            topic: json.topic,
            payload: new Map<string, string>(JSON.parse(json.payload)),
            time: new Date(json.time),
            id: json.id,
            eventType: json.eventType,
            object: json.object,
            objectType: json.objectType
        };
    }
}
