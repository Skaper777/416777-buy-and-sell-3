'use strict';

const fs = require(`fs`).promises;

const {getLogger} = require(`./logger`);
const logger = getLogger();

const getRandomInt = (min, max) => {
  const ADDITIONAL_NUM = 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + ADDITIONAL_NUM)) + min;
};

const getPictureFileName = (num) => {
  const numStr = num.toString().padStart(2, `0`);

  return `item${numStr}.jpg`;
};

const shuffle = (someArray) => {
  someArray.forEach((item, index) => {
    const randomPosition = Math.floor(Math.random() * index);

    [someArray[index], someArray[randomPosition]] = [someArray[randomPosition], someArray[index]];
  });

  return someArray;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const contentArray = content.split(`\n`);

    return contentArray.slice(0, contentArray.length - 1);
  } catch (err) {
    logger.error(err);
    return false;
  }
};

module.exports = {
  getRandomInt,
  getPictureFileName,
  shuffle,
  readContent
};
