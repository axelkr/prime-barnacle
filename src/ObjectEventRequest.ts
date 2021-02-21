import { ObjectEvent } from 'happy-barnacle';
import { IHTTPClient,ObjectEventBackEnd } from './IHTTPClient';
import { Subject } from 'rxjs';

export abstract class ObjectEventRequest {
    protected readonly httpClient: IHTTPClient;
    protected readonly publishTo: Subject<ObjectEvent>;

    constructor(httpClient: IHTTPClient, publishTo: Subject<ObjectEvent>) {
        this.httpClient = httpClient;
        this.publishTo = publishTo;
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
