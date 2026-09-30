const Flag = require("../models/Flag");
const flagService = require("../services/flagService");
const { asyncHandler, HttpError } = require("../middleware/errorHandler");

function validateRollout(value) {
  return Number.isInteger(value) && value >= 0 && value <= 100;
}

const listFlags = asyncHandler(async (req, res) => {
  const flags = await Flag.getAllFlags();
  res.json(flags);
});

const getFlag = asyncHandler(async (req, res) => {
  const flag = await Flag.getFlagById(req.params.id);
  if (!flag) throw new HttpError(404, "Flag not found");
  res.json(flag);
});

const createFlag = asyncHandler(async (req, res) => {
  const { key, description = "", enabled = false, rolloutPercentage = 0 } = req.body;

  if (!key || !/^[a-z0-9-]+$/.test(key)) {
    throw new HttpError(400, "key is required and may only contain lowercase letters, numbers and hyphens");
  }
  if (!validateRollout(rolloutPercentage)) {
    throw new HttpError(400, "rolloutPercentage must be an integer between 0 and 100");
  }

  const flag = await flagService.createFlag({ key, description, enabled, rolloutPercentage });
  res.status(201).json(flag);
});

const updateFlag = asyncHandler(async (req, res) => {
  const { description = "", enabled, rolloutPercentage } = req.body;

  if (typeof enabled !== "boolean") {
    throw new HttpError(400, "enabled must be true or false");
  }
  if (!validateRollout(rolloutPercentage)) {
    throw new HttpError(400, "rolloutPercentage must be an integer between 0 and 100");
  }

  const flag = await flagService.updateFlag(req.params.id, { description, enabled, rolloutPercentage });
  if (!flag) throw new HttpError(404, "Flag not found");
  res.json(flag);
});

const deleteFlag = asyncHandler(async (req, res) => {
  const flag = await Flag.getFlagById(req.params.id);
  if (!flag) throw new HttpError(404, "Flag not found");

  await flagService.deleteFlag(flag.id, flag.key);
  res.status(204).send();
});

// The endpoint an app or SDK calls: "is this flag on for this user?"
// GET /api/evaluate/new-checkout-flow?userId=user_42
const evaluateFlag = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { userId } = req.query;

  if (!userId) throw new HttpError(400, "userId query parameter is required");

  const enabled = await flagService.evaluateFlag(key, userId);
  res.json({ flag: key, userId, enabled });
});

module.exports = { listFlags, getFlag, createFlag, updateFlag, deleteFlag, evaluateFlag };