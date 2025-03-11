import { type MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { RawBodyMiddleware } from '@/src/shared/middlewares/raw-body.middleware';

import { TelegramService } from '../libs/telegram/telegram.service';
import { NotificationModule } from '../notification/notification.module';

import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [NotificationModule],
  controllers: [WebhookController],
  providers: [WebhookService, TelegramService],
})
export class WebhookModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes({
      path: 'webhook/livekit',
      method: RequestMethod.POST,
    });
  }
}
