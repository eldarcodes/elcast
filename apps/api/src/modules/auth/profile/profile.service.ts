import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';
import * as sharp from 'sharp';

import type { User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  AVATAR_HEIGHT,
  AVATAR_WIDTH,
  USERNAME_CHANGE_COOLDOWN_DAYS,
} from '@/src/shared/constants/account.constants';

import { StorageService } from '../../libs/storage/storage.service';

import { ChangeProfileInfoInput } from './inputs/change-info.input';
import { ChangeProfileUsernameInput } from './inputs/change-username.input';
import {
  SocialLinkInput,
  SocialLinkOrderInput,
} from './inputs/social-link.input';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  public async changeAvatar(user: User, file: Upload) {
    if (user.avatar) {
      await this.storageService.remove(user.avatar);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/channels/${user.username.toLowerCase()}.webp`;

    const options =
      file.fileName && file.fileName.endsWith('.gif') ? { animated: true } : {};

    const processedBuffer = await sharp(buffer, options)
      .resize(AVATAR_WIDTH, AVATAR_HEIGHT)
      .webp()
      .toBuffer();

    await this.storageService.upload(processedBuffer, fileName, 'image/webp');

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar: fileName },
    });

    return true;
  }

  public async removeAvatar(user: User) {
    if (!user.avatar) {
      return;
    }

    await this.storageService.remove(user.avatar);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { avatar: null },
    });

    return true;
  }

  public async changeUsername(user: User, input: ChangeProfileUsernameInput) {
    const { username: rawUsername } = input;

    const username = rawUsername.toLowerCase();

    if (user.username === username) {
      return true;
    }

    if (user.lastUsernameChange) {
      const now = new Date();
      const lastChange = new Date(user.lastUsernameChange);

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const ONE_DAY = 1000 * 3600 * 24;

      const daysSinceLastChange =
        (now.getTime() - lastChange.getTime()) / ONE_DAY;

      if (daysSinceLastChange < USERNAME_CHANGE_COOLDOWN_DAYS) {
        throw new ConflictException(
          `You can only change your username once every ${USERNAME_CHANGE_COOLDOWN_DAYS} days.`,
        );
      }
    }

    const usernameExists = await this.prismaService.user.findFirst({
      where: { username },
    });

    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        username,
        displayName: rawUsername,
        lastUsernameChange: new Date(),
      },
    });

    return true;
  }

  public async changeInfo(user: User, input: ChangeProfileInfoInput) {
    const { displayName, bio } = input;
    const { username } = user;

    if (displayName.toLowerCase() !== username) {
      throw new BadRequestException(
        'Display name must match username (case insensitive)',
      );
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { displayName, bio },
    });

    return true;
  }

  public async findSocialLinks(user: User) {
    const socialLinks = await this.prismaService.socialLink.findMany({
      where: { userId: user.id },
      orderBy: { position: 'asc' },
    });

    return socialLinks;
  }

  public async createSocialLink(user: User, input: SocialLinkInput) {
    const { title, url } = input;

    const lastSocialLink = await this.prismaService.socialLink.findFirst({
      where: { userId: user.id },
      orderBy: { position: 'desc' },
    });

    const INITIAL_POSITION = 1;

    const newPosition = lastSocialLink
      ? lastSocialLink.position + INITIAL_POSITION
      : INITIAL_POSITION;

    await this.prismaService.socialLink.create({
      data: {
        title,
        url,
        position: newPosition,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return true;
  }

  public async reorderSocialLinks(list: SocialLinkOrderInput[]) {
    if (!list.length) {
      return;
    }

    const updatePromises = list.map(({ id, position }) => {
      return this.prismaService.socialLink.update({
        where: { id },
        data: { position },
      });
    });

    await Promise.all(updatePromises);

    return true;
  }

  public async updateSocialLink(id: string, input: SocialLinkInput) {
    const { title, url } = input;

    await this.prismaService.socialLink.update({
      where: { id },
      data: { title, url },
    });

    return true;
  }

  public async removeSocialLink(id: string) {
    await this.prismaService.socialLink.delete({ where: { id } });

    return true;
  }
}
