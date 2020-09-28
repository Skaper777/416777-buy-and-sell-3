'use strict';

const server = require(`./server/index`);

const {DEFAULT_PORT, ServerMessage} = require(`../../../constants`);
const {getLogger} = require(`../../../logger`);
const logger = getLogger();

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    server.listen(port, (err) => {
      if (err) {
        logger.error(ServerMessage.CREATE_ERROR);
        return;
      }

      logger.info(ServerMessage.PENDING + port);
    });
  }
};
