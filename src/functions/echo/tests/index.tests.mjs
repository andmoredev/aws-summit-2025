
import * as app from '../index.mjs';
import { expect } from 'chai';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const ddbMock = mockClient(DynamoDBClient);

beforeEach(() => {
  ddbMock.reset();
});

describe('Echo', () => {
  describe('handler', () => {
    it('Successfully', async () => {
      ddbMock.on(PutItemCommand).resolves({
        Attributes: {
          id: '12345',
          data: JSON.stringify({ hello: 'world' })
        }
      });

      const response = await app.handler({
        body: JSON.stringify({
          hello: 'world'
        })
      });

      expect(response.statusCode).to.equal(200);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('hello', 'world');
    });

    it('500 - Unhandled error', async () => {
      const response = await app.handler();
      expect(response.statusCode).to.equal(500);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
    });
  });
});