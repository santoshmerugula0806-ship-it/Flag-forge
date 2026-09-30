const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler, HttpError } = require("../middleware/errorHandler");

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new HttpError(400, "name, email and password are required");
  }
  if (password.length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters");
  }

  const existing = await User.getUserByEmail(email);
  if (existing) throw new HttpError(409, "Email already registered");

  // Role is NOT taken from the request body: otherwise anyone could
  // register themselves as an admin. New users are always "viewer".
  const user = await User.createUser({ name, email, password });

  res.status(201).json({ user, token: signToken(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, "email and password are required");
  }

  const user = await User.getUserByEmail(email);

  // Same message for "no such user" and "wrong password", so an attacker
  // can't use the response to discover which emails are registered.
  if (!user || !(await User.verifyPassword(password, user.password_hash))) {
    throw new HttpError(401, "Invalid email or password");
  }

  // Strip the hash before sending anything back.
  const { password_hash, ...safeUser } = user;

  res.json({ user: safeUser, token: signToken(user) });
});

module.exports = { register, login };