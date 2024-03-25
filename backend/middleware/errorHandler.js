// Initiate the error handler middleware
const errorHandler = (error, request, response, next) => {
  // Log the error stack trace
  console.error(error.stack);

  // Set the status code. If the error has a status code, use that. Otherwise, default to 500.
  const statusCode = error.statusCode || 500;

  // Create a response object
  const res = {
    status: 'error',
    statusCode: statusCode,
    message: 'An error occurred',
  };

  // If we're in a development environment, add the stack trace and error message to the response
  if (process.env.NODE_ENV === 'development') {
    res.stackTrace = err.stack;
    res.error = err.toString();
  }

  // If the error has a status code of 400 or higher, it's a client error. Update the message accordingly.
  if (statusCode >= 400) {
    res.message = err.message;
  }

  // Send the response
  response.status(statusCode).json(res);
};

module.exports = errorHandler;