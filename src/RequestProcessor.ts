import { ObjectEventRequest } from './ObjectEventRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class RequestProcessor {
    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly endpoint: string;

    constructor(publishTo: Subject<ObjectEvent>, endpoint: string) {
        this.objectEventSubject = publishTo;
        this.endpoint = endpoint;
    }

    public process(aRequest: ObjectEventRequest): void {
        return;
    }
}