import { EventSourceMockFactory } from './EventSourceMock';
import { Client } from '../src/Client';

describe('Client', () => {
	const dummyEndpoint = 'http://endpoint';
	const eventSourceFactory = new EventSourceMockFactory();

	it('should create an instance using its constructor', () => {
		const example: Client = new Client(dummyEndpoint, eventSourceFactory, undefined);
		expect(example).toBeDefined();
	});
});
