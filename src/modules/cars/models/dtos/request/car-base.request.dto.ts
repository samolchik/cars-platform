import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { StatusCarEnum } from '../../enums/status.enum';
import { CurrencyEnum } from '../../enums/currency.enum';
import { BodyTypeEnum } from '../../enums/body-type.enum';
import { Column } from "typeorm";

export class CarBaseRequestDto {
  @ApiProperty({ example: 'Audi', description: 'The brand of the car' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'A3', description: 'The model of the car' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ enum: BodyTypeEnum, description: 'The body type of the car' })
  @IsEnum(BodyTypeEnum)
  @IsNotEmpty()
  bodyType: BodyTypeEnum;

  @ApiProperty({ example: 2022, description: 'The year of manufacture of the car' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1990)
  @Max(new Date().getFullYear())
  age: number;

  @ApiProperty({ enum: StatusCarEnum, description: 'The status of the car' })
  @IsEnum(StatusCarEnum)
  @IsNotEmpty()
  status: StatusCarEnum;

  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  @Min(0)
  mileage: number;

  @ApiProperty({ example: 25000, description: 'The price of the car' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @ApiProperty({ enum: CurrencyEnum, description: 'The currency of the price' })
  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;

  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  @IsBoolean()
  sold: boolean;

  @ApiProperty({ example: 'Berlin', description: 'The region of the car' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    example: 'This Audi A3 is a compact luxury sedan manufactured...',
    description: 'Detailed description of the car',
  })
  @IsString()
  detailedDescription: string;
}
