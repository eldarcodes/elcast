import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import { PrismaService } from '@/src/core/prisma/prisma.service';

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string;

  public constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'));

    this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
  }

  @Start()
  onStart(@Ctx() ctx: Context) {
    const username = ctx.message.from.username;

    ctx.replyWithHTML(`Hello, ${username}!`);
  }
}
