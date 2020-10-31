'use strict';

const api = require(`../api`).getApi();

const getSearchResult = async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search-result.pug`, {
      results
    });
  } catch (error) {
    res.render(`search-result.pug`);
  }
};

module.exports = {
  getSearchResult
};
