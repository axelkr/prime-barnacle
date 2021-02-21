'use strict';

import { expect } from 'chai';
import { EventSourceMockFactory } from './EventSourceMock';
import { Client } from '../src/Client';

describe('Client', () => {
	const dummyEndpoint = 'http://endpoint';
	const eventSourceFactory = new EventSourceMockFactory();

	it('should create an instance using its constructor', () => {
		const example: Client = new Client(dummyEndpoint,eventSourceFactory);
		expect(example, 'example should exist').to.exist; // tslint:disable-line:no-unused-expression
	});
});
