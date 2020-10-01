'use strict';

const {getLogger} = require(`../../../logger`);
const logger = getLogger();

module.exports = {
  name: `--help`,
  run() {
    const infoMessage = `
      Программа запускает http-сервер и формирует файл с данными для API.

        Гайд:
        service.js <command>

        Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
        --server <port>       запускает сервер на указанном порту
    `;

    logger.info(infoMessage);
  }
};
