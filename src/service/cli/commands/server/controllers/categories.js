'use strict';

const {HttpCode} = require(`../../../../../constants`);

const CategoryModel = require(`../models/category`);
const getMockData = require(`../lib/get-mock-data`);

let categoryService;

(async () => {
  const mockData = await getMockData();
  categoryService = new CategoryModel(mockData);
})();

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).send(`Not found`);
  }
};

module.exports = getCategories;
