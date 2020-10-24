'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getApi();
const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();

  console.log(offers);
  res.render(`main.pug`, {offers});
});

module.exports = mainRouter;
