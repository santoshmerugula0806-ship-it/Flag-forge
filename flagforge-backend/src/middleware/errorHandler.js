
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function errorHandler(err, req, res, next) {
  if (err.code === "23505") {
    return res.status(409).json({ error: "A record with that value already exists" });
  }

  const status = err.status || 500;

  if (status === 500) console.error(err);

  res.status(status).json({
    error: status === 500 ? "Internal server error" : err.message,
  });
}

module.exports = { asyncHandler, HttpError, errorHandler };