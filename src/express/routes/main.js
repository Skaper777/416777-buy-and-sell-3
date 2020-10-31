'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const {getMainPage} = require(`../controllers/main`);

mainRouter.get(`/`, getMainPage);

module.exports = mainRouter;
