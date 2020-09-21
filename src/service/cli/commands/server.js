'use strict';

const server = require(`./server/index`);

const {DEFAULT_PORT, ServerMessage} = require(`../../../constants`);
const logger = require(`../../../logger`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    server.listen(port, (err) => {
      if (err) {
        logger.showError(ServerMessage.CREATE_ERROR, err);
        return;
      }

      logger.showSuccess(ServerMessage.PENDING + port);
    });
  }
};
