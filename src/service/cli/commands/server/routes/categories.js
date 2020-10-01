'use strict';

const {Router} = require(`express`);
const getCategories = require(`../controllers/categories`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, getCategories);

module.exports = categoriesRouter;
