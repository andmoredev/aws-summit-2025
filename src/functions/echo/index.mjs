import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ulid } from 'ulid';

const dynamoDBClient = new DynamoDBClient();

export const handler = initializePowertools(async (event) => {
  try {
    const input = JSON.parse(event.body);

    const putItemCommand = new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        pk: { S: ulid() },
        data: { S: JSON.stringify(input) }
        random: 'grabame en la base de datos'
      }
    });

    await dynamoDBClient.send(putItemCommand);

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' });
  }
});