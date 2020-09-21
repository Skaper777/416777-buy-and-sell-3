'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../../constants`);

class OfferModel {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = {id: nanoid(MAX_ID_LENGTH), comments: [], ...offer};

    this._offers.push(newOffer);
    return newOffer;
  }

  drop(id) {
    const targetOffer = this._offers.find((offer) => offer.id === id);

    if (!targetOffer) {
      return null;
    }

    this._offers = this._offers.filter((offer) => offer.id !== id);
    return targetOffer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((offer) => offer.id === id);
  }

  update(id, newOffer) {
    const oldOffer = this._offers
      .find((offer) => offer.id === id);

    return Object.assign(oldOffer, newOffer);
  }
}

module.exports = OfferModel;
