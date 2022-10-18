import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}
  async create(createMemberDto: CreateMemberDto) {
    const { email, projectId, role } = createMemberDto;
    return await this.prisma.member.create({
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
        user: {
          connect: {
            email,
          },
        },
        role: {
          connectOrCreate: {
            where: {
              type: role,
            },

            create: {
              type: role,
            },
          },
        },
      },
    });
  }

  async findAll() {
    const members = await this.prisma.member.findMany();
    if (members.length === 0) throw new NotFoundException('Member not Found!');
    return members;
  }

  async findOne(id: number) {
    const member = await this.prisma.member.findUnique({
      where: {
        id,
      },
    });

    if (!member)
      throw new NotFoundException(`Member with id:${id} does not exist`);

    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const { role } = updateMemberDto;
    return await this.prisma.member.update({
      where: { id },
      data: {
        role: {
          connectOrCreate: {
            where: {
              type: role,
            },
            create: {
              type: role,
            },
          },
        },
      },
    });
  }

  async remove(id: number, req: Request) {
    if (req.member.isOwner)
      throw new BadRequestException(
        "Unfortunately, this project can't be left without an owner",
      );
    return await this.prisma.member.delete({ where: { id } });
  }
}
