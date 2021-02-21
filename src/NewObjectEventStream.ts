import { ObjectEventRequest } from './ObjectEventRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class NewObjectEventStream {
  private readonly objectEventSubject: Subject<ObjectEvent>;
  private readonly endpoint: string;
  private readonly reconnectAfterMilliseconds = 500;
  private timeOutId: NodeJS.Timeout;
  private events: EventSource;

  constructor(publishTo: Subject<ObjectEvent>, endpoint: string) {
    this.objectEventSubject = publishTo;
    this.endpoint = endpoint;
    this.reconnect();
  }

  private setupEventStreamForNewObjectEvents(publishTo: Subject<ObjectEvent>, notifyAboutError: NewObjectEventStream) {
    this.events = new EventSource(this.endpoint + '/newObjectEvents');
    this.events.onmessage = event => {
      const asObjectEvent = ObjectEventRequest.deserializeSingleEvent(JSON.parse(event.data));
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
    this.timeOutId = setTimeout(()=>this.reconnect(),this.reconnectAfterMilliseconds);
  }

  public reconnect(): void {
    if (this.timeOutId !== undefined) {
      this.timeOutId = undefined;
    }
    this.setupEventStreamForNewObjectEvents(this.objectEventSubject, this);
  }
}