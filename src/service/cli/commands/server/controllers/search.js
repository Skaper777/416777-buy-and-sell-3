'use strict';

const {HttpCode} = require(`../../../../../constants`);

const SearchModel = require(`../models/search`);
const getMockData = require(`../lib/get-mock-data`);

let searchService;

(async () => {
  const mockData = await getMockData();
  searchService = new SearchModel(mockData);
})();

const getSearch = async (req, res) => {
  const {query = ``} = req.query;

  if (!query) {
    res.status(HttpCode.BAD_REQUEST).json([]);
    return;
  }

  const searchResults = searchService.findAll(query);
  const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

  res.status(searchStatus)
    .json(searchResults);
};

module.exports = getSearch;

