import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class OrderTaskDto {
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

export class UpdateOrderTaskDto {
  @ApiProperty({
    type: OrderTaskDto,
    isArray: true,
  })
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => OrderTaskDto)
  bulkTask: OrderTaskDto[];
}
