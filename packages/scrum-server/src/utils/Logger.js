const path = require('path');
const { createLogger, format, transports } = require('winston');
const keys = require('../config/keys');

const consoleTransport = new transports.Console({
  level: keys.logging.level,
  colorize: true,
  prettyPrint: false,
});

const Logger = pathToFile => {
  // eslint-disable-next-line
  const logger = new createLogger({
    transports: [consoleTransport],
    format: format.combine(
      format.label({ label: path.basename(pathToFile) }),
      format.timestamp({ format: keys.logging.format }),
      format.align(),
      format.colorize(),
      format.printf(
        info => `${[info.timestamp]} - ${info.level} - [${info.label}] -> ${info.message}`
      )
    ),
  });
  return logger;
};

module.exports = { Logger };
