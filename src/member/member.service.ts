import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

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

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
