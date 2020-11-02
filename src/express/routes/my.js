'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const {getMyTickets, getMyComments} = require(`../controllers/my`);

myRouter.get(`/`, getMyTickets);
myRouter.get(`/comments`, getMyComments);

module.exports = myRouter;
