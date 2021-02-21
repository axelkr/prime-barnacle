export interface IEventSourceFactory {
    createEventSource(url:string): EventSource;
}