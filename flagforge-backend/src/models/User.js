const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function createUser({ name, email, password, role = "viewer" }) {
 
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, role, created_at`, 
    [name, email, passwordHash, role]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

module.exports = {
  createUser,
  getUserByEmail,
  verifyPassword,
};