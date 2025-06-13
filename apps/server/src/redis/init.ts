import { redis } from "bun";

export async function setupRedis() {
  await redis.connect();
}