'use strict';

const express = require(`express`);
const app = express();
const routes = require(`../server/routes`);

const {DEFAULT_PORT, HttpCode, ServerMessage, API_PREFIX} = require(`../../../constants`);
const logger = require(`../../../logger`);

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        logger.showError(ServerMessage.CREATE_ERROR, err);
        return;
      }

      logger.showSuccess(ServerMessage.PENDING + port);
    });
  }
};
