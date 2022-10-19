import { MemberEntity } from './entities/member.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Request } from 'express';

@Controller({ version: '1', path: 'members' })
@ApiTags('member')
@UseGuards(RolesGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MemberEntity })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: MemberEntity, isArray: true })
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':memberId')
  @ApiOkResponse({ type: MemberEntity })
  @Public()
  async findOne(@Param('memberId') id: string, @Req() req: Request) {
    return new MemberEntity(req?.member);
  }

  @Patch(':memberId')
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MemberEntity })
  update(
    @Param('memberId') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':memberId')
  @ApiBearerAuth()
  @ApiBearerAuth()
  @Roles('OWNER', 'ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('memberId') id: string, @Req() req: Request) {
    return this.memberService.remove(+id, req);
  }
}
