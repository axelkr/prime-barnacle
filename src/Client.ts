import { Observable, Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';
import { PublishObjectEventRequest } from './PublishObjectEventRequest';
import { SwitchToTopicRequest } from './SwitchToTopicRequest';
import { RequestProcessor } from './RequestProcessor';

export class Client {
    public readonly publishedObjectEvents: Observable<ObjectEvent>;
    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly processor: RequestProcessor;

    constructor(endpoint: string) {
        this.objectEventSubject = new Subject<ObjectEvent>();
        this.publishedObjectEvents = this.objectEventSubject;
        this.processor = new RequestProcessor(this.objectEventSubject, endpoint);
    }

    public storeObjectEvent(anObjectEvent: ObjectEvent): void {
        const request = new PublishObjectEventRequest(anObjectEvent);
        this.processor.process(request);
    }

    public switchToTopic(topic: string): void {
        const request = new SwitchToTopicRequest(topic);
        this.processor.process(request);
    }
}