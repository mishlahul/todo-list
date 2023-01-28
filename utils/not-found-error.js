class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.status = 'Not Found';
  }
}

module.exports = NotFoundError;
