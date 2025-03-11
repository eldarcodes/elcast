import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { User } from '@/prisma/generated';
import { PubSubService } from '@/src/core/pubsub/pubsub.service';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';

import { ChangeNotificationSettingsInput } from './inputs/change-notification-settings.input';
import { ChangeNotificationsSettingsResponse } from './models/notification-settings.model';
import { NotificationModel } from './models/notification.model';
import { NotificationService } from './notification.service';

@Resolver('Notification')
export class NotificationResolver {
  public constructor(
    private readonly notificationService: NotificationService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Authorization()
  @Query(() => [NotificationModel], {
    name: 'findNotificationsByUser',
  })
  public async findNotificationsByUser(@Authorized() user: User) {
    return this.notificationService.findByUser(user);
  }

  @Authorization()
  @Query(() => Number, {
    name: 'findNotificationsUnreadCount',
  })
  public async findNotificationsUnreadCount(@Authorized() user: User) {
    return this.notificationService.findUnreadCount(user);
  }

  @Subscription(() => NotificationModel, {
    name: 'notificationAdded',
    filter: (payload, variables) => {
      return payload.notificationAdded.userId === variables.userId;
    },
  })
  public notificationAdded(@Args('userId') userId: string) {
    return this.pubSubService.subscribe('NOTIFICATION_ADDED');
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: 'markNotificationsAsRead',
  })
  public async markAsRead(@Authorized() user: User) {
    return this.notificationService.markAsRead(user);
  }

  @Authorization()
  @Mutation(() => ChangeNotificationsSettingsResponse, {
    name: 'changeNotificationSettings',
  })
  public async changeNotificationSettings(
    @Authorized() user: User,
    @Args('data') input: ChangeNotificationSettingsInput,
  ) {
    return this.notificationService.changeSettings(user, input);
  }
}
