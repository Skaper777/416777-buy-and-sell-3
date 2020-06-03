'use strict';

const DEFAULT_COMMAND = `--help`;
const TARGET_ARGS_INDEX = 1;
const USER_ARGV_INDEX = 2;

const OfferType = Object.freeze({
  OFFER: `offer`,
  SALE: `sale`,
});

const SumRestrict = Object.freeze({
  MIN: 1000,
  MAX: 100000,
});

const PictureRestrict = Object.freeze({
  MIN: 1,
  MAX: 16,
});

const СliMessage = Object.freeze({
  LENGTH_ERROR: `No more than 1000 cards`,
  WRITE_ERROR: `Can't write data to file...`,
  SUCCESS: `Operation success. File created.`
});

const ExitCode = Object.freeze({
  SUCCESS: 0,
  ERROR: 1
});

module.exports = {
  DEFAULT_COMMAND,
  TARGET_ARGS_INDEX,
  USER_ARGV_INDEX,
  OfferType,
  SumRestrict,
  PictureRestrict,
  СliMessage,
  ExitCode
};
