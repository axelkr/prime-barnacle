import { IWaitTime } from "./IWaitTime";

export class WaitTime implements IWaitTime {
    private readonly initialWaitTimeMilliseconds: number;
    private readonly increaseWaitTimeMilliseconds: number;
    private readonly maximalWaitTimeMilliseconds: number;

    constructor(initialWaitTimeMilliseconds:number,increaseWaitTimeMilliseconds:number, maximalWaitTimeMilliseconds:number) {
        this.initialWaitTimeMilliseconds = initialWaitTimeMilliseconds;
        this.increaseWaitTimeMilliseconds = increaseWaitTimeMilliseconds;
        this.maximalWaitTimeMilliseconds = maximalWaitTimeMilliseconds;
    }

    public getWaitTimeMilliseconds(): number {
        return this.initialWaitTimeMilliseconds;
    }

    public reset(): void {

    }

    public increaseWaitTime(): void {

    }
}