import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { PrismaService } from '@/src/core/prisma/prisma.service';

import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  public async me(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async create(input: CreateUserInput) {
    const { email, password, username } = input;

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

    await this.prismaService.user.create({
      data: {
        email,
        username,
        password: await argon2.hash(password),
        displayName: username,
      },
    });

    return true;
  }
}
