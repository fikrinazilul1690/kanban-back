import { UsStatusEntity } from './entities/us-status.entity';
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
  Req,
  Query,
} from '@nestjs/common';
import { UsStatusService } from './us-status.service';
import { CreateUsStatusDto } from './dto/create-us-status.dto';
import { UpdateUsStatusDto } from './dto/update-us-status.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Request } from 'express';

@Controller({ version: '1', path: 'userstory-statuses' })
@ApiTags('user story status')
export class UsStatusController {
  constructor(private readonly usStatusService: UsStatusService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UsStatusEntity })
  create(@Body() createUsStatusDto: CreateUsStatusDto) {
    return this.usStatusService.create(createUsStatusDto);
  }

  @Get()
  @Public()
  @ApiQuery({ required: false, name: 'projectId' })
  @ApiOkResponse({ type: UsStatusEntity, isArray: true })
  findAll(@Query('projectId') projectId: number) {
    return this.usStatusService.findAll(projectId);
  }

  @Get(':usStatusId')
  @Public()
  @ApiOkResponse({ type: UsStatusEntity })
  findOne(@Param('usStatusId') id: string, @Req() req: Request) {
    return new UsStatusEntity(req.usStatus);
  }

  @Patch(':usStatusId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UsStatusEntity })
  update(
    @Param('usStatusId') id: string,
    @Body() updateUsStatusDto: UpdateUsStatusDto,
  ) {
    return this.usStatusService.update(+id, updateUsStatusDto);
  }

  @Delete(':usStatusId')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('usStatusId') id: string) {
    return this.usStatusService.remove(+id);
  }
}
