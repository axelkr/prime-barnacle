import { AbstractRequest } from './AbstractRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'choicest-barnacle';
import { IEventSourceFactory } from './IEventSourceFactory';

export class NewObjectEventStream {
  private readonly objectEventSubject: Subject<ObjectEvent>;
  private readonly endpoint: string;
  private readonly reconnectAfterMilliseconds = 500;
  private timeOutId: NodeJS.Timeout;
  private events: EventSource;
  private readonly eventSourceFactory: IEventSourceFactory;

  constructor(publishTo: Subject<ObjectEvent>, endpoint: string, eventSourceFactory: IEventSourceFactory) {
    this.objectEventSubject = publishTo;
    this.endpoint = endpoint;
    this.eventSourceFactory = eventSourceFactory;
    this.reconnect();
  }

  private setupEventStreamForNewObjectEvents(publishTo: Subject<ObjectEvent>, notifyAboutError: NewObjectEventStream) {
    if (this.events !== undefined) {
      this.events.onmessage = null;
      this.events.onerror = null;
    }
    try {
      this.events = this.eventSourceFactory.createEventSource(this.endpoint + '/newObjectEvents');
    } catch (error) {
      this.connectionFailed();
      return;
    }
    this.events.onmessage = event => {
      const asObjectEvent = AbstractRequest.deserializeObjectEvent(JSON.parse(event.data));
      publishTo.next(asObjectEvent);
    }
    this.events.onerror = () => {
      notifyAboutError.connectionFailed();
    }
  }

  public connectionFailed(): void {
    if (this.timeOutId !== undefined) {
      return;
    }
    this.timeOutId = setTimeout(() => this.reconnect(), this.reconnectAfterMilliseconds);
  }

  public reconnect(): void {
    if (this.timeOutId !== undefined) {
      clearTimeout(this.timeOutId);
      this.timeOutId = undefined;
    }
    this.setupEventStreamForNewObjectEvents(this.objectEventSubject, this);
  }
}