import { randomBytes } from 'node:crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { encode } from 'hi-base32';
import { TOTP } from 'otpauth';
import * as QRCode from 'qrcode';

import type { User } from '@/prisma/generated';
import type { PrismaService } from '@/src/core/prisma/prisma.service';

import type { EnableTotpInput } from './inputs/enable-totp.input';

@Injectable()
export class TotpService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async generate(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const secret = encode(randomBytes(15)).replace(/=/g, '').substring(0, 24);

    const totp = new TOTP({
      issuer: 'Elcast',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    });

    const otpAuthUrl = totp.toString();
    const qrcodeUrl = await QRCode.toDataURL(otpAuthUrl);

    return {
      qrcodeUrl,
      secret,
    };
  }

  public async enable(user: User, input: EnableTotpInput) {
    const { pin, secret } = input;

    const totp = new TOTP({
      issuer: 'Elcast',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    });

    const delta = totp.validate({ token: pin });

    if (delta === null) {
      throw new BadRequestException('Invalid pin');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        isTotpEnabled: true,
        totpSecret: secret,
      },
    });

    return true;
  }

  public async disable(user: User) {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        isTotpEnabled: false,
        totpSecret: null,
      },
    });

    return true;
  }
}
