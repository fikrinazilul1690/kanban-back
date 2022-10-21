import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import slugify from 'slugify';

@Injectable()
export class TaskStatusService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskStatusDto: CreateTaskStatusDto) {
    const { projectId, name, isClosed, colorHex } = createTaskStatusDto;
    const slug = await this.createSlug(name, projectId);
    return await this.prisma.taskStatus.create({
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
        name,
        slug,
        isClosed,
        color: {
          connectOrCreate: {
            where: {
              hex: colorHex,
            },
            create: {
              hex: colorHex,
            },
          },
        },
      },
    });
  }

  async findAll() {
    const taskStatuses = await this.prisma.taskStatus.findMany();
    if (taskStatuses.length === 0)
      throw new NotFoundException('User story statuses not Found!');
    return taskStatuses;
  }

  async findBySlug(slug: string, projectId: number) {
    const project = await this.prisma.taskStatus.findUnique({
      where: {
        projectId_slug: {
          projectId,
          slug,
        },
      },
    });

    return project;
  }

  async countSlug(name: string, projectId: number) {
    const projectCount = await this.prisma.taskStatus.count({
      where: {
        projectId,
        name,
      },
    });

    return projectCount;
  }

  async createSlug(name: string, projectId: number) {
    let slug = slugify(name, { lower: true });
    const slugExist = await this.findBySlug(slug, projectId);
    const countSlug = await this.countSlug(name, projectId);
    if (slugExist) {
      slug = slugify(`${name} ${countSlug === 0 ? 1 : countSlug}`, {
        lower: true,
      });
    }

    return slug;
  }

  async findOne(id: number) {
    const taskStatus = await this.prisma.taskStatus.findUnique({
      where: { id },
    });
    if (!taskStatus) {
      throw new NotFoundException(
        `user story status with id:${id} does not exist`,
      );
    }
    return taskStatus;
  }

  async update(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    const { name, isClosed, colorHex } = updateTaskStatusDto;
    return await this.prisma.taskStatus.update({
      where: { id },
      data: {
        name,
        isClosed,
        color: {
          connectOrCreate: {
            where: {
              hex: colorHex,
            },
            create: {
              hex: colorHex,
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.taskStatus.delete({ where: { id } });
  }
}
