import { Module } from '@nestjs/common';

import { PubSubModule } from '@/src/core/pubsub/pubsub.module';

import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';

@Module({
  imports: [PubSubModule],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
