import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  public constructor(private readonly prismaService: PrismaService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    request.user = null;

    if (typeof request.session.userId === 'undefined') {
      return true;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: request.session.userId },
    });

    if (!user) {
      return true;
    }

    request.user = user;

    return true;
  }
}
