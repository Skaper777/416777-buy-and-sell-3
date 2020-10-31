'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();
const {getSearchResult} = require(`../controllers/search`);

searchRouter.get(`/`, getSearchResult);

module.exports = searchRouter;
