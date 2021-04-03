import { Observable, Subject } from 'rxjs';
import { ObjectEvent, Topic } from 'choicest-barnacle';

import { RequestProcessor } from './RequestProcessor';
import { NewObjectEventStream } from './NewObjectEventStream';
import { IEventSourceFactory } from './IEventSourceFactory';
import { IHTTPClient } from './IHTTPClient';
import { WaitTime } from './WaitTime';

import { PublishObjectEventRequest } from './PublishObjectEventRequest';
import { PublishTopicRequest } from './PublishTopicRequest';
import { SwitchToTopicRequest } from './SwitchToTopicRequest';
import { GetAllTopicsRequest } from './GetAllTopicsRequest';

export class Client {
    public readonly publishedObjectEvents: Observable<ObjectEvent>;
    public readonly publishedTopics: Observable<Topic>;

    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly topicSubject: Subject<Topic>;
    private readonly processor: RequestProcessor;
    private readonly newObjectEventsStream: NewObjectEventStream;
    private readonly httpClient: IHTTPClient;

    constructor(endpoint: string, eventSourceFactory: IEventSourceFactory, httpClient: IHTTPClient) {
        this.objectEventSubject = new Subject<ObjectEvent>();
        this.publishedObjectEvents = this.objectEventSubject;
        this.topicSubject = new Subject<Topic>();
        this.publishedTopics = this.topicSubject;
        this.httpClient = httpClient;

        const processAgain: WaitTime = new WaitTime(100, 100, 1000);
        const waitForAsynchronuousRequest: WaitTime = new WaitTime(50, 50, 500);
        this.processor = new RequestProcessor(endpoint, processAgain, waitForAsynchronuousRequest);

        this.newObjectEventsStream = new NewObjectEventStream(this.objectEventSubject, endpoint, eventSourceFactory);
    }

    public storeObjectEvent(anObjectEvent: ObjectEvent): void {
        const request = new PublishObjectEventRequest(anObjectEvent, this.httpClient, this.objectEventSubject);
        this.processor.process(request);
    }

    public switchToTopic(topic: Topic): void {
        const request = new SwitchToTopicRequest(topic, this.httpClient, this.objectEventSubject);
        this.processor.process(request);
    }

    public storeTopic(aTopic: Topic): void {
        const request = new PublishTopicRequest(aTopic, this.httpClient, this.topicSubject);
        this.processor.process(request);
    }

    public getAllTopics(): void {
        const request = new GetAllTopicsRequest(this.httpClient, this.topicSubject);
        this.processor.process(request);
    }

    public hasPendingRequests(): boolean {
        return this.processor.hasPendingRequests();
    }

    public disconnect(): void {
        this.newObjectEventsStream.disconnect();
    }
}