import { injectable } from "tsyringe";
import { OrderService } from "../service";
import { Request, Response } from "express";
import { ErrorHandler, ErrorMessage } from "../helpers";

@injectable()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly errorService: ErrorHandler
  ) {}

  async getOrderList(req: Request, res: Response): Promise<Response> {
    const allowedQueries = ["page", "size"];
    const queryKeys = Object.keys(req.query);

    const invalidQueries = queryKeys.filter(
      (key) => !allowedQueries.includes(key)
    );

    if (invalidQueries.length > 0) {
      return res.status(400).json({
        error: ErrorMessage.BAD_REQUEST,
        message: `Invalid query parameters`,
        boolean: false,
      });
    }

    try {
      const { page = 1, size = 10 } = req.query;

      const response = await this.orderService.getOrderList(
        page as string,
        size as string
      );
      return res.status(200).json(response);
    } catch (e) {
      return await this.errorService.handleCustomError(e, res);
    }
  }
}
