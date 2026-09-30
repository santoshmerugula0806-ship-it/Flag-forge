const Experiment = require("../models/Experiment");
const { calculateConfidence } = require("../services/statsService");
const { asyncHandler, HttpError } = require("../middleware/errorHandler");

// Turns a raw DB row into the shape the frontend expects,
// including live statistics computed by statsService.
function formatExperiment(row) {
  const variantA = {
    name: row.variant_a_name,
    conversions: row.variant_a_conversions,
    visitors: row.variant_a_visitors,
  };
  const variantB = {
    name: row.variant_b_name,
    conversions: row.variant_b_conversions,
    visitors: row.variant_b_visitors,
  };

  const stats = calculateConfidence(variantA, variantB);

  return {
    id: row.id,
    name: row.name,
    variantA,
    variantB,
    confidence: stats.confidence,
    significant: stats.significant,
    winningVariant: stats.winningVariant || null,
  };
}

function parseVariant(value) {
  const variant = String(value || "").toUpperCase();
  if (variant !== "A" && variant !== "B") {
    throw new HttpError(400, 'variant must be "A" or "B"');
  }
  return variant;
}

const listExperiments = asyncHandler(async (req, res) => {
  const rows = await Experiment.getAllExperiments();
  res.json(rows.map(formatExperiment));
});

const getExperiment = asyncHandler(async (req, res) => {
  const row = await Experiment.getExperimentById(req.params.id);
  if (!row) throw new HttpError(404, "Experiment not found");
  res.json(formatExperiment(row));
});

const createExperiment = asyncHandler(async (req, res) => {
  const { name, variantAName, variantBName } = req.body;

  if (!name || !variantAName || !variantBName) {
    throw new HttpError(400, "name, variantAName and variantBName are required");
  }

  const row = await Experiment.createExperiment({ name, variantAName, variantBName });
  res.status(201).json(formatExperiment(row));
});

// Called when a user is shown a variant.
const recordVisitor = asyncHandler(async (req, res) => {
  const variant = parseVariant(req.body.variant);
  const row = await Experiment.recordVisitor(req.params.id, variant);
  if (!row) throw new HttpError(404, "Experiment not found");
  res.json(formatExperiment(row));
});

// Called when a user who saw a variant completes the goal (e.g. purchase).
const recordConversion = asyncHandler(async (req, res) => {
  const variant = parseVariant(req.body.variant);
  const row = await Experiment.recordConversion(req.params.id, variant);
  if (!row) throw new HttpError(404, "Experiment not found");
  res.json(formatExperiment(row));
});

module.exports = {
  listExperiments,
  getExperiment,
  createExperiment,
  recordVisitor,
  recordConversion,
};