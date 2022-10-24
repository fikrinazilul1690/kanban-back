import { FilterUserStoryDto } from './dto/filter-user-story.dto';
import { UpdateOrderUserStoryDto } from './dto/update-order-user-story.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserStoryDto } from './dto/create-user-story.dto';
import { UpdateUserStoryDto } from './dto/update-user-story.dto';
import { Request } from 'express';

@Injectable()
export class UserStoryService {
  constructor(private prisma: PrismaService) {}
  async create(createUserStoryDto: CreateUserStoryDto) {
    const { subject, description, projectId, statusSlug } = createUserStoryDto;
    const countUserStories = await this.countUserStories(projectId, statusSlug);
    const order = await this.createOrder(countUserStories);
    return await this.prisma.userStory.create({
      data: {
        subject,
        description,
        order,
        usStatus: {
          connect: {
            projectId_slug: {
              projectId,
              slug: statusSlug || 'new',
            },
          },
        },
      },
    });
  }

  async countUserStories(projectId: number, statusSlug: string) {
    return await this.prisma.userStory.count({
      where: {
        projectId,
        usStatus: {
          slug: statusSlug,
        },
      },
    });
  }

  async createOrder(countUserStories: number) {
    return countUserStories + 1;
  }

  async findAll(query: FilterUserStoryDto) {
    const { projectId, statusSlug } = query;
    const userStories = await this.prisma.userStory.findMany({
      where: {
        statusSlug,
        ...(!!projectId && { projectId }),
      },
    });
    if (userStories.length === 0)
      throw new NotFoundException('User stories does not exist');
    return userStories;
  }

  async findOne(id: number) {
    const userStory = await this.prisma.userStory.findUnique({
      where: {
        id,
      },
    });
    if (!userStory)
      throw new NotFoundException(`User story with id:${id} does not exist`);
    return userStory;
  }

  async update(
    id: number,
    updateUserStoryDto: UpdateUserStoryDto,
    req: Request,
  ) {
    const { description, subject, statusSlug } = updateUserStoryDto;
    const projectId = +req.cookies['currentProject'];
    const count = await this.countUserStories(projectId, statusSlug);

    let order: number;

    if (req.userStory.statusSlug !== statusSlug) {
      order = await this.createOrder(count);
    }
    return await this.prisma.userStory.update({
      where: {
        id,
      },
      data: {
        subject,
        description,
        usStatus: {
          connect: {
            projectId_slug: {
              slug: statusSlug,
              projectId,
            },
          },
        },
        order,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.userStory.delete({ where: { id } });
  }

  async updateOrder(updateOrderUsDto: UpdateOrderUserStoryDto) {
    const { bulkStories } = updateOrderUsDto;
    return await this.prisma.$transaction(
      bulkStories.map((us) => {
        const { id, order } = us;
        return this.prisma.userStory.update({
          where: { id },
          data: {
            order,
          },
        });
      }),
    );
  }
}
