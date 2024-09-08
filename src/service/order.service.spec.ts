import 'reflect-metadata';

import { OrderService } from '../service';
import { OrderRepository } from '../repository';
import { HttpException } from '../helpers';
import { jest } from '@jest/globals';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new OrderService(orderRepository);
  });

  it('should return orders and metadata for valid inputs', async () => {
    jest.spyOn(orderRepository, 'fetchOrders').mockResolvedValue({
      orders: [],
      metadata: { currentPage: 1, hasNextPage: false, hasPreviousPage: false },
    });

    const response = await orderService.getOrderList('1', '10');

    expect(response.data).toHaveProperty('orders');
    expect(response.data).toHaveProperty('metadata');
  });

  it('should throw HttpException for invalid page', async () => {
    await expect(orderService.getOrderList('abc', '10')).rejects.toThrow(
      HttpException,
    );
  });
});
