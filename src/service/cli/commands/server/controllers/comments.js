'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const OfferModel = require(`../models/offer`);
const CommentModel = require(`../models/comment`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getComments = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);
    const commentService = new CommentModel(mockData);

    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const comments = await commentService.findAll(offer);

    logger.debug(`${LoggerMessage.ROUTE}get comments`);
    return res.status(HttpCode.OK)
      .json(comments);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteComment = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);
    const commentService = new CommentModel(mockData);

    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const {commentId} = req.params;
    const deletedComment = await commentService.drop(offer, commentId);

    if (!deletedComment) {
      logger.error(LoggerMessage.NOT_FOUND);
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    logger.debug(`${LoggerMessage.ROUTE}delete comments`);
    return res.status(HttpCode.OK)
      .json(deletedComment);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postComment = async (req, res) => {
  try {
    const mockData = await getMockData();
    const offerService = new OfferModel(mockData);
    const commentService = new CommentModel(mockData);

    const {offerId} = req.params;
    const offer = await offerService.findOne(offerId);

    if (!offer) {
      logger.error(LoggerMessage.NOT_FOUND);
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const comment = await commentService.create(offer, req.body);

    logger.debug(`${LoggerMessage.ROUTE}new comments`);
    return res.status(HttpCode.CREATED)
      .json(comment);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const commentController = {
  getComments,
  deleteComment,
  postComment
};

module.exports = commentController;
