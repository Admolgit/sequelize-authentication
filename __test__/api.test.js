const request = require("supertest");
const app = require("../src/routes/productRoutes");
jest.useFakeTimers()
// jest.useRealTimers();

describe("GET /products", () => {
  describe("should return all products", () => {
    test('should respond with 200 status code', async () => {
      await request(app).get('/products').send({
        title: 'test',
        price: 100,
        description: "test",
        published: true
      })
      expect(res.status).toBe(200)
    });
  });
});