import { RoleType } from '@prisma/client';
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
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller({ version: '1', path: 'members' })
@ApiTags('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':memberId')
  findOne(@Param('memberId') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':memberId')
  update(
    @Param('memberId') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':memberId')
  @ApiBearerAuth()
  remove(@Param('memberId') id: string, @Req() req) {
    console.log(req);
    return this.memberService.remove(+id);
  }
}
