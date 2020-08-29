'use strict';

class SearchModel {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    return this._offers.
      filter((offer) => offer.title.includes(searchText));
  }

}

module.exports = SearchModel;
