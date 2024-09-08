import { Response } from 'express';
import { injectable } from 'tsyringe';
import { ErrorMessage, HttpException } from './custom-error';

@injectable()
export class ErrorHandler {
  async handleCustomError(err: any, res: Response): Promise<Response> {
    if (err instanceof HttpException) {
      return res.status(err.statusCode).json({
        error: err.error,
        message: err.message,
        success: false,
      });
    }
    return res.status(500).json({
      error: ErrorMessage.INTERNAL_SERVER_ERROR,
      message:
        'An error occurred while processing your request. Please try again later.',
      success: false,
    });
  }
}
