const { Logger } = require('../src/utils/Logger');

const logger = Logger();
const text = 'yet';
logger.error(`error Hello, Winston! ${text} other`);
logger.info('info Hello, Winston!');
logger.debug('debug Hello, Winston!');
