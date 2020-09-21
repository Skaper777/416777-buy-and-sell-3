'use strict';

const {
  Router
} = require(`express`);

const offerValidator = require(`../middlewares/validators/offer`);
const commentValidator = require(`../middlewares/validators/comment`);

const offerController = require(`../controllers/offers`);
const commentController = require(`../controllers/comments`);

const offersRouter = new Router();

offersRouter.get(`/`, offerController.getOffers);
offersRouter.get(`/:offerId`, offerController.getOffer);
offersRouter.post(`/`, offerValidator, offerController.postOffer);
offersRouter.put(`/:offerId`, offerValidator, offerController.putOffer);
offersRouter.delete(`/:offerId`, offerController.deleteOffer);
offersRouter.get(`/:offerId/comments`, commentController.getComments);
offersRouter.delete(`/:offerId/comments/:commentId`, commentController.deleteComment);
offersRouter.post(`/:offerId/comments`, commentValidator, commentController.postComment);

module.exports = offersRouter;
