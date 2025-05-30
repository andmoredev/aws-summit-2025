import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';

export const handler = initializePowertools(async (event) => {
  try {
    logger.trace('Trace Log');
    logger.debug('Debug Log');
    logger.info('Info Log');
    logger.warn('Warn Log');
    logger.error('Error Log');
    logger.critical('Critical Log');
    logger.silent('Silent Log');
    const input = JSON.parse(event.body);

    logger.flushBuffer();

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' })
  }
});
