'use strict';

const fs = require(`fs`).promises;
const logger = require(`../../../../../logger`);
const {FILENAME, ServerMessage} = require(`../../../../../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.showError(ServerMessage.CREATE_ERROR, err);
  }

  return data;
};

module.exports = getMockData;
