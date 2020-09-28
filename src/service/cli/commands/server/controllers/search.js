'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);

const SearchModel = require(`../models/search`);
const getMockData = require(`../lib/get-mock-data`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getSearch = async (req, res) => {
  const {query = ``} = req.query;

  if (!query) {
    logger.error(LoggerMessage.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).json([]);
    return;
  }

  const data = await getMockData();
  const searchService = new SearchModel(data);

  const searchResults = await searchService.findAll(query);
  const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

  logger.debug(`${LoggerMessage.ROUTE}search`);
  res.status(searchStatus)
    .json(searchResults);
};

module.exports = getSearch;

