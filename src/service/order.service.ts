import { injectable } from 'tsyringe';
import { OrderRepository } from '../repository';
import { HttpException, ErrorMessage, AppResponse } from '../helpers';
import { getOrderListSchema } from '../helpers';
import { z } from 'zod';

// Infer getOrderList type from response-schema
type OrderResponseType = z.infer<typeof getOrderListSchema>;

@injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrderList(page: string, size: string): Promise<OrderResponseType> {
    if (isNaN(Number.parseInt(page, 10)) || Number.parseInt(page, 10) <= 0) {
      throw new HttpException(
        `Invalid page value`,
        400,
        ErrorMessage.BAD_REQUEST,
      );
    }

    if (isNaN(Number.parseInt(size, 10)) || Number.parseInt(size, 10) <= 0) {
      throw new HttpException(
        `Invalid page-size value`,
        400,
        ErrorMessage.BAD_REQUEST,
      );
    }

    try {
      const { orders, metadata } = await this.orderRepository.fetchOrders(
        page,
        size,
      );

      const response = {
        orders: orders,
        metadata,
      };

      return AppResponse.Ok(response, 'Orders retrived successfully');
    } catch (e) {
      console.error(
        `Error at getOrderList: Unable to fetch orderlist`,
        e.message,
        e.stack,
      );
      throw new HttpException(
        'An unexpected error has occurred',
        500,
        ErrorMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
