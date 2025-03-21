/* eslint-disable @typescript-eslint/no-magic-numbers */
import { v4 as uuidv4 } from 'uuid';

import type { TokenType, User } from '@/prisma/generated';
import type { PrismaService } from '@/src/core/prisma/prisma.service';

export async function generateToken(
  prismaService: PrismaService,
  user: User,
  tokenType: TokenType,
  isUUID = true,
) {
  let token = '';

  if (isUUID) {
    token = uuidv4();
  } else {
    token = Math.floor(
      Math.random() * (1_000_000 - 100_000) + 100_000,
    ).toString();
  }

  const expiresIn = new Date(
    // 5 minutes
    new Date().getTime() + 5 * 60 * 1000,
  );

  const newToken = await prismaService.token.create({
    data: {
      token,
      expiresIn,
      type: tokenType,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        include: {
          notificationSettings: true,
        },
      },
    },
  });

  return newToken;
}
