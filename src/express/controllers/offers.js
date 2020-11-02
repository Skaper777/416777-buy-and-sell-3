'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getEditOffer = async (req, res) => {
  try {
    const {id} = req.params;
    const [offer, categories] = await Promise.all([
      api.getOffer(id),
      api.getCategories()
    ]);

    res.render(`ticket-edit.pug`, {offer, categories});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getAddOffer = async (req, res) => {
  try {
    res.render(`new-ticket.pug`);
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getPostAddOffer = async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category
  };

  try {
    await api.createOffer(`/offers`, offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
};

module.exports = {
  getEditOffer,
  getAddOffer,
  getPostAddOffer
};
