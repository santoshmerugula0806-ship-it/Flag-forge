const { pool } = require("../config/db");

async function getAllExperiments() {
  const result = await pool.query(
    "SELECT * FROM experiments ORDER BY updated_at DESC"
  );
  return result.rows;
}

async function getExperimentById(id) {
  const result = await pool.query(
    "SELECT * FROM experiments WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
}

async function createExperiment({ name, variantAName, variantBName }) {
  const result = await pool.query(
    `INSERT INTO experiments (name, variant_a_name, variant_b_name)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, variantAName, variantBName]
  );
  return result.rows[0];
}

async function recordVisitor(id, variant) {
  const column = variant === "A" ? "variant_a_visitors" : "variant_b_visitors";
  const result = await pool.query(
    `UPDATE experiments SET ${column} = ${column} + 1, updated_at = now()
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function recordConversion(id, variant) {
  const column = variant === "A" ? "variant_a_conversions" : "variant_b_conversions";
  const result = await pool.query(
    `UPDATE experiments SET ${column} = ${column} + 1, updated_at = now()
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllExperiments,
  getExperimentById,
  createExperiment,
  recordVisitor,
  recordConversion,
};