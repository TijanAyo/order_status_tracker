import { injectable } from 'tsyringe';
import { prisma } from '../config/prisma';
import { HttpException, ErrorMessage } from '../helpers';

@injectable()
export class OrderRepository {
  async fetchOrders(page: string, size: string) {
    try {
      const currentPage = Number.parseInt(page, 10);
      const pageSize = Number.parseInt(size, 10);
      const skip = (currentPage - 1) * pageSize;

      const [orders, totalOrders] = await prisma.$transaction([
        prisma.order.findMany({
          skip,
          take: pageSize,
        }),
        prisma.order.count(),
      ]);

      const totalPages = Math.ceil(totalOrders / pageSize);

      const metadata = {
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };

      return { orders, metadata };
    } catch (e) {
      console.error(
        `Error at fetchOrders: Unable to list orders`,
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
