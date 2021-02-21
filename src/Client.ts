import { Observable, Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';
import { PublishObjectEventRequest } from './PublishObjectEventRequest';
import { SwitchToTopicRequest } from './SwitchToTopicRequest';
import { RequestProcessor } from './RequestProcessor';
import { NewObjectEventStream} from './NewObjectEventStream';
import { IEventSourceFactory } from './IEventSourceFactory';

export class Client {
    public readonly publishedObjectEvents: Observable<ObjectEvent>;
    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly processor: RequestProcessor;
    private readonly newObjectEventsStream: NewObjectEventStream;

    constructor(endpoint: string, eventSourceFactory:IEventSourceFactory ) {
        this.objectEventSubject = new Subject<ObjectEvent>();
        this.publishedObjectEvents = this.objectEventSubject;
        this.processor = new RequestProcessor(this.objectEventSubject, endpoint);
        this.newObjectEventsStream = new NewObjectEventStream(this.objectEventSubject,endpoint, eventSourceFactory);
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