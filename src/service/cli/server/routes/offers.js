'use strict';

const {
  Router
} = require(`express`);

const offerValidator = require(`../middlewares/validators/offer`);
const commentValidator = require(`../middlewares/validators/comment`);

const {
  getOffers,
  getOffer,
  postOffer,
  putOffer,
  deleteOffer,
  getComments,
  deleteComment,
  postComment
} = require(`../controllers/offers`);

const offersRouter = new Router();

offersRouter.get(`/`, getOffers);
offersRouter.get(`/:offerId`, getOffer);
offersRouter.post(`/`, offerValidator, postOffer);
offersRouter.put(`/:offerId`, offerValidator, putOffer);
offersRouter.delete(`/:offerId`, deleteOffer);
offersRouter.get(`/:offerId/comments`, getComments);
offersRouter.delete(`/:offerId/comments/:commentId`, deleteComment);
offersRouter.post(`/:offerId/comments`, commentValidator, postComment);

module.exports = offersRouter;
