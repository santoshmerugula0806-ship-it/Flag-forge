const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const flagRoutes = require("./routes/flagRoutes");
const experimentRoutes = require("./routes/experimentRoutes");
const flagController = require("./controllers/flagController");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/flags", flagRoutes);
app.use("/api/experiments", experimentRoutes);

app.get("/api/evaluate/:key", flagController.evaluateFlag);

app.use(errorHandler);

module.exports = app;