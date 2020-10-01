'use strict';

const {getLogger} = require(`../../../logger`);
const logger = getLogger();

const packageJsonFile = require(`../../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logger.info(version);
  }
};
