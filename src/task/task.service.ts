import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateOrderTaskDto } from './dto/update-order-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    const { projectId, usId, subject, description, statusSlug } = createTaskDto;
    const countTask = await this.countTask(projectId, statusSlug);
    const order = await this.createOrder(countTask);
    return await this.prisma.task.create({
      data: {
        subject,
        description,
        order,
        taskStatus: {
          connect: {
            projectId_slug: {
              projectId,
              slug: statusSlug || 'new',
            },
          },
        },
        userStory: {
          connect: {
            id_projectId: {
              id: usId,
              projectId,
            },
          },
        },
      },
    });
  }

  async countTask(projectId: number, statusSlug: string) {
    return await this.prisma.task.count({
      where: {
        projectId,
        taskStatus: {
          slug: statusSlug,
        },
      },
    });
  }

  async createOrder(countUserStories: number) {
    return countUserStories + 1;
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany();
    if (tasks.length === 0) throw new NotFoundException('Task does not exist');
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new NotFoundException(`Task with id:${id} does not exist`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, req: Request) {
    const { description, subject, statusSlug } = updateTaskDto;
    const projectId = +req.cookies['currentProject'];
    const count = await this.countTask(projectId, statusSlug);
    let order: number;
    if (req.task.statusSlug !== statusSlug) {
      order = await this.createOrder(count);
    }
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        subject,
        description,
        taskStatus: {
          connect: {
            projectId_slug: {
              projectId,
              slug: statusSlug,
            },
          },
        },
        order,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async updateOrder(updateOrderTaskDto: UpdateOrderTaskDto) {
    const { bulkTask } = updateOrderTaskDto;
    return await this.prisma.$transaction(
      bulkTask.map((task) => {
        const { id, order } = task;
        return this.prisma.task.update({
          where: { id },
          data: {
            order,
          },
        });
      }),
    );
  }
}
