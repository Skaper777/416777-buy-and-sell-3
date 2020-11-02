'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getMainPage = async (req, res) => {
  try {
    const offers = await api.getOffers();
    const categories = await api.getOffers();

    res.render(`main.pug`, {offers});
    res.render(`categories.pug`, {categories});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getMainPage
};
