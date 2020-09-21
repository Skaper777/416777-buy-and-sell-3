'use strict';

const {HttpCode} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const OfferModel = require(`../models/offer`);
const CommentModel = require(`../models/comment`);

let offerService;
let commentService;

(async () => {
  const mockData = await getMockData();
  offerService = new OfferModel(mockData);
  commentService = new CommentModel(mockData);
})();

const getComments = async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const comments = await commentService.findAll(offer);

    return res.status(HttpCode.OK)
      .json(comments);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteComment = async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const {commentId} = req.params;
    const deletedComment = await commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postComment = async (req, res) => {
  try {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with ${offerId} not found`);
    }

    const comment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  } catch (error) {
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
