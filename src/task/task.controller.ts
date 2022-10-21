import { UpdateOrderTaskDto } from './dto/update-order-task.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({ version: '1', path: 'tasks' })
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.taskService.findAll();
  }

  @Patch('update-order')
  @ApiBearerAuth()
  @ApiOkResponse()
  updateOrder(@Body() updateOrderTaskDto: UpdateOrderTaskDto) {
    return this.taskService.updateOrder(updateOrderTaskDto);
  }

  @Get(':taskId')
  @Public()
  findOne(@Param('taskId', ParseIntPipe) id: number, @Req() req: Request) {
    return req.task;
  }

  @Patch(':taskId')
  @ApiBearerAuth()
  update(
    @Param('taskId', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.taskService.update(id, updateTaskDto, req);
  }

  @Delete(':taskId')
  @ApiBearerAuth()
  remove(@Param('taskId', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
