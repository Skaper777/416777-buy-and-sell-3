'use strict';

const DEFAULT_COMMAND = `--help`;
const TARGET_ARGS_INDEX = 1;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

Object.freeze(ExitCode);

module.exports = {
  DEFAULT_COMMAND,
  TARGET_ARGS_INDEX,
  USER_ARGV_INDEX,
  ExitCode
};
