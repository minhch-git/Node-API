class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.message = message
    this.statusCode = statusCode

    Error.captureStackTrace(this)
  }
}

export default ErrorResponse;
