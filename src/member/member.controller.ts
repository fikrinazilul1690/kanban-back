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
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  remove(@Param('memberId') id: string) {
    return this.memberService.remove(+id);
  }
}
