'use strict';

const fs = require(`fs`);
const {resolve} = require(`path`);
const {LOGS_DIR} = require(`./constants`);

if (!fs.existsSync(resolve(__dirname, `service/logs`))) {
  fs.mkdirSync(resolve(__dirname, `service/logs`));
}

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
