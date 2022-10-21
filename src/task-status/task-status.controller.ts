import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller({ version: '1', path: 'task-statuses' })
@ApiTags('task status')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return this.taskStatusService.create(createTaskStatusDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.taskStatusService.findAll();
  }

  @Get(':taskStatusId')
  @Public()
  findOne(
    @Param('taskStatusId', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    return req.taskStatus;
  }

  @Patch(':taskStatusId')
  @ApiBearerAuth()
  update(
    @Param('taskStatusId', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskStatusService.update(id, updateTaskStatusDto);
  }

  @Delete(':taskStatusId')
  @ApiBearerAuth()
  remove(@Param('taskStatusId', ParseIntPipe) id: number) {
    return this.taskStatusService.remove(id);
  }
}
