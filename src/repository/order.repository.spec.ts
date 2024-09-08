import 'reflect-metadata';
import { OrderRepository } from '../repository';
import { HttpException } from '../helpers';
import { prisma } from '../config/prisma';

describe('OrderRepository', () => {
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
  });

  it('should return orders and metadata', async () => {
    const response = await orderRepository.fetchOrders('1', '10');

    expect(response).toHaveProperty('orders');
    expect(response).toHaveProperty('metadata');
  });
});
