import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserStoryDto } from './dto/create-user-story.dto';
import { UpdateUserStoryDto } from './dto/update-user-story.dto';

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
        project: {
          connect: {
            id: projectId,
          },
        },
        usStatus: {
          connect: {
            projectId_slug: {
              projectId,
              slug: statusSlug,
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

  findAll() {
    return `This action returns all userStory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userStory`;
  }

  update(id: number, updateUserStoryDto: UpdateUserStoryDto) {
    return `This action updates a #${id} userStory`;
  }

  remove(id: number) {
    return `This action removes a #${id} userStory`;
  }
}
