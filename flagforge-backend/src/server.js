require("dotenv").config();
const http = require("http");
const app = require("./app");
const { testConnection } = require("./config/db");
const { connectRedis } = require("./config/redis");

const PORT = process.env.PORT || 4000;

async function start() {
  await testConnection();
  await connectRedis();

  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`FlagForge API running on http://localhost:${PORT}`));
}

start();