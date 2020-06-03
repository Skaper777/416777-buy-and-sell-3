'use strict';

const chalk = require(`chalk`);

const logger = {
  showError(text) {
    return chalk.red(text);
  },

  showSuccess(text) {
    return chalk.green(text);
  },

  showInfo(text) {
    return chalk.gray(text);
  },

  showVersion(text) {
    return chalk.blue(text);
  }
};

module.exports = logger;
