'use strict';

import { expect } from 'chai';
import { Client } from '../src/Client';

describe('Client', () => {
	const dummyEndpoint = 'http://endpoint';

	it('should create an instance using its constructor', () => {
		const example: Client = new Client(dummyEndpoint);
		expect(example, 'example should exist').to.exist; // tslint:disable-line:no-unused-expression
	});
});
