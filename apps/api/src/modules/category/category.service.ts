import { Injectable, NotFoundException } from '@nestjs/common';

import type { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class CategoryService {
  private static readonly MAX_RANDOM_CATEGORIES = 7;

  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    const categories = await this.prismaService.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        streams: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });

    return categories;
  }

  public async findRandom() {
    const total = await this.prismaService.category.count();

    const randomIndexes = new Set<number>();
    const requiredSize = Math.min(total, CategoryService.MAX_RANDOM_CATEGORIES);

    while (randomIndexes.size < requiredSize) {
      const randomIndex = Math.floor(Math.random() * total);

      randomIndexes.add(randomIndex);
    }

    const categories = await this.prismaService.category.findMany({
      skip: 0,
      take: total,
      include: {
        streams: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });

    return Array.from(randomIndexes).map((index) => categories[index]);
  }

  public async findBySlug(slug: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        slug,
      },
      include: {
        streams: {
          include: {
            user: true,
            category: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
