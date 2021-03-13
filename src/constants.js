'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 8080;
const DEFAULT_COUNT = 1;
const TARGET_ARGS_INDEX = 1;
const USER_ARGV_INDEX = 2;
const MAX_ADS = 1000;
const MAX_ID_LENGTH = 5;
const MAX_COMMENTS = 6;
const TIMEOUT = 1000;
const FILENAME = `mocks.json`;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const LOGS_DIR = `./src/service/logs/logs.log`;
const TEMPLATES_DIR = `templates/pages`;
const API_PREFIX = `/api`;

const OfferType = Object.freeze({
  OFFER: `offer`,
  SALE: `sale`,
});

const ApiRoutes = Object.freeze({
  OFFERS: `/api/offers`,
  CATEGORIES: `/api/categories`,
  SEARCH: `/api/search`,
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

const ServerMessage = Object.freeze({
  CREATE_ERROR: `Can't start server`,
  PENDING: `Server started at port `
});

const DatabaseConnectMessage = Object.freeze({
  TRY: `Trying to connect to database...`,
  ERROR: `An error occured: `,
  SUCCESS: `Connection to database established`
});

const LoggerMessage = Object.freeze({
  ROUTE: `Route is `,
  STATUS_CODE: `Status code is `,
  NOT_FOUND: `Error, not found`,
  BAD_REQUEST: `Error, bad request`
});

const ExitCode = Object.freeze({
  SUCCESS: 0,
  ERROR: 1
});

const MockPath = Object.freeze({
  SENTENCES_PATH: `./data/sentences.txt`,
  TITLES_PATH: `./data/titles.txt`,
  CATEGORIES_PATH: `./data/categories.txt`,
  COMMENTS_PATH: `./data/comments.txt`
});

const HttpCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
});

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  DEFAULT_COUNT,
  TIMEOUT,
  TARGET_ARGS_INDEX,
  USER_ARGV_INDEX,
  MAX_ADS,
  FILENAME,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  PUBLIC_DIR,
  UPLOAD_DIR,
  LOGS_DIR,
  TEMPLATES_DIR,
  API_PREFIX,
  OfferType,
  ApiRoutes,
  SumRestrict,
  PictureRestrict,
  СliMessage,
  ServerMessage,
  DatabaseConnectMessage,
  LoggerMessage,
  ExitCode,
  MockPath,
  HttpCode
};
