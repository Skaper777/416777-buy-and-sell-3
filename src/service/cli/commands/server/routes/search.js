'use strict';

const {Router} = require(`express`);
const getSearch = require(`../controllers/search`);

const searchRouter = new Router();

searchRouter.get(`/`, getSearch);

module.exports = searchRouter;
