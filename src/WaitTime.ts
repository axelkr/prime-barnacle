import { IWaitTime } from "./IWaitTime";

export class WaitTime implements IWaitTime {
    private readonly initialWaitTimeMilliseconds: number;
    private readonly increaseWaitTimeMilliseconds: number;
    private readonly maximalWaitTimeMilliseconds: number;
    private readonly increaseReallyAfterNRequestedIncreases: number = 2;
    private requestedIncreases = 0;
    private currentWaitTime: number;

    constructor(initialWaitTimeMilliseconds:number,increaseWaitTimeMilliseconds:number, maximalWaitTimeMilliseconds:number) {
        this.initialWaitTimeMilliseconds = initialWaitTimeMilliseconds;
        this.increaseWaitTimeMilliseconds = increaseWaitTimeMilliseconds;
        this.maximalWaitTimeMilliseconds = maximalWaitTimeMilliseconds;
        this.reset();
    }

    public getWaitTimeMilliseconds(): number {
        return this.currentWaitTime;
    }

    public reset(): void {
        this.currentWaitTime = this.initialWaitTimeMilliseconds;
        this.requestedIncreases = 0;
    }

    public increaseWaitTime(): void {
        this.requestedIncreases = this.requestedIncreases + 1;
        if ( this.requestedIncreases < this.increaseReallyAfterNRequestedIncreases) {
            return;
        }
        this.requestedIncreases = 0;
        this.currentWaitTime = this.currentWaitTime + this.increaseWaitTimeMilliseconds;
        if ( this.currentWaitTime > this.maximalWaitTimeMilliseconds ) {
            this.currentWaitTime = this.maximalWaitTimeMilliseconds;
        }
    }
}