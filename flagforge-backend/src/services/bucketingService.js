const crypto = require("crypto");

function getBucket(userId, flagKey) {
  const input = `${userId}:${flagKey}`;

  const hash = crypto.createHash("md5").update(input).digest("hex");

  const intValue = parseInt(hash.substring(0, 8), 16);

  return intValue % 100;
}

function isUserInRollout(userId, flagKey, rolloutPercentage) {
  if (rolloutPercentage <= 0) return false;
  if (rolloutPercentage >= 100) return true;

  const bucket = getBucket(userId, flagKey);
  return bucket < rolloutPercentage;
}

module.exports = { getBucket, isUserInRollout };