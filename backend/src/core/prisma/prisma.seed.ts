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

async function main() {
  try {
    Logger.log('Starting seeding...');

    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.socialLink.deleteMany(),
      prisma.stream.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    await prisma.category.createMany({ data: CATEGORIES });

    Logger.log('Categories have been successfully created');

    const categories = await prisma.category.findMany();

    const categoriesBySlug = Object.fromEntries(
      categories.map((category) => [category.slug, category]),
    );

    await prisma.$transaction(
      async (tx) => {
        for (const displayName of DISPLAY_NAMES) {
          const username = displayName.toLowerCase();

          const randomCategory =
            categoriesBySlug[
              Object.keys(categoriesBySlug)[
                Math.floor(Math.random() * Object.keys(categoriesBySlug).length)
              ]
            ];

          const userExists = await tx.user.findUnique({
            where: {
              username,
            },
          });

          if (!userExists) {
            const createdUser = await tx.user.create({
              data: {
                email: `${username}@eldarcodes.com`,
                password: await hash('12345678'),
                username,
                displayName,
                avatar: `/channels/${username}.webp`,
                isEmailVerified: true,
                notificationSettings: {
                  create: {
                    siteNotifications: false,
                    telegramNotifications: false,
                  },
                },
                socialLinks: {
                  createMany: {
                    data: [
                      {
                        title: 'X',
                        url: `https://x.com/${username}`,
                        position: 1,
                      },
                      {
                        title: 'GitHub',
                        url: `https://github.com/${username}`,
                        position: 2,
                      },
                    ],
                  },
                },
              },
            });

            const randomTitles = STREAMS[randomCategory.slug];
            const randomTitle =
              randomTitles[Math.floor(Math.random() * randomTitles.length)];

            await tx.stream.create({
              data: {
                title: randomTitle,
                thumbnailUrl: `/streams/${createdUser.username}.webp`,
                user: {
                  connect: {
                    id: createdUser.id,
                  },
                },
                category: {
                  connect: {
                    id: randomCategory.id,
                  },
                },
              },
            });

            Logger.log(
              `User "${createdUser.username}" and his stream have been successfully created`,
            );
          }
        }
      },
      { timeout: 60000 },
    );
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Error while seeding the database');
  } finally {
    Logger.log('Closing the database connection...');
    await prisma.$disconnect();
    Logger.log('Seeding has been successfully completed');
  }
}

main();
