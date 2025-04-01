import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request } from 'express';

import { TokenType, User } from '@/prisma/generated';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { EMAIL_CHANGE_COOLDOWN_DAYS } from '@/src/shared/constants/account.constants';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';

import { VerificationService } from '../verification/verification.service';

import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly verificationService: VerificationService,
  ) {}

  public async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  public async me({ id }: User) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { socialLinks: true, notificationSettings: true, stream: true },
    });

    return {
      ...user,
      hasPassword: !!user.password,
    };
  }

  public async create(input: CreateUserInput) {
    const { email, password, username: rawUsername } = input;

    const username = rawUsername.toLowerCase();

    const isUsernameTaken = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (isUsernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    const isEmailTaken = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (isEmailTaken) {
      throw new ConflictException('Email is already taken');
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        username,
        password: await argon2.hash(password),
        displayName: rawUsername,
        stream: {
          create: {
            title: `Stream ${rawUsername}`,
          },
        },
        notificationSettings: {
          create: {
            siteNotifications: true,
            telegramNotifications: false,
          },
        },
      },
    });

    await this.verificationService.sendVerificationToken(user);

    return true;
  }

  public async changeEmail(
    req: Request,
    user: User,
    input: ChangeEmailInput,
    userAgent: string,
  ) {
    const { email, pin } = input;

    if (user.email === email && !pin) {
      return { user };
    }

    if (user.lastEmailChange && !pin) {
      const now = new Date();
      const lastChange = new Date(user.lastEmailChange);

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const ONE_DAY = 1000 * 3600 * 24;

      const daysSinceLastChange =
        (now.getTime() - lastChange.getTime()) / ONE_DAY;

      if (daysSinceLastChange < EMAIL_CHANGE_COOLDOWN_DAYS) {
        throw new ConflictException(
          `You can only change your email once every ${EMAIL_CHANGE_COOLDOWN_DAYS} days.`,
        );
      }
    }

    const sessionMetadata = getSessionMetadata(req, userAgent);

    const emailExists = await this.prismaService.user.findFirst({
      where: { email, AND: { id: { not: user.id } } },
    });

    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const newUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email,
        lastEmailChange: new Date(),
        isEmailVerified: false,
      },
    });

    if (!pin) {
      await this.verificationService.sendVerificationCode(
        newUser,
        sessionMetadata,
      );

      return {
        message: 'PIN_REQUIRED',
      };
    }

    await this.validateEmailVerificationToken(pin);

    return {
      message: 'Email has been changed',
    };
  }

  public async changePassword(user: User, input: ChangePasswordInput) {
    const { oldPassword, newPassword } = input;

    let isValidPassword = false;

    if (user.password) {
      isValidPassword = await argon2.verify(user.password, oldPassword);
    } else {
      isValidPassword = true;
    }

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: await argon2.hash(newPassword),
      },
    });

    return true;
  }

  public async isUsernameTaken(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: { id: true },
    });

    return !!user;
  }

  private async validateEmailVerificationToken(token: string) {
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

    await this.prismaService.user.update({
      where: {
        id: existingToken.userId,
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

    return true;
  }
}
