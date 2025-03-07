import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';

import { TokenType, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { SessionMetadata } from '@/src/shared/types/session-metadata.type';
import { generateToken } from '@/src/shared/utils/generate-token.util';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';
import { saveSession } from '@/src/shared/utils/session.util';

import { MailService } from '../../libs/mail/mail.service';

import { VerificationInput } from './inputs/verification.input';

@Injectable()
export class VerificationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  public async verify(
    req: Request,
    input: VerificationInput,
    userAgent: string,
  ) {
    const { token } = input;

    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token,
        type: TokenType.EMAIL_VERIFY,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Token not found');
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException('Token has expired');
    }

    const sessionMetadata = getSessionMetadata(req, userAgent);

    const user = await this.prismaService.user.findFirst({
      where: {
        id: existingToken.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      return saveSession(req, user, sessionMetadata);
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: true,
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.EMAIL_VERIFY,
      },
    });

    return saveSession(req, user, sessionMetadata);
  }

  public async sendVerificationToken(user: User) {
    const verificationToken = await generateToken(
      this.prismaService,
      user,
      TokenType.EMAIL_VERIFY,
    );

    await this.mailService.sendVerificationToken(
      user.email,
      verificationToken.token,
    );

    return true;
  }

  public async sendVerificationCode(user: User, metadata: SessionMetadata) {
    const verificationToken = await generateToken(
      this.prismaService,
      user,
      TokenType.EMAIL_VERIFY,
      false,
    );

    await this.mailService.sendVerificationCode(
      user.email,
      verificationToken.token,
      metadata,
    );

    return true;
  }
}
