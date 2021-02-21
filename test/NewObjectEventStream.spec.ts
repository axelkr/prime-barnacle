'use strict';

import { expect } from 'chai';
import { EventSourceMock, EventSourceMockFactory, EventMock } from './EventSourceMock';
import { NewObjectEventStream } from '../src/NewObjectEventStream';
import { Subject } from 'rxjs';
import { ObjectEvent} from 'happy-barnacle';
import { ObjectEventBackEnd} from '../src/ObjectEventRequest';

describe('NewObjectEventStream', () => {
	const dummyEndpoint = 'http://endpoint';
	const eventSourceFactory = new EventSourceMockFactory();
	const reportTo = new Subject<ObjectEvent>();

	it('should create an instance using its constructor', () => {
		const testObject = new NewObjectEventStream(reportTo,dummyEndpoint,eventSourceFactory);
		expect(testObject, 'testObject should exist').to.exist; // tslint:disable-line:no-unused-expression
	});

	it('forwards events to subject', () => {
		const eventSourceMock: EventSourceMock = new EventSourceMock(dummyEndpoint);
		eventSourceFactory.nextEventSourceToReturn = eventSourceMock;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const testObject = new NewObjectEventStream(reportTo,dummyEndpoint,eventSourceFactory);
		const randomDateTime = new Date(2020,11,17,2,42,33);
		const backendEvent = setTimeObjectEventBackEnd(randomDateTime,generateJSONFromServer());
		let reportedEvent: ObjectEvent = undefined;
		reportTo.subscribe({next: anObjectEvent => reportedEvent = anObjectEvent});
		eventSourceMock.onmessage(createJSONMockEvent(backendEvent));
		expect(reportedEvent.time).to.deep.equal(randomDateTime);
	});

	function createJSONMockEvent(objectEvent): EventMock {
		const result = new EventMock('message');
		result.data = JSON.stringify(objectEvent);
		return result;
	}

	function generateJSONFromServer(): ObjectEventBackEnd {
		const emptyMap = new Map<string,string>();
		const serializedEmptyMap = JSON.stringify(Array.from(emptyMap.entries()));
		return {
			topic: 'topic',
			time: new Date().toUTCString(),
			id: 0,
			eventType: 'eventType',
			object: 'object',
			objectType: 'objectType',
			payload: serializedEmptyMap
		};
	}

	function setTimeObjectEventBackEnd(time:Date, object: ObjectEventBackEnd): ObjectEventBackEnd {
		object.time = time.toUTCString();
		return object;
	}
});
