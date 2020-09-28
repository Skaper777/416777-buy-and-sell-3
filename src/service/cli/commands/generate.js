'use strict';

const fs = require(`fs`).promises;
const logger = require(`../../../logger`);
const {nanoid} = require(`nanoid`);

const {
  ExitCode,
  СliMessage,
  OfferType,
  SumRestrict,
  PictureRestrict,
  MockPath,
  DEFAULT_COUNT,
  MAX_ADS,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  FILENAME
} = require(`../../../constants`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  readContent
} = require(`../../../utils`);

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `)
  }));
};

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--generate`,

  async run(args) {
    const sentences = await readContent(MockPath.SENTENCES_PATH);
    const titles = await readContent(MockPath.TITLES_PATH);
    const categories = await readContent(MockPath.CATEGORIES_PATH);
    const comments = await readContent(MockPath.COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    if (args > MAX_ADS) {
      logger.error(СliMessage.LENGTH_ERROR);
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILENAME, content);
      logger.info(СliMessage.SUCCESS);
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      logger.error(СliMessage.WRITE_ERROR);
      process.exit(ExitCode.ERROR);
    }
  }
};
