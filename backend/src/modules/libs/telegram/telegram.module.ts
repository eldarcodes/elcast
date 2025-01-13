import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { getTelegrafConfig } from '@/src/core/config/telegraf.config';

import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService],
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: getTelegrafConfig,
    }),
  ],
})
export class TelegramModule {}
