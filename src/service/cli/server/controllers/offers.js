'use strict';

const {HttpCode} = require(`../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const {OfferModel, CommentModel} = require(`../models`);

let offerService;
let commentService;

(async () => {
  const mockData = await getMockData();
  offerService = new OfferModel(mockData);
  commentService = new CommentModel(mockData);
})();

const checkExistOffer = (req, res) => {
  const {offerId} = req.params;
  const offer = offerService.findOne(offerId);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Offer with ${offerId} not found`);
  }

  res.locals.offer = offer;
  return true;
};

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
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postOffer = async (req, res) => {
  try {
    const offer = await offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
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
    res.status(HttpCode.NOT_FOUND)
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
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const getComments = async (req, res) => {
  try {
    checkExistOffer(req, res);

    const {offer} = res.locals;
    const comments = await commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteComment = async (req, res) => {
  try {
    checkExistOffer(req, res);

    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = await commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postComment = async (req, res) => {
  try {
    checkExistOffer(req, res);

    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

module.exports = {
  getOffers,
  getOffer,
  postOffer,
  putOffer,
  deleteOffer,
  getComments,
  deleteComment,
  postComment
};

