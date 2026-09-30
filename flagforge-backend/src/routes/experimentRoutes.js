const express = require("express");
const experimentController = require("../controllers/experimentController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, experimentController.listExperiments);
router.get("/:id", requireAuth, experimentController.getExperiment);
router.post("/", requireAuth, requireRole("admin"), experimentController.createExperiment);


router.post("/:id/visitors", experimentController.recordVisitor);
router.post("/:id/conversions", experimentController.recordConversion);

module.exports = router;