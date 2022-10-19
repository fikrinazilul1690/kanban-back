import { UpdateOrderUserStoryDto } from './dto/update-order-user-story.dto';
import { UserStoryEntity } from './entities/user-story.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserStoryService } from './user-story.service';
import { CreateUserStoryDto } from './dto/create-user-story.dto';
import { UpdateUserStoryDto } from './dto/update-user-story.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({ version: '1', path: 'userstories' })
@ApiTags('user story')
export class UserStoryController {
  constructor(private readonly userStoryService: UserStoryService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createUserStoryDto: CreateUserStoryDto) {
    return this.userStoryService.create(createUserStoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.userStoryService.findAll();
  }

  @Patch('update-order')
  @ApiBearerAuth()
  updateOrder(@Body() updateOrderUsDto: UpdateOrderUserStoryDto) {
    return this.userStoryService.updateOrder(updateOrderUsDto);
  }

  @Get(':usId')
  @Public()
  findOne(@Param('usId', ParseIntPipe) id: number, @Req() req: Request) {
    return new UserStoryEntity(req.userStory);
  }

  @Patch(':usId')
  @ApiBearerAuth()
  update(
    @Param('usId', ParseIntPipe) id: number,
    @Body() updateUserStoryDto: UpdateUserStoryDto,
  ) {
    return this.userStoryService.update(+id, updateUserStoryDto);
  }

  @Delete(':usId')
  @ApiBearerAuth()
  remove(@Param('usId', ParseIntPipe) id: number) {
    return this.userStoryService.remove(+id);
  }
}
