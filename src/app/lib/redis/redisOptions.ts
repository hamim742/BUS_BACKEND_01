import Redis, { RedisOptions } from "ioredis";

console.log("Redis Host:", process.env.REDIS_HOST, "Port:", process.env.REDIS_PORT);
export const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    retryStrategy: (times: number) => {
        if (times > 5) return undefined;
        return Math.min(times * 100, 3000);
    },
    connectTimeout: 10000,
    keepAlive: 30000,
    maxRetriesPerRequest: null,
};

export const redis = new Redis(redisOptions);
