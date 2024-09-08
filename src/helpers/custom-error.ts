export const ErrorMessage = {
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR_OCCURRED",
};

export class HttpException extends Error {
  statusCode: number;
  message: string;
  error: string | object;

  constructor(
    message: string,
    statusCode: number,
    error: string | object = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;

    // Set the prototype explicitly to maintain the correct instance type
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
