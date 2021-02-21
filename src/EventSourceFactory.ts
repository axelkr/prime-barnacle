import { IEventSourceFactory } from "./IEventSourceFactory";

export class EventSourceFactory implements IEventSourceFactory {
    public createEventSource(url:string): EventSource {
        return new EventSource(url);
    }
}