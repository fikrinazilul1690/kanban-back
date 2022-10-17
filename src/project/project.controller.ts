import { ProjectEntity } from './entities/project.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller({ version: '1', path: 'projects' })
@ApiTags('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProjectEntity })
  create(
    @GetUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.create(user, createProjectDto);
  }

  @Get()
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  @Public()
  findAll(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  @ApiOkResponse({ type: ProjectEntity })
  @Public()
  findOne(
    @Param('projectId', ParseIntPipe) id: number,
  ): Promise<ProjectEntity> {
    return this.projectService.findOne(+id);
  }

  @Patch(':projectId')
  @ApiBearerAuth()
  update(
    @Param('projectId', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':projectId')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('projectId', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }

  @Delete(':projectId/leave')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  leave(@GetUser() user: User, @Param('projectId', ParseIntPipe) id: number) {
    return this.projectService.leave(user, id);
  }
}
