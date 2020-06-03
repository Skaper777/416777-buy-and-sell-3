'use strict';

const logger = require(`../../../logger`);
const packageJsonFile = require(`../../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    console.info(logger.showVersion(version));
  }
};
