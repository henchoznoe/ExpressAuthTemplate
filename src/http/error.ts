/**
 * HTTP Error class. This class is used to throw HTTP errors.
 */
export class HttpError extends Error {

  // Status code of the HTTP error.
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}
