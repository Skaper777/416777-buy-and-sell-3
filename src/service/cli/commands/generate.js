'use strict';

const fs = require(`fs`).promises;

const logger = require(`../../../logger`);

const {
  ExitCode,
  cliMessages,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`../../../constants`);

const {
  TITLES,
  SENTENCES,
  CATEGORIES
} = require(`../mocks`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName
} = require(`../../../utils`);

const DEFAULT_COUNT = 1;
const MAX_ADS = 1000;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,

  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    if (args > MAX_ADS) {
      console.error(logger.showError(cliMessages.LENGTH_ERROR));
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILE_NAME, content)
      .then(res => console.log(content));
      console.info(logger.showSuccess(cliMessages.SUCCESS));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(logger.showError(cliMessages.WRITE_ERROR));
      process.exit(ExitCode.ERROR);
    }
  }
};
