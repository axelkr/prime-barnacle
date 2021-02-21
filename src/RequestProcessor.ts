import { ObjectEventRequest } from './ObjectEventRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class RequestProcessor {
    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly endpoint: string;
    private readonly openRequests: Array<ObjectEventRequest> = new Array<ObjectEventRequest>();
    public timeOutId: NodeJS.Timeout = undefined;
    private readonly processAgainAfterMilliseconds = 500;

    constructor(publishTo: Subject<ObjectEvent>, endpoint: string) {
        this.objectEventSubject = publishTo;
        this.endpoint = endpoint;
    }

    public process(aRequest: ObjectEventRequest): void {
        this.openRequests.push(aRequest);
        this.processOpenRequests();
    }

    public processOpenRequests(): void {
        if (this.timeOutId !== undefined) {
            return;
        }
        try {
            console.log("processing open requests...");
            while (this.openRequests.length > 0) {
                const aRequest = this.openRequests[0];
                aRequest.execute(this.endpoint);
                this.openRequests.shift();
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const aRequestProcessor = this;
            this.timeOutId = setTimeout(() => { aRequestProcessor.timeOutId = undefined; aRequestProcessor.processOpenRequests() }, this.processAgainAfterMilliseconds);
        }
    }
}