const jwt = require("jsonwebtoken");
const { HttpError } = require("./errorHandler");


function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new HttpError(401, "Missing or malformed Authorization header"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch (err) {
    next(new HttpError(401, "Invalid or expired token"));
  }
}


function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new HttpError(403, "You don't have permission to do that"));
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };