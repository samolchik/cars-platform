import { PickType } from '@nestjs/swagger';
import { CarBaseRequestDto } from '../request/car-base.request.dto';

export class CarResponseDto extends PickType(CarBaseRequestDto, [
  'brand',
  'model',
  'age',
  'mileage',
  'status',
  'bodyType',
  'region',
  'price',
  'currency',
  'sold',
  'detailedDescription',
]) {}
