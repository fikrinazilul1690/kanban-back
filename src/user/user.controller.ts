import { UserEntity } from 'src/user/entities/user.entity';
import { User } from '@prisma/client';
import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller({ version: '1', path: 'users' })
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@Query() filter: FilterUserDto) {
    const users = await this.userService.findAll(filter);
    return users.map((user) => new UserEntity(user));
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findMe(@GetUser() user: User) {
    const userData = await this.userService.findMe(user);
    return new UserEntity(userData);
  }

  @Get(':userId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.userService.findOne(userId);
    return new UserEntity(user);
  }
}
