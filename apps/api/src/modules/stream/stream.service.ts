import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Upload from 'graphql-upload/Upload.js';
import { AccessToken } from 'livekit-server-sdk';
import * as sharp from 'sharp';

import type { Prisma, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  STREAM_THUMBNAIL_HEIGHT,
  STREAM_THUMBNAIL_WIDTH,
} from '@/src/shared/constants/stream.constants';

import { StorageService } from '../libs/storage/storage.service';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { FiltersInput } from './inputs/filters.input';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';

@Injectable()
export class StreamService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
  ) {}

  private static readonly STREAM_PAGE_SIZE = 12;
  private static readonly STREAM_INITIAL_SKIP = 0;
  private static readonly MAX_RANDOM_STREAMS = 4;

  public async findAll(input: FiltersInput = {}) {
    const { skip, take, searchTerm } = input;

    const whereClause = searchTerm
      ? this.findBySearchTermFilter(searchTerm)
      : undefined;

    const streams = await this.prismaService.stream.findMany({
      take: take ?? StreamService.STREAM_PAGE_SIZE,
      skip: skip ?? StreamService.STREAM_INITIAL_SKIP,

      where: {
        user: {
          isDeactivated: false,
        },
        ...whereClause,
      },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return streams;
  }

  public async generateToken(input: GenerateStreamTokenInput) {
    const { channelId, userId } = input;

    let self: { id: string; username: string };

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      self = {
        id: user.id,
        username: user.username,
      };
    } else {
      self = {
        id: userId,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        username: `Viewer ${Math.floor(Math.random() * 100_000)}`,
      };
    }

    const channel = await this.prismaService.user.findUnique({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    const isHost = channel.id === self.id;

    const token = new AccessToken(
      this.configService.getOrThrow<string>('LIVEKIT_API_KEY'),
      this.configService.getOrThrow<string>('LIVEKIT_API_SECRET'),
      {
        identity: isHost ? `Host-${self.id}` : self.id.toString(),
        name: self.username,
      },
    );

    token.addGrant({
      room: channel.id,
      roomJoin: true,
      canPublish: false,
    });

    return {
      token: token.toJwt(),
    };
  }

  public async findRandom() {
    const total = await this.prismaService.stream.count({
      where: {
        user: {
          isDeactivated: false,
        },
      },
    });

    const randomIndexes = new Set<number>();
    const requiredSize = Math.min(total, StreamService.MAX_RANDOM_STREAMS);

    while (randomIndexes.size < requiredSize) {
      const randomIndex = Math.floor(Math.random() * total);

      randomIndexes.add(randomIndex);
    }

    const streams = await this.prismaService.stream.findMany({
      where: {
        user: {
          isDeactivated: false,
        },
      },
      include: {
        user: true,
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      skip: 0,
      take: total,
    });

    return Array.from(randomIndexes).map((index) => streams[index]);
  }

  public async changeInfo(user: User, input: ChangeStreamInfoInput) {
    const { title, categoryId, tags } = input;

    const stream = await this.prismaService.stream.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!stream) {
      throw new Error('Stream not found');
    }

    const streamId = stream.id;

    const tagRecords = await Promise.all(
      tags.map(async (tagName) => {
        return this.prismaService.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      }),
    );

    await this.prismaService.streamTag.deleteMany({
      where: { streamId },
    });

    await this.prismaService.streamTag.createMany({
      data: tagRecords.map((tag) => ({
        streamId,
        tagId: tag.id,
      })),
      skipDuplicates: true,
    });

    await this.prismaService.stream.update({
      where: { id: streamId },
      data: {
        title,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return true;
  }

  public async changeThumbnail(user: User, file: Upload) {
    const stream = await this.findByUserId(user);

    if (stream.thumbnailUrl) {
      await this.storageService.remove(stream.thumbnailUrl);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/streams/${user.id}.webp`;

    const options =
      file.fileName && file.fileName.endsWith('.gif') ? { animated: true } : {};

    const processedBuffer = await sharp(buffer, options)
      .resize(STREAM_THUMBNAIL_WIDTH, STREAM_THUMBNAIL_HEIGHT)
      .webp()
      .toBuffer();

    await this.storageService.upload(processedBuffer, fileName, 'image/webp');

    await this.prismaService.stream.update({
      where: { userId: user.id },
      data: {
        thumbnailUrl: fileName,
      },
    });

    return true;
  }

  public async removeThumbnail(user: User) {
    const stream = await this.findByUserId(user);

    if (!stream.thumbnailUrl) {
      return;
    }

    await this.storageService.remove(stream.thumbnailUrl);

    await this.prismaService.stream.update({
      where: { userId: user.id },
      data: {
        thumbnailUrl: null,
      },
    });

    return true;
  }

  private async findByUserId(user: User) {
    const stream = await this.prismaService.stream.findUnique({
      where: { userId: user.id },
    });

    return stream;
  }

  private findBySearchTermFilter(searchTerm: string): Prisma.StreamWhereInput {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          user: {
            username: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          category: {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }
}
