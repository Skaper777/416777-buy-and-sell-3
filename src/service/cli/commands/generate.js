'use strict';

const fs = require(`fs`).promises;

const logger = require(`../../../logger`);

const {
  ExitCode,
  СliMessage,
  OfferType,
  SumRestrict,
  PictureRestrict,
  MockPath
} = require(`../../../constants`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  readContent
} = require(`../../../utils`);

const DEFAULT_COUNT = 1;
const MAX_ADS = 1000;
const FILE_NAME = `mocks.json`;

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,

  async run(args) {
    const sentences = await readContent(MockPath.SENTENCES_PATH);
    const titles = await readContent(MockPath.TITLES_PATH);
    const categories = await readContent(MockPath.CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    if (args > MAX_ADS) {
      logger.showError(СliMessage.LENGTH_ERROR);
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.showSuccess(СliMessage.SUCCESS);
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      logger.showError(СliMessage.WRITE_ERROR);
      process.exit(ExitCode.ERROR);
    }
  }
};
