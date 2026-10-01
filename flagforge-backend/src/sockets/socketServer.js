const { Server } = require("socket.io");
const { createClient } = require("redis");
const { FLAG_CHANGES_CHANNEL } = require("../services/flagService");

function createSubscriberClient() {
  return createClient({
    socket: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    },
  });
}

async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // your Vite frontend
      methods: ["GET", "POST"],
    },
  });

  const subscriber = createSubscriberClient();
  subscriber.on("error", (err) => console.error("Redis subscriber error:", err));
  await subscriber.connect();

  
await subscriber.subscribe(FLAG_CHANGES_CHANNEL, (message) => {
    try {
      const flag = JSON.parse(message);
      io.emit("flag:changed", flag);
    } catch (err) {
      console.error("Failed to parse flag change message:", err);
    }
  });

  io.on("connection", (socket) => {
    console.log(`Dashboard connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Dashboard disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io server ready, subscribed to:", FLAG_CHANGES_CHANNEL);
  return io;
}

module.exports = { initSocketServer };