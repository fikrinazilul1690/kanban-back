import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async create(user: User, createProjectDto: CreateProjectDto) {
    const { title, description } = createProjectDto;
    const slug = await this.createSlug(title);
    return await this.prisma.project.create({
      data: {
        title,
        slug,
        description,
        owner: user.id,
        UserRole: {
          create: {
            role: {
              connectOrCreate: {
                where: {
                  type: 'OWNER',
                },
                create: {
                  type: 'OWNER',
                },
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async createSlug(title: string) {
    let slug = slugify(title, { lower: true });
    const slugExist = await this.findBySlug(slug);
    const countSlug = await this.countSlug(title);
    if (slugExist) {
      slug = slugify(`${title} ${countSlug === 0 ? 1 : countSlug}`, {
        lower: true,
      });
    }

    return slug;
  }

  async findOne(id: number) {
    const user = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(`Project with id:${id} not found`);

    return user;
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        slug,
      },
    });

    return project;
  }

  async countSlug(title: string) {
    const projectCount = await this.prisma.project.count({
      where: {
        title,
      },
    });

    return projectCount;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { title, description } = updateProjectDto;
    const slug = await this.createSlug(title);
    return await this.prisma.project.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.project.delete({ where: { id } });
  }
}
