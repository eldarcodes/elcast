import { Module } from '@nestjs/common';

import { PubSubModule } from '@/src/core/pubsub/pubsub.module';

import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  imports: [PubSubModule],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
