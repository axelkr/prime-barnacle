import { IRequest, RequestState } from './IRequest';

export class RequestProcessor {
    private readonly endpoint: string;
    private readonly openRequests: Array<IRequest> = new Array<IRequest>();
    private runningRequest: IRequest;
    public timeOutId: NodeJS.Timeout = undefined;
    private readonly processAgainAfterMilliseconds = 500;
    private readonly waitForAsynchronuousRequestMilliseconds = 250;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.runningRequest = undefined;
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
            this.rerunProcessOpenRequests(this.processAgainAfterMilliseconds);
            return false;
        } else if (this.runningRequest.state === RequestState.FINISHED) {
            this.runningRequest = undefined;
            this.openRequests.shift();
            return true;
        } else { // still ongoing
            this.rerunProcessOpenRequests(this.waitForAsynchronuousRequestMilliseconds);
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
                    this.rerunProcessOpenRequests(this.waitForAsynchronuousRequestMilliseconds);
                    return;
                }
            }
        } catch (error) {
            this.rerunProcessOpenRequests(this.processAgainAfterMilliseconds);
        }
    }

    private rerunProcessOpenRequests(millisecondsToWait: number) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const aRequestProcessor = this;
        this.timeOutId = setTimeout(() => {
            aRequestProcessor.timeOutId = undefined;
            aRequestProcessor.processOpenRequests()
        },
            millisecondsToWait);
    }
}