import { FilterUserStoryDto } from './dto/filter-user-story.dto';
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
  HttpStatus,
} from '@nestjs/common';
import { UserStoryService } from './user-story.service';
import { CreateUserStoryDto } from './dto/create-user-story.dto';
import { UpdateUserStoryDto } from './dto/update-user-story.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { HttpCode, Query, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({ version: '1', path: 'userstories' })
@ApiTags('user story')
export class UserStoryController {
  constructor(private readonly userStoryService: UserStoryService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserStoryEntity })
  create(@Body() createUserStoryDto: CreateUserStoryDto) {
    return this.userStoryService.create(createUserStoryDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: UserStoryEntity, isArray: true })
  findAll(@Query() query: FilterUserStoryDto) {
    return this.userStoryService.findAll(query);
  }

  @Patch('update-order')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserStoryEntity, isArray: true })
  updateOrder(@Body() updateOrderUsDto: UpdateOrderUserStoryDto) {
    return this.userStoryService.updateOrder(updateOrderUsDto);
  }

  @Get(':usId')
  @ApiOkResponse({ type: UserStoryEntity })
  @Public()
  findOne(@Param('usId', ParseIntPipe) id: number, @Req() req: Request) {
    return new UserStoryEntity(req.userStory);
  }

  @Patch(':usId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserStoryEntity })
  update(
    @Param('usId', ParseIntPipe) id: number,
    @Body() updateUserStoryDto: UpdateUserStoryDto,
    @Req() req: Request,
  ) {
    return this.userStoryService.update(+id, updateUserStoryDto, req);
  }

  @Delete(':usId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('usId', ParseIntPipe) id: number) {
    return this.userStoryService.remove(+id);
  }
}
