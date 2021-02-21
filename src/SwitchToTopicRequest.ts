import { ObjectEventRequest } from './ObjectEventRequest';

export class SwitchToTopicRequest extends ObjectEventRequest {
    private readonly newTopic: string;

    constructor(newTopic: string) {
        super();
        this.newTopic = newTopic;
    }

    execute(endpoint: string): void {
        //const allObjectEvents: Observable<ObjectEventBackEnd[]> =
      //this.httpClient.get<any[]>(this.endpoint + `/objectEvent?topic=` + topic);
    //return map(this.deserializeServerObjectEvent)(allObjectEvents);
    }
}
