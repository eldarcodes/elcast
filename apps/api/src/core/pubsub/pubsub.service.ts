import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSubService {
  private pubSub = new PubSub();

  async publish(triggerName: string, payload: any) {
    return this.pubSub.publish(triggerName, payload);
  }

  async subscribe(triggerName: string) {
    return this.pubSub.asyncIterableIterator(triggerName);
  }
}
