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
    readyState: number;
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
    public nextEventSourceToReturn: EventSourceMock = undefined;

    createEventSource(url: string): EventSource {
        let anEventSource: EventSource = undefined;
        if (this.nextEventSourceToReturn !== undefined) {
            anEventSource = this.nextEventSourceToReturn;
            this.nextEventSourceToReturn = undefined;
        } else {
            anEventSource = new EventSourceMock(url);
        }
        return anEventSource;
    }
}

export class EventMock {
    data: string;
    readonly type: string;
    readonly bubbles: boolean = true;
    readonly cancelable: boolean = true;
    readonly cancelBubble: boolean = true;
    readonly composed: boolean = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly currentTarget: any = undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly target:any = undefined;
    readonly defaultPrevented:boolean = true;
    readonly isTrusted:boolean = true;
    readonly returnValue:boolean = true;
    readonly eventPhase = 0; // EVENT.NONE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly srcElement:any = undefined;
    readonly timeStamp = 23;

    readonly NONE = 0;
    readonly CAPTURING_PHASE = 1;
    readonly AT_TARGET = 2;
    readonly BUBBLING_PHASE = 3;

    constructor(type: string) {
        this.type = type;
    }

    public composedPath() : EventTarget[] {
        return [];
    }

    public initEvent(type:string,aBool:boolean, anotherBool:boolean): void {
        return;
    }

    public preventDefault(): void {
        return;
    }
    public stopImmediatePropagation(): void {
        return;
    }
    public stopPropagation(): void {
        return;
    }
} 