"use strict";

const request = require(`supertest`);
const server = require(`../../server/index`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);

describe(`Categories API end-points`, () => {
  describe(`Get categories`, () => {
    test(`When get categories status code should be 200`, async () => {
      const res = await request(server).get(ApiRoutes.CATEGORIES);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });
});
