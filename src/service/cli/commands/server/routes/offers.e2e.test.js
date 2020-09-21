'use strict';

const request = require(`supertest`);
const server = require(`../../server/index`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);


test(`When get offers status code should be 200`, async () => {
  const res = await request(server).get(ApiRoutes.OFFERS);
  expect(res.statusCode).toBe(HttpCode.OK);
});


