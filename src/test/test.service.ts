import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {
    this.prismaService.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('\x1b[31m', 'Query: ', '\x1b[0m', event.query);
      console.log('\x1b[32m', 'Params: ' + event.params);
      console.log(
        '\x1b[35m',
        'Duration: ' + event.duration + 'ms',
        '\x1b[0m',
        '\n',
      );
    });
  }
}
