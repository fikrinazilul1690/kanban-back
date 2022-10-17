import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectDefaultService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(projectId: number): Promise<Prisma.BatchPayload[]> {
    const usStatusDefault: Prisma.UsStatusCreateManyInput[] = [
      {
        name: 'New',
        slug: 'new',
        colorHex: '#A9AABC',
        projectId,
      },
      {
        name: 'Ready',
        slug: 'ready',
        colorHex: '#E44057',
        projectId,
      },
      {
        name: 'In progress',
        slug: 'in-progress',
        colorHex: '#E47C40',
        projectId,
      },
      {
        name: 'Ready for test',
        slug: 'ready-for-test',
        colorHex: '#E4CE40',
        projectId,
      },
      {
        name: 'Done',
        slug: 'done',
        isClosed: true,
        colorHex: '#A8E440',
        projectId,
      },
    ];

    const taskStatusDefault: Prisma.TaskStatusCreateManyInput[] = [
      {
        name: 'New',
        slug: 'new',
        colorHex: '#A9AABC',
        projectId,
      },
      {
        name: 'Ready',
        slug: 'ready',
        colorHex: '#E44057',
        projectId,
      },
      {
        name: 'In progress',
        slug: 'in-progress',
        colorHex: '#E47C40',
        projectId,
      },
      {
        name: 'Ready for test',
        slug: 'ready-for-test',
        colorHex: '#E4CE40',
        projectId,
      },
      {
        name: 'Done',
        slug: 'done',
        colorHex: '#A8E440',
        projectId,
      },
      {
        name: 'Needs info',
        slug: 'needs-info',
        colorHex: '#5178D3',
        projectId,
      },
    ];

    const colors = this.prisma.color.createMany({
      data: [
        { hex: '#A9AABC' },
        { hex: '#E44057' },
        { hex: '#E47C40' },
        { hex: '#E4CE40' },
        { hex: '#A8E440' },
        { hex: '#5178D3' },
      ],
      skipDuplicates: true,
    });

    const usStatuses = this.prisma.usStatus.createMany({
      data: usStatusDefault,
      skipDuplicates: true,
    });

    const taskStatuses = this.prisma.taskStatus.createMany({
      data: taskStatusDefault,
      skipDuplicates: true,
    });

    return await this.prisma.$transaction([colors, usStatuses, taskStatuses]);
  }
}
