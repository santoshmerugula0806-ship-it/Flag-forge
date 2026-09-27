const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "flagforge",
  max: 20,                     
  idleTimeoutMillis: 30000,    
  connectionTimeoutMillis: 5000, 
});

pool.on("error", (err) => {
  console.error("Unexpected Postgres pool error:", err);
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Postgres connected:", result.rows[0].now);
  } catch (err) {
    console.error("Postgres connection failed:", err.message);
    process.exit(1); 
  }
}

module.exports = { pool, testConnection };