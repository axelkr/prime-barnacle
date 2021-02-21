import { ObjectEvent } from 'happy-barnacle';

export type ObjectEventBackEnd = {
    topic: string;
    time: string;
    id: number;
    eventType: string;
    object: string;
    objectType: string;
    payload: string;
};

export abstract class ObjectEventRequest {
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

    protected deserializeServerObjectEvent(jsonBackend: ObjectEventBackEnd[]): ObjectEvent[] {
        const results: ObjectEvent[] = [];
        jsonBackend.forEach(json => {
            results.push(ObjectEventRequest.deserializeSingleEvent(json));
        });
        return results;
    }
}
