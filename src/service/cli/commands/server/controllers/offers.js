'use strict';

const {HttpCode} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const OfferModel = require(`../models/offer`);

let offerService;

(async () => {
  const mockData = await getMockData();
  offerService = new OfferModel(mockData);
})();

const getOffers = async (req, res) => {
  try {
    const offers = await offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const getOffer = async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postOffer = async (req, res) => {
  try {
    const offer = await offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const putOffer = async (req, res) => {
  try {
    const {offerId} = req.params;
    const existOffer = await offerService.findOne(offerId);

    if (!existOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updatedOffer = await offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedOffer);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteOffer = async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = await offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const offerController = {
  getOffers,
  getOffer,
  postOffer,
  putOffer,
  deleteOffer
};

module.exports = offerController;
