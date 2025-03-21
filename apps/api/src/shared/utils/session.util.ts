import { InternalServerErrorException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

import type { User } from '@/prisma/generated';

import type { SessionMetadata } from '../types/session-metadata.type';

import { parseBoolean } from './parse-boolean.util';

export function saveSession(
  req: Request,
  user: User,
  metadata: SessionMetadata,
) {
  return new Promise((resolve, reject) => {
    req.session.createdAt = new Date();
    req.session.userId = user.id;
    req.session.metadata = metadata;

    req.session.save((err) => {
      if (err) {
        return reject(new InternalServerErrorException('Error saving session'));
      }

      resolve({ user });
    });
  });
}

export function destroySession(req: Request, configService: ConfigService) {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        return reject(
          new InternalServerErrorException('Error destroying session'),
        );
      }

      req.res.clearCookie(configService.getOrThrow<string>('SESSION_NAME'), {
        domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
        path: '/',
        httpOnly: parseBoolean(
          configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
        ),
        secure: parseBoolean(
          configService.getOrThrow<string>('SESSION_SECURE'),
        ),
      });

      resolve(true);
    });
  });
}
