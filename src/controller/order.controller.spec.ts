import request from 'supertest';
import app from '../main';
import { ErrorMessage } from '../helpers';

describe('OrderController', () => {
  let server: any;
  let port: number;

  beforeAll((done) => {
    port = Math.floor(Math.random() * 10000) + 3000;
    server = app.listen(port, done);
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('should return orders and metadata for valid queries', async () => {
    const response = await request(app)
      .get('/orders?page=1&size=10')
      .expect(200);

    console.log(response.body, '<<< response');

    // Check if 'orders' is an array
    expect(Array.isArray(response.body.data.orders)).toBe(true);

    expect(response.body.data.metadata).toEqual({
      currentPage: expect.any(Number),
      hasNextPage: expect.any(Boolean),
      hasPreviousPage: expect.any(Boolean),
    });

    expect(response.body).toHaveProperty(
      'message',
      'Orders retrived successfully',
    );
    expect(response.body).toHaveProperty('success', true);
  }, 15000);

  it('should return 400 for invalid query parameters', async () => {
    const response = await request(app)
      .get('/orders?page=abc&size=10')
      .expect(400);

    expect(response.body).toHaveProperty('error', ErrorMessage.BAD_REQUEST);
  });
});
