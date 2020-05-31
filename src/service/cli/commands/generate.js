'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {
  ExitCode,
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
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
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

    const lengthError = `No more than 1000 ads`;
    const writeError = `Can't write data to file...`;
    const successMessage = `Operation success. File created.`;

    if (args > MAX_ADS) {
      console.error(chalk.red(lengthError));
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(successMessage));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(writeError));
      process.exit(ExitCode.ERROR);
    }
  }
};
