'use strict';

const chalk = require(`chalk`);

const logger = {
  showError(text, error) {
    console.error(chalk.red(text), error ? error : ``);
  },

  showSuccess(text) {
    console.info(chalk.green(text));
  },

  showInfo(text) {
    console.info(chalk.gray(text));
  },

  showVersion(text) {
    console.info(chalk.blue(text));
  }
};

module.exports = logger;
