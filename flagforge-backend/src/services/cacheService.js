const { redisClient } = require("../config/redis");
const Flag = require("../models/Flag");

const CACHE_TTL_SECONDS = 3600; // refresh from DB at least once an hour, even if nothing changes

function flagCacheKey(key) {
  return `flag:${key}`;
}

async function getFlagCached(key) {
  const cacheKey = flagCacheKey(key);
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const flag = await Flag.getFlagByKey(key);
  if (!flag) return null;

  await redisClient.set(cacheKey, JSON.stringify(flag), { EX: CACHE_TTL_SECONDS });
  return flag;
}


async function setFlagCache(flag) {
  const cacheKey = flagCacheKey(flag.key);
  await redisClient.set(cacheKey, JSON.stringify(flag), { EX: CACHE_TTL_SECONDS });
}

async function invalidateFlagCache(key) {
  await redisClient.del(flagCacheKey(key));
}

module.exports = { getFlagCached, setFlagCache, invalidateFlagCache };