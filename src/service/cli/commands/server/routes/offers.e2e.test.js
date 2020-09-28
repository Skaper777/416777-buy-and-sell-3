'use strict';

const request = require(`supertest`);
const server = require(`../../server/index`);
const getMockData = require(`../lib/get-mock-data`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);

let mockOffer;
let mockComment;
let mockData;

beforeEach(() => {
  mockOffer = {
    title: `Test title`,
    picture: `TestPicture.jpg`,
    description: `Test description`,
    type: `offer`,
    sum: 1000,
    category: [`Разное`]
  };

  mockComment = {
    text: `Test comment`
  };
});

beforeAll(async () => {
  mockData = await getMockData();
});


// Тесты офферов

describe(`Offers API end-points`, () => {
  describe(`Get offers`, () => {
    test(`When get offers status code should be 200`, async () => {
      const res = await request(server).get(ApiRoutes.OFFERS);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`Get offer by ID`, () => {
    test(`When get offer by id status code should be 200`, async () => {
      const id = mockData[0].id;
      const res = await request(server).get(`${ApiRoutes.OFFERS}/${id}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When offer not found by id status code should be 404`, async () => {
      const id = `test`;
      const res = await request(server).get(`${ApiRoutes.OFFERS}/${id}`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Create new offer`, () => {
    test(`When create new offer status code should be 201`, async () => {
      const res = await request(server).post(ApiRoutes.OFFERS).send(mockOffer);

      expect(res.statusCode).toBe(HttpCode.CREATED);
    });

    test(`When create new offer with not with all fields status code should be 400`, async () => {
      delete mockOffer.category;

      const res = await request(server).post(ApiRoutes.OFFERS).send(mockOffer);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Edit offer`, () => {
    test(`When edit offer status code should be 200`, async () => {
      const id = mockData[0].id;
      mockData[0].title = `New title`;

      const res = await request(server).put(`${ApiRoutes.OFFERS}/${id}`).send(mockData[0]);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When edit offer with not with all fields status code should be 400`, async () => {
      delete mockData[0].category;

      const res = await request(server).post(ApiRoutes.OFFERS).send(mockData[0]);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete offer`, () => {
    test(`When delete offer status code should be 200`, async () => {
      const id = mockData[0].id;

      const res = await request(server).delete(`${ApiRoutes.OFFERS}/${id}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When delete offer with wrong id status code should be 404`, async () => {
      const id = `test`;

      const res = await request(server).delete(`${ApiRoutes.OFFERS}/${id}`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Wrong request`, () => {
    test(`When set wrong API request status code should be 404`, async () => {
      const res = await request(server).get(`/api/test`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});


// Тесты комментов

describe(`Comments API end-points`, () => {
  describe(`Get comments`, () => {
    test(`When get offer comments status code should be 200`, async () => {
      const id = mockData[0].id;

      const res = await request(server).get(`${ApiRoutes.OFFERS}/${id}/comments`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`Add comment`, () => {
    test(`When add new comment return this comment`, async () => {
      const id = mockData[0].id;

      const res = await request(server).post(`${ApiRoutes.OFFERS}/${id}/comments`).send(mockComment);

      expect(res.body.text).toBe(mockComment.text);
    });

    test(`When add new comment to wrong offer return 404`, async () => {
      const id = `test`;

      const res = await request(server).post(`${ApiRoutes.OFFERS}/${id}/comments`).send(mockComment);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete comment`, () => {
    test(`When delete comment return 200`, async () => {
      const id = mockData[0].id;
      const commentId = mockData[0].comments[0].id;

      const res = await request(server).delete(`${ApiRoutes.OFFERS}/${id}/comments/${commentId}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });
});
