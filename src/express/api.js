'use strict';

const axios = require(`axios`);
const {TIMEOUT} = require(`../constants`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

class API {
  constructor(baseUrl, timeout) {
    this._http = axios.create({
      baseUrl,
      timeout
    });
  }

  async _load(url, options) {
    try {
      const response = await this._http.request({url, ...options});
      return response.data;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  getOffers() {
    return this._load(`/offers`);
  }

  getOffer(id) {
    return this._load(`/offers/${id}`);
  }

  search(query) {
    return this._load(`search`, {params: {query}});
  }

  async getCategories() {
    return this._load(`/category`);
  }

  async createOffer(data) {
    return this._load(`/offers`, {
      method: `POST`,
      data
    });
  }
}

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;
const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getApi: () => defaultAPI
};
