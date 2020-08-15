'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const app = express();

const {DEFAULT_PORT, FILENAME, HttpCode, ServerMessage} = require(`../../../constants`);
const logger = require(`../../../logger`);

app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    let mocks = [];

    try {
      const fileContent = await fs.readFile(FILENAME);
      mocks = JSON.parse(fileContent);
    } catch (error) {
      logger.showError(ServerMessage.CREATE_ERROR, error);
    }

    res.json(mocks);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

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
      }

      logger.showSuccess(ServerMessage.PENDING + port);
    });
  }
};
