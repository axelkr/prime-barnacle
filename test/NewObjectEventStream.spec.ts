import { EventSourceMock, EventSourceMockFactory, EventMock } from './EventSourceMock';
import { NewObjectEventStream } from '../src/NewObjectEventStream';
import { Subject } from 'rxjs';
import { ObjectEvent, ObjectEventREST } from 'choicest-barnacle';

describe('NewObjectEventStream', () => {
	const dummyEndpoint = 'http://endpoint';
	const eventSourceFactory = new EventSourceMockFactory();
	const reportTo = new Subject<ObjectEvent>();

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should create an instance using its constructor', () => {
		const testObject = new NewObjectEventStream(reportTo, dummyEndpoint, eventSourceFactory);
		expect(testObject).toBeDefined();
	});

	it('forwards events to subject', () => {
		const eventSourceMock = new EventSourceMock(dummyEndpoint);
		eventSourceFactory.nextEventSourceToReturn = eventSourceMock;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const testObject = new NewObjectEventStream(reportTo, dummyEndpoint, eventSourceFactory);
		const randomDateTime = new Date(2020, 11, 17, 2, 42, 33);
		const backendEvent = setTimeObjectEventBackEnd(randomDateTime, generateJSONFromServer());
		let reportedEvent: ObjectEvent = undefined;
		reportTo.subscribe({ next: anObjectEvent => reportedEvent = anObjectEvent });
		eventSourceMock.onmessage(createJSONMockEvent(backendEvent));
		expect(reportedEvent.time).toEqual(randomDateTime);
	});

	it('requests new event source within 1 second in case current one fails', () => {
		const firstEventSource = new EventSourceMock(dummyEndpoint);
		eventSourceFactory.nextEventSourceToReturn = firstEventSource;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const testObject = new NewObjectEventStream(reportTo, dummyEndpoint, eventSourceFactory);
		let reportedEvent: ObjectEvent = undefined;
		reportTo.subscribe({ next: anObjectEvent => reportedEvent = anObjectEvent });
		const secondEventSource = new EventSourceMock(dummyEndpoint);
		eventSourceFactory.nextEventSourceToReturn = secondEventSource;
		firstEventSource.onerror(createJSONMockEvent(new EventMock('error')));
		jest.runOnlyPendingTimers();
		const randomDateTime = new Date(2020, 11, 17, 2, 42, 33);
		const backendEvent = setTimeObjectEventBackEnd(randomDateTime, generateJSONFromServer());
		secondEventSource.onmessage(createJSONMockEvent(backendEvent));
		expect(reportedEvent.time).toEqual(randomDateTime);
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function createJSONMockEvent(objectEvent: any): EventMock {
		const result = new EventMock('message');
		result.data = JSON.stringify(objectEvent);
		return result;
	}

	function generateJSONFromServer(): ObjectEventREST {
		const emptyMap = new Map<string, string>();
		const serializedEmptyMap = JSON.stringify(Array.from(emptyMap.entries()));
		return {
			topic: 'topic',
			time: new Date().toUTCString(),
			id: 0,
			eventType: 'eventType',
			object: 'object',
			objectType: 'objectType',
			payload: serializedEmptyMap,
			isTransient: false
		};
	}

	function setTimeObjectEventBackEnd(time: Date, object: ObjectEventREST): ObjectEventREST {
		object.time = time.toUTCString();
		return object;
	}
});
