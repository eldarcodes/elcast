import {
  CopyObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Logger } from '@nestjs/common';
import { hash } from 'argon2';

import { Prisma, PrismaClient } from '../../../prisma/generated';

import { CATEGORIES } from './data/categories.data';
import { STREAMS } from './data/streams.data';
import { DISPLAY_NAMES } from './data/users.data';

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000,
    timeout: 10000,
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,

  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

async function cleanupOldAssets() {
  const folderPrefixes = ['avatars/', 'streams/'];

  try {
    for (const prefix of folderPrefixes) {
      const listResponse = await s3.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          Prefix: prefix,
        }),
      );

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        continue;
      }

      const objectsToDelete = listResponse.Contents.map(({ Key }) => ({ Key }));

      await s3.send(
        new DeleteObjectsCommand({
          Bucket: BUCKET_NAME,
          Delete: { Objects: objectsToDelete },
        }),
      );

      Logger.log(`Deleted ${objectsToDelete.length} files from ${prefix}`);
    }
  } catch (error) {
    Logger.error('Error deleting files:', error);
  }
}

function getRandomTags(tags: string[]): string[] {
  const count = Math.floor(Math.random() * tags.length) + 1;
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  try {
    Logger.log('Starting seeding...');

    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.socialLink.deleteMany(),
      prisma.stream.deleteMany(),
      prisma.category.deleteMany(),
      prisma.chatMessage.deleteMany(),
      prisma.follow.deleteMany(),
      prisma.oAuthAccount.deleteMany(),
      prisma.notification.deleteMany(),
      prisma.notificationSettings.deleteMany(),
    ]);

    await cleanupOldAssets();

    for (const category of CATEGORIES) {
      await prisma.category.create({
        data: {
          title: category.title,
          slug: category.slug,
          thumbnailUrl: category.thumbnailUrl,
          description: category.description,
          tags: {
            create: category.tags.map((tag) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tag },
                  create: { name: tag },
                },
              },
            })),
          },
        },
      });
    }

    Logger.log('Categories have been successfully created');

    const categories = await prisma.category.findMany({
      include: { tags: { include: { tag: true } } },
    });

    const categoriesBySlug = Object.fromEntries(
      categories.map((category) => [category.slug, category]),
    );

    const streamList = Object.entries(STREAMS).flatMap(([category, titles]) =>
      titles.map((title) => ({ category, title })),
    );

    const usedCategoryImages = CATEGORIES.reduce((acc, category) => {
      return { ...acc, [category.slug]: 0 };
    }, {});

    await prisma.$transaction(
      async (tx) => {
        for (const [index, displayName] of DISPLAY_NAMES.entries()) {
          const currentIndex = index + 1;

          const username = displayName.toLowerCase();

          const userExists = await tx.user.findUnique({
            where: { username },
          });

          if (userExists) {
            Logger.log(`User "${username}" already exists`);
            continue;
          }

          const randomDaysAgo = Math.floor(Math.random() * 7) + 1;
          const lastActive = new Date();
          lastActive.setDate(lastActive.getDate() - randomDaysAgo);

          const createdUser = await tx.user.create({
            data: {
              email: `${username}@eldarcodes.com`,
              password: await hash('12345678'),
              username,
              displayName,
              isEmailVerified: true,
              isVerified: Math.random() < 0.4,
              lastActive,
              notificationSettings: {
                create: {
                  siteNotifications: true,
                  telegramNotifications: false,
                },
              },
              socialLinks: {
                createMany: {
                  data: [
                    {
                      title: 'Telegram',
                      url: `https://t.me/${username}`,
                      position: 1,
                    },
                    {
                      title: 'Instagram',
                      url: `https://instagram.com/${username}`,
                      position: 2,
                    },
                  ],
                },
              },
            },
          });

          // Add user stream with thumbnail
          const stream = streamList[index];
          const category = categoriesBySlug[stream.category];

          usedCategoryImages[stream.category]++;

          await tx.stream.create({
            data: {
              title: stream.title,
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
              tags: {
                create: getRandomTags(
                  category.tags.map((tag) => tag.tag.name),
                ).map((tag) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tag },
                      create: { name: tag },
                    },
                  },
                })),
              },
              category: {
                connect: {
                  id: category.id,
                },
              },
            },
          });

          try {
            const userAvatarSource = `/seeder/avatars/${currentIndex}.webp`;
            const userAvatarDestination = `avatars/${createdUser.id}.webp`;

            const streamThumbnailSource = `/seeder/streams/${stream.category}/${usedCategoryImages[stream.category]}.webp`;
            const streamThumbnailDestination = `streams/${createdUser.id}.webp`;

            // 300x300
            await s3.send(
              new CopyObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                CopySource: `${process.env.S3_BUCKET_NAME}${userAvatarSource}`,
                Key: userAvatarDestination,
              }),
            );

            // 1656x932
            await s3.send(
              new CopyObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                CopySource: `${process.env.S3_BUCKET_NAME}${streamThumbnailSource}`,
                Key: streamThumbnailDestination,
              }),
            );

            await tx.user.update({
              where: { id: createdUser.id },
              data: {
                avatar: `/${userAvatarDestination}`,
              },
            });

            await tx.stream.update({
              where: { userId: createdUser.id },
              data: {
                thumbnailUrl: `/${streamThumbnailDestination}`,
              },
            });
          } catch (error) {
            Logger.error('Error copying seeder files:', error);
            continue;
          }

          Logger.log(
            `User "${createdUser.username}" and his stream have been successfully created`,
          );
        }
      },
      { timeout: 300000 }, // 5 minutes
    );
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Error while seeding the database');
  } finally {
    Logger.log('Closing the database connection...');
    await prisma.$disconnect();
    Logger.log('Seeding has been successfully completed');

    process.exit(0);
  }
}

main();
