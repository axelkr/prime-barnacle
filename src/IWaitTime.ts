export interface IWaitTime {
    getWaitTimeMilliseconds(): number;
    reset(): void;
    increaseWaitTime(): void;
}