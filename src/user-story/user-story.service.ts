import { UpdateOrderUserStoryDto } from './dto/update-order-user-story.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserStoryDto } from './dto/create-user-story.dto';
import { UpdateUserStoryDto } from './dto/update-user-story.dto';

@Injectable()
export class UserStoryService {
  constructor(private prisma: PrismaService) {}
  async create(createUserStoryDto: CreateUserStoryDto) {
    const { subject, description, projectId, statusId } = createUserStoryDto;
    const countUserStories = await this.countUserStories(projectId, statusId);
    const order = await this.createOrder(countUserStories);
    return await this.prisma.userStory.create({
      data: {
        subject,
        description,
        order,
        project: {
          connect: {
            id: projectId,
          },
        },
        usStatus: {
          connect: {
            id: statusId,
          },
        },
      },
    });
  }

  async countUserStories(projectId: number, statusId: number) {
    return await this.prisma.userStory.count({
      where: {
        projectId,
        usStatus: {
          id: statusId,
        },
      },
    });
  }

  async createOrder(countUserStories: number) {
    return countUserStories + 1;
  }

  async findAll() {
    const userStories = await this.prisma.userStory.findMany();
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

  async update(id: number, updateUserStoryDto: UpdateUserStoryDto) {
    return await this.prisma.userStory.update({
      where: {
        id,
      },
      data: updateUserStoryDto,
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
