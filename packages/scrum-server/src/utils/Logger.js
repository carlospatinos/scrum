const path = require('path');
const { createLogger, format, transports } = require('winston');
const keys = require('../config/keys');

const consoleTransport = new transports.Console({ level: keys.logging.level });

const myWinstonOptions = {
  transports: [consoleTransport],
  format: format.combine(
    format.label({ label: path.basename(require.main.filename) }),
    format.timestamp({ format: keys.logging.format }),
    format.align(),
    format.printf(
      info => `${[info.timestamp]} - ${info.level} - [${info.label}] -> ${info.message}`
    )
  ),
};

const Logger = () => {
  // eslint-disable-next-line
  const logger = new createLogger(myWinstonOptions);
  return logger;
};

module.exports = { Logger };
