import { IRequest, RequestState } from './IRequest';
import { IWaitTime } from './IWaitTime';

export class RequestProcessor {
    private readonly endpoint: string;
    private readonly openRequests: Array<IRequest> = new Array<IRequest>();
    private runningRequest: IRequest;
    public timeOutId: NodeJS.Timeout = undefined;
    private readonly processAgain: IWaitTime;
    private readonly waitForAsynchronuousRequest: IWaitTime;

    constructor(endpoint: string, processAgain: IWaitTime, waitForAsynchronuousRequest: IWaitTime) {
        this.endpoint = endpoint;
        this.runningRequest = undefined;
        this.processAgain = processAgain;
        this.waitForAsynchronuousRequest = waitForAsynchronuousRequest;
    }

    public hasPendingRequests(): boolean {
        return this.openRequests.length > 0;
    }

    public process(aRequest: IRequest): void {
        this.openRequests.push(aRequest);
        this.processOpenRequests();
    }

    public processOpenRequests(): void {
        if (this.timeOutId !== undefined) {
            return;
        }
        let processOpenRequests = true;

        if (this.runningRequest !== undefined) {
            processOpenRequests = this.checkOngoingAsynchronuousRequest();
        }
        if (processOpenRequests) {
            this.processOpenRequestQueue();
        }
    }

    private checkOngoingAsynchronuousRequest(): boolean {
        if (this.runningRequest.state === RequestState.ERROR) {
            this.runningRequest = undefined;
            this.processAgain.increaseWaitTime();
            this.rerunProcessOpenRequests(this.processAgain.getWaitTimeMilliseconds());
            return false;
        } else if (this.runningRequest.state === RequestState.FINISHED) {
            this.runningRequest = undefined;
            this.processAgain.reset();
            this.waitForAsynchronuousRequest.reset();
            this.openRequests.shift();
            return true;
        } else { // still ongoing
            this.waitForAsynchronuousRequest.increaseWaitTime();
            this.rerunProcessOpenRequests(this.waitForAsynchronuousRequest.getWaitTimeMilliseconds());
            return false;
        }
    }

    private processOpenRequestQueue(): void {
        try {
            while (this.openRequests.length > 0) {
                const aRequest = this.openRequests[0];
                if (aRequest.isSynchronuous) {
                    aRequest.execute(this.endpoint);
                    this.openRequests.shift();
                } else {
                    this.runningRequest = aRequest;
                    this.runningRequest.execute(this.endpoint);
                    this.waitForAsynchronuousRequest.reset();
                    this.rerunProcessOpenRequests(this.waitForAsynchronuousRequest.getWaitTimeMilliseconds());
                    return;
                }
            }
        } catch (error) {
            this.processAgain.increaseWaitTime();
            this.rerunProcessOpenRequests(this.processAgain.getWaitTimeMilliseconds());
        }
    }

    private rerunProcessOpenRequests(millisecondsToWait: number) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const aRequestProcessor = this;
        this.timeOutId = setTimeout(() => {
            clearTimeout(aRequestProcessor.timeOutId);
            aRequestProcessor.timeOutId = undefined;
            aRequestProcessor.processOpenRequests()
        },
            millisecondsToWait);
    }
}