'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../../constants`);

class CommentModel {
  create(offer, comment) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), ...comment};

    offer.comments.push(newComment);
    return comment;
  }

  drop(offer, commentId) {
    const dropComment = offer.comments
      .find((comment) => comment.id === commentId);

    if (!dropComment) {
      return null;
    }

    offer.comments = offer.comments
      .filter((comment) => comment.id !== commentId);

    return dropComment;
  }

  findAll(offer) {
    return offer.comments;
  }
}

module.exports = CommentModel;
