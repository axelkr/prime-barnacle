import { Observable } from 'rxjs';

export interface IHTTPClient {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postJson(url: string, json: any): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(url: string): Observable<any>;
}