'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getMyTickets = async (req, res) => {
  try {
    const offers = await api.getOffers();

    res.render(`my-tickets.pug`, {offers});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getMyComments = async (req, res) => {
  try {
    const offers = await api.getOffers();
    res.render(`comments.pug`, {offers: offers.slice(0, 3)});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getMyTickets,
  getMyComments
};
