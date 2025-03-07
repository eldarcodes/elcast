import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/prisma/generated';
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
