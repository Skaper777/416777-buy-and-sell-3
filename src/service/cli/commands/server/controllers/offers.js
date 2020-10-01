'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const OfferModel = require(`../models/offer`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getOffers = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);

    const offers = await offerService.findAll();
    logger.debug(`${LoggerMessage.ROUTE}offers`);
    return res.status(HttpCode.OK).json(offers);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const getOffer = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);

    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      logger.error(LoggerMessage.NOT_FOUND);
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${offerId}`);
    }

    logger.debug(`${LoggerMessage.ROUTE}offer`);
    return res.status(HttpCode.OK)
      .json(offer);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postOffer = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);

    const offer = await offerService.create(req.body);

    logger.debug(`${LoggerMessage.ROUTE}new offer`);
    return res.status(HttpCode.CREATED)
      .json(offer);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const putOffer = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);

    const {offerId} = req.params;
    const existOffer = await offerService.findOne(offerId);

    if (!existOffer) {
      logger.error(LoggerMessage.NOT_FOUND);
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updatedOffer = await offerService.update(offerId, req.body);

    logger.debug(`${LoggerMessage.ROUTE}edit offer`);
    return res.status(HttpCode.OK)
      .json(updatedOffer);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteOffer = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);

    const {offerId} = req.params;
    const offer = await offerService.drop(offerId);

    if (!offer) {
      logger.error(LoggerMessage.NOT_FOUND);
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    logger.debug(`${LoggerMessage.ROUTE}delete offer`);
    return res.status(HttpCode.OK)
      .json(offer);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
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
