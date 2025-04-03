import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  public constructor(private readonly configService: ConfigService) {
    super({
      host: configService.getOrThrow<string>('REDIS_HOST'),
      port: configService.getOrThrow<number>('REDIS_PORT'),
      password: configService.getOrThrow<string>('REDIS_PASSWORD'),
      username: configService.getOrThrow<string>('REDIS_USER'),

      maxRetriesPerRequest: null,
    });
  }
}
