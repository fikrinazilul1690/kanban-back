import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class OrderUserStoryDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  order: number;
}

export class UpdateOrderUserStoryDto {
  @ApiProperty({ type: OrderUserStoryDto, isArray: true })
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested()
  @Type(() => OrderUserStoryDto)
  bulkStories: OrderUserStoryDto[];
}
