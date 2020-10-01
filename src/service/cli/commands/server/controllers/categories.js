'use strict';

const {HttpCode, LoggerMessage, ApiRoutes} = require(`../../../../../constants`);

const CategoryModel = require(`../models/category`);
const getMockData = require(`../lib/get-mock-data`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getCategories = async (req, res) => {
  try {
    const data = await getMockData();
    const categoryService = new CategoryModel(data);

    const categories = await categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
    logger.debug(`${LoggerMessage.ROUTE}${ApiRoutes.CATEGORIES}`);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).send(`Not found`);
    logger.error(LoggerMessage.NOT_FOUND);
  }
};

module.exports = getCategories;
