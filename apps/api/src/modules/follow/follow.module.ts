import { Module } from '@nestjs/common';

import { TelegramService } from '../libs/telegram/telegram.service';
import { NotificationModule } from '../notification/notification.module';

import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [NotificationModule],
  providers: [FollowResolver, FollowService, TelegramService],
})
export class FollowModule {}
