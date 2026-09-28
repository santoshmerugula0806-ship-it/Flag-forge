const Flag = require("../models/Flag");
const { setFlagCache, invalidateFlagCache, getFlagCached } = require("./cacheService");
const { redisClient } = require("../config/redis");
const { isUserInRollout } = require("./bucketingService");

const FLAG_CHANGES_CHANNEL = "flag-changes";

// The orchestrator: creating a flag means writing to Postgres (source of
// truth), warming the Redis cache immediately (so the very next read is
// fast, not a forced miss), and publishing an event so every connected
// dashboard/server finds out in real time.
async function createFlag(data) {
  const flag = await Flag.createFlag(data);
  await setFlagCache(flag);
  await publishFlagChange(flag);
  return flag;
}

async function updateFlag(id, data) {
  const flag = await Flag.updateFlag(id, data);
  if (!flag) return null;

  await setFlagCache(flag);           // keep Redis in sync immediately
  await publishFlagChange(flag);      // tell every server/dashboard now
  return flag;
}

async function deleteFlag(id, key) {
  await Flag.deleteFlag(id);
  await invalidateFlagCache(key);
  await publishFlagChange({ key, deleted: true });
}

// The function your API/SDK actually calls to answer "is this flag on
// for this specific user?" — combines the cached flag config with the
// bucketing decision.
async function evaluateFlag(flagKey, userId) {
  const flag = await getFlagCached(flagKey);
  if (!flag || !flag.enabled) return false;

  return isUserInRollout(userId, flagKey, flag.rollout_percentage);
}

// Redis Pub/Sub: broadcasts a message that any subscribed process (like
// your WebSocket server) picks up and relays to connected dashboards —
// this is what makes updates "live" instead of requiring a page refresh.
async function publishFlagChange(flag) {
  await redisClient.publish(FLAG_CHANGES_CHANNEL, JSON.stringify(flag));
}

module.exports = {
  createFlag,
  updateFlag,
  deleteFlag,
  evaluateFlag,
  FLAG_CHANGES_CHANNEL,
};