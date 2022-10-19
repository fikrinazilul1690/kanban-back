import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
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
  @ArrayMinSize(2)
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => OrderUserStoryDto)
  bulkStories: OrderUserStoryDto[];
}
