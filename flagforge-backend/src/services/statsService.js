
function normalCdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) prob = 1 - prob;
  return prob;
}

function calculateConfidence(variantA, variantB) {
  const { conversions: convA, visitors: visitorsA } = variantA;
  const { conversions: convB, visitors: visitorsB } = variantB;

  if (visitorsA < 30 || visitorsB < 30) {
    return { confidence: 0, significant: false, reason: "insufficient sample size" };
  }

  const p1 = convA / visitorsA;
  const p2 = convB / visitorsB;

  
  const pooledP = (convA + convB) / (visitorsA + visitorsB);

  const standardError = Math.sqrt(
    pooledP * (1 - pooledP) * (1 / visitorsA + 1 / visitorsB)
  );

  if (standardError === 0) {
    return { confidence: 0, significant: false, reason: "no variance in data" };
  }

  const zScore = (p2 - p1) / standardError;

  const confidence = (1 - 2 * (1 - normalCdf(Math.abs(zScore)))) * 100;

  return {
    confidence: Math.max(0, Math.round(confidence * 10) / 10),
    significant: confidence >= 95,
    winningVariant: p2 > p1 ? "B" : "A",
    rateA: Math.round(p1 * 1000) / 10,
    rateB: Math.round(p2 * 1000) / 10,
  };
}

module.exports = { calculateConfidence, normalCdf };