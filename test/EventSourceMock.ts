/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEventSourceFactory } from '../src/IEventSourceFactory';

export class EventSourceMock {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSED = 2;
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly url: string;
    readonly readyState: number;
    readonly withCredentials: boolean;


    constructor(connectTo: string) {
        this.url = connectTo;
        this.CONNECTING = EventSourceMock.CONNECTING;
        this.OPEN = EventSourceMock.OPEN;
        this.CLOSED = EventSourceMock.CLOSED;
        this.readyState = this.CONNECTING;
        this.withCredentials = false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onopen: (evt: Event) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onmessage: (evt: Event) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onerror: (evt: Event) => any;
    addEventListener(type: string, listener: EventListener): void {
        return;
    }
    dispatchEvent(evt: Event): boolean {
        return true;
    }
    removeEventListener(type: string, listener?: EventListener): void {
        return;
    }
    public close(): void { return; }
}

export class EventSourceMockFactory implements IEventSourceFactory {
    createEventSource(url: string): EventSource {
        return new EventSourceMock(url);
    }

}