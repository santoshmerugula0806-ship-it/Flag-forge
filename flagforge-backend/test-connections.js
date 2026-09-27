// test-connections.js (delete after confirming it works)
const { testConnection } = require("./src/config/db");
const { redisClient, connectRedis } = require("./src/config/redis");

(async () => {
  await testConnection();
  await connectRedis();
  await redisClient.set("ping", "pong");
  console.log(await redisClient.get("ping"));
  process.exit(0);
})();

