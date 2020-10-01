'use strict';

const express = require(`express`);

const routes = require(`./routes`);
const {HttpCode, API_PREFIX} = require(`../../../../constants`);

const server = express();

server.use(express.json());
server.use(API_PREFIX, routes);

server.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = server;
