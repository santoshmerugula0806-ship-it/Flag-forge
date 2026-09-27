const { pool } = require("../config/db");


async function getAllFlags() {
  const result = await pool.query(
    "SELECT * FROM flags ORDER BY updated_at DESC"
  );
  return result.rows;
}

async function getFlagById(id) {
  const result = await pool.query(
    "SELECT * FROM flags WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

async function getFlagByKey(key) {
  const result = await pool.query(
    "SELECT * FROM flags WHERE key = $1",
    [key]
  );
  return result.rows[0] || null;
}

async function createFlag({ key, description, enabled, rolloutPercentage }) {
  const result = await pool.query(
    `INSERT INTO flags (key, description, enabled, rollout_percentage)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [key, description, enabled, rolloutPercentage]
  );
  return result.rows[0];
}

async function updateFlag(id, { description, enabled, rolloutPercentage }) {
  const result = await pool.query(
    `UPDATE flags
     SET description = $1,
         enabled = $2,
         rollout_percentage = $3,
         updated_at = now()
     WHERE id = $4
     RETURNING *`,
    [description, enabled, rolloutPercentage, id]
  );
  return result.rows[0] || null;
}

async function deleteFlag(id) {
  await pool.query("DELETE FROM flags WHERE id = $1", [id]);
}

module.exports = {
  getAllFlags,
  getFlagById,
  getFlagByKey,
  createFlag,
  updateFlag,
  deleteFlag,
};