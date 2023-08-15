import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from '../enums/currency.enum';
import { StatusCarEnum } from '../enums/status.enum';
import { BodyTypeEnum } from '../enums/body-type.enum';

export class PublicCarData {
  @ApiProperty({ example: 1, description: 'The unique identifier of the car' })
  id: number;

  @ApiProperty({ example: 'Toyota', description: 'The brand of the car' })
  brand: string;

  @ApiProperty({ example: 'Camry', description: 'The model of the car' })
  model: string;

  @ApiProperty({ example: 3, description: 'The age of the car' })
  age: number;

  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  mileage: number;

  @ApiProperty({
    enum: BodyTypeEnum,
    default: BodyTypeEnum.SEDAN,
    description: 'The body type of the car',
  })
  bodyType: BodyTypeEnum;

  @ApiProperty({
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
    description: 'The status of the car',
  })
  status: StatusCarEnum;

  @ApiProperty({ example: 20000, description: 'The price of the car' })
  price: number;

  @ApiProperty({
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
    description: 'The currency of the car price',
  })
  currency: CurrencyEnum;

  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  sold: boolean;

  @ApiProperty({ example: 'Kyiv', description: 'The region of the car' })
  region: string;
}
