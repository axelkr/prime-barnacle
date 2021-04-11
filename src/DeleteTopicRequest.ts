import { AbstractRequest } from './AbstractRequest';
import { Topic } from 'choicest-barnacle';
import { Subject } from 'rxjs';
import { IHTTPClient } from './IHTTPClient';

export class DeleteTopicRequest extends AbstractRequest<Topic> {
    private readonly toDelete: Topic;

    constructor(aTopic: Topic, httpClient: IHTTPClient, publishTo: Subject<Topic>) {
        super(httpClient, publishTo, true);
        this.toDelete = aTopic;
    }

    execute(endpoint: string): void {
        this.httpClient.delete(endpoint + '/topic/' + this.toDelete.id);
    }
}