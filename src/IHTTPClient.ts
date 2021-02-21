export type ObjectEventBackEnd = {
    topic: string;
    time: string;
    id: number;
    eventType: string;
    object: string;
    objectType: string;
    payload: string;
};

export interface IHTTPClient {
    postJson(url:string,json:Record<string, unknown>): void;
    get(url:string): ObjectEventBackEnd[];
}