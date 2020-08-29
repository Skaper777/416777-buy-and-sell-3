'use strict';

const {Router} = require(`express`);
const categories = require(`../routes/categories`);
const offers = require(`../routes/offers`);
const search = require(`../routes/search`);

const app = new Router();

app.use(`/categories`, categories);
app.use(`/offers`, offers);
app.use(`/search`, search);

module.exports = app;
