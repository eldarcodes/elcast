import { Module } from '@nestjs/common';

import { NotificationModule } from '../notification/notification.module';

import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  providers: [FollowResolver, FollowService, NotificationModule],
})
export class FollowModule {}
