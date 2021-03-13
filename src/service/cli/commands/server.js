'use strict';

const server = require(`./server/index`);
const sequelize = require(`./server/lib/sequelize`);

const {
  DEFAULT_PORT,
  ServerMessage,
  DatabaseConnectMessage,
  ExitCode
} = require(`../../../constants`);
const {
  getLogger
} = require(`../../../logger`);
const logger = getLogger();

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(DatabaseConnectMessage.TRY);
      await sequelize.authenticate();

      logger.info(DatabaseConnectMessage.SUCCESS);

      const [customPort] = args;
      const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

      server.listen(port, (err) => {
        if (err) {
          logger.error(ServerMessage.CREATE_ERROR);
          return;
        }

        logger.info(ServerMessage.PENDING + port);
      });
    } catch (error) {
      logger.error(DatabaseConnectMessage.ERROR + error);
      process.exit(ExitCode.ERROR);
    }
  }
};
