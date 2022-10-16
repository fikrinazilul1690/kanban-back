import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findMe(user: User) {
    const userData = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { members: { include: { role: true } } },
    });

    return userData;
  }

  async findAll(filter: FilterUserDto) {
    let users = await this.prisma.user.findMany({
      include: {
        members: {
          include: {
            role: true,
          },
        },
      },
    });
    if (filter?.projectId) {
      users = await this.prisma.user.findMany({
        where: {
          members: {
            some: {
              projectId: {
                equals: filter.projectId,
              },
            },
          },
        },
        include: {
          members: {
            where: {
              projectId: filter.projectId,
            },
            include: {
              role: true,
            },
          },
        },
      });
    }

    return users;
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        members: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User Not Found!');

    return user;
  }
}
