"use strict";

const request = require(`supertest`);
const server = require(`../../server/index`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);

describe(`Search API end-points`, () => {
  describe(`Get search`, () => {
    test(`When get search status code should be 200`, async () => {
      const res = await request(server).get(`${ApiRoutes.SEARCH}?query=Play`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When get search without query status code should be 400`, async () => {
      const res = await request(server).get(`${ApiRoutes.SEARCH}?query=`);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});
