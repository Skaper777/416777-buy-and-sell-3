'use strict';

const {LOGS_DIR} = require(`./constants`);

const logger = require(`pino`)({
  name: `pino-and-express`,
  prettyPrint: true,
  level: process.env.LOG_LEVEL || `info`
}, LOGS_DIR);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
