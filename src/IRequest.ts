export enum RequestState {
    WAITING = 0,
    RUNNING = 1,
    ERROR = 2,
    FINISHED = 3
}

export interface IRequest {
    readonly isSynchronuous: boolean;
    state: RequestState;
    execute(endpoint: string): void;
}
