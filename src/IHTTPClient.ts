import { Observable } from 'rxjs';
import { ObjectEventREST } from 'choicest-barnacle'

export interface IHTTPClient {
    postJson(url: string, json: ObjectEventREST): void;
    get(url: string): Observable<ObjectEventREST>;
}