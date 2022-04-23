export class HTTPTooManyRequestsError extends Error {
  statusCode: 429;
  constructor(message) {
    super(message);
    this.name = 'HTTPTooManyRequestsError';
    this.statusCode = 429;
  }
}

export class HTTPNotFoundError extends Error {
  statusCode: 404;
  constructor(message) {
    super(message);
    this.name = 'HTTPNotFoundError';
    this.statusCode = 404;
  }
}
