import { QueueOptions } from 'bullmq';

import { RedisService } from '../redis/redis.service';

export function getBullMQConfig(redisService: RedisService): QueueOptions {
  return {
    connection: redisService,
    defaultJobOptions: {
      attempts: 3,
      removeOnComplete: 1000,
      removeOnFail: 3000,
    },
  };
}
