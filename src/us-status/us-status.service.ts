import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsStatusDto } from './dto/create-us-status.dto';
import { UpdateUsStatusDto } from './dto/update-us-status.dto';
import slugify from 'slugify';

@Injectable()
export class UsStatusService {
  constructor(private prisma: PrismaService) {}
  async create(createUsStatusDto: CreateUsStatusDto) {
    const { projectId, name, isClosed, colorHex } = createUsStatusDto;
    const slug = await this.createSlug(name, projectId);
    return await this.prisma.usStatus.create({
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

  async findAll(projectId: number) {
    const usStatuses = await this.prisma.usStatus.findMany({
      ...(projectId && {
        where: {
          projectId: projectId,
        },
      }),
      orderBy: {
        id: 'asc',
      },
    });
    if (usStatuses.length === 0)
      throw new NotFoundException('User story statuses not Found!');
    return usStatuses;
  }

  async findBySlug(slug: string, projectId: number) {
    const project = await this.prisma.usStatus.findUnique({
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
    const projectCount = await this.prisma.usStatus.count({
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
    const usStatus = await this.prisma.usStatus.findUnique({ where: { id } });
    if (!usStatus) {
      throw new NotFoundException(
        `user story status with id:${id} does not exist`,
      );
    }
    return usStatus;
  }

  async update(id: number, updateUsStatusDto: UpdateUsStatusDto) {
    const { name, isClosed, colorHex } = updateUsStatusDto;
    return await this.prisma.usStatus.update({
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
    return this.prisma.usStatus.delete({ where: { id } });
  }
}
