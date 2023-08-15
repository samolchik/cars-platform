import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class PublicInfoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum([
    'userName',
    'roleUser',
    'modelCar',
    'brandCar',
    'ageCar',
    'regionCar',
    'statusCar',
  ])
  sort: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  class: string;
}
