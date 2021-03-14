import { AbstractRequest } from './AbstractRequest';
import { Topic } from 'choicest-barnacle';
import { Subject } from 'rxjs';
import { IHTTPClient } from './IHTTPClient';

export class PublishTopicRequest extends AbstractRequest<Topic> {
    private readonly toPublish: Topic;

    constructor(aTopic: Topic, httpClient: IHTTPClient, publishTo: Subject<Topic>) {
        super(httpClient, publishTo, true);
        this.toPublish = aTopic;
    }

    execute(endpoint: string): void {
        const asJSON = this.mappingService.toTopicREST(this.toPublish);
        this.httpClient.postJson(endpoint + '/topic', asJSON);
    }
}