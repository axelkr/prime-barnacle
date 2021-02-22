import { ObjectEventRequest } from './ObjectEventRequest';
import { Subject } from 'rxjs';
import { ObjectEvent } from 'happy-barnacle';

export class RequestProcessor {
    private readonly objectEventSubject: Subject<ObjectEvent>;
    private readonly endpoint: string;
    private readonly openRequests: Array<ObjectEventRequest> = new Array<ObjectEventRequest>();
    private runningRequest: ObjectEventRequest;
    public timeOutId: NodeJS.Timeout = undefined;
    private readonly processAgainAfterMilliseconds = 500;
    private readonly waitForAsynchronuousRequestMilliseconds = 50;

    constructor(publishTo: Subject<ObjectEvent>, endpoint: string) {
        this.objectEventSubject = publishTo;
        this.endpoint = endpoint;
        this.runningRequest = undefined;
    }

    public process(aRequest: ObjectEventRequest): void {
        this.openRequests.push(aRequest);
        this.processOpenRequests();
    }

    public processOpenRequests(): void {

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const aRequestProcessor = this;
        if (this.timeOutId !== undefined) {
            return;
        }
        // check with ongoing asynchronuous request
        if (this.runningRequest != undefined) {
            if (this.runningRequest.state === ObjectEventRequest.ERROR) {
                this.runningRequest = undefined;
                this.timeOutId = setTimeout(() => { aRequestProcessor.timeOutId = undefined; aRequestProcessor.processOpenRequests() }, this.processAgainAfterMilliseconds);
                return;
            } else if (this.runningRequest.state === ObjectEventRequest.FINISHED) {
                this.runningRequest = undefined;
                this.openRequests.shift();
            } else {
                // still ongoing
                this.timeOutId = setTimeout(() => { aRequestProcessor.timeOutId = undefined; aRequestProcessor.processOpenRequests() }, this.waitForAsynchronuousRequestMilliseconds);
                return;
            }
        }
        //process next request
        try {
            while (this.openRequests.length > 0) {
                const aRequest = this.openRequests[0];
                if (aRequest.isSynchronuous) {
                    aRequest.execute(this.endpoint);
                    this.openRequests.shift();
                } else {
                    this.runningRequest = aRequest;
                    this.runningRequest.execute(this.endpoint);
                    this.timeOutId = setTimeout(() => { aRequestProcessor.timeOutId = undefined; aRequestProcessor.processOpenRequests() }, this.waitForAsynchronuousRequestMilliseconds);
                }
            }
        } catch (error) {
            this.timeOutId = setTimeout(() => { aRequestProcessor.timeOutId = undefined; aRequestProcessor.processOpenRequests() }, this.processAgainAfterMilliseconds);
        }
    }
}