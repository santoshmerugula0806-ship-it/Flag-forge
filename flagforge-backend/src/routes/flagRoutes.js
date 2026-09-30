const express = require("express");
const flagController = require("../controllers/flagController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, flagController.listFlags);
router.get("/:id", requireAuth, flagController.getFlag);

router.post("/", requireAuth, requireRole("admin"), flagController.createFlag);
router.put("/:id", requireAuth, requireRole("admin"), flagController.updateFlag);
router.delete("/:id", requireAuth, requireRole("admin"), flagController.deleteFlag);

module.exports = router;