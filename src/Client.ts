import { Logger } from 'sitka';
import { Observable, Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class Client {
    private logger: Logger;
    public readonly publishedObjectEvents: Observable<ObjectEvent>;
    private readonly objectEventSubject: Subject<ObjectEvent>; 
    private readonly endpoint:string;

    constructor(endpoint: string) {
        this.logger = Logger.getLogger({ name: this.constructor.name });
        this.objectEventSubject = new Subject<ObjectEvent>();
        this.publishedObjectEvents = this.objectEventSubject;
        this.endpoint = endpoint;
    }

    private publish(anEvent: ObjectEvent) {
        this.logger.debug('publishing an event');
        this.objectEventSubject.next(anEvent);
    }
}