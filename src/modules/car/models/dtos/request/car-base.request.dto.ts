import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { StatusCarEnum } from "../../enums/status.enum";
import { CurrencyEnum } from "../../enums/currency.enum";
import { BodyTypeEnum } from "../../enums/body-type.enum";


export class CarBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1990)
  @Max(new Date().getFullYear())
  age: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1000)
  price: number;

  @IsEnum(StatusCarEnum)
  @IsNotEmpty()
  status: StatusCarEnum;

  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;

  @IsEnum(BodyTypeEnum)
  @IsNotEmpty()
  bodyType: BodyTypeEnum;

  @IsString()
  @IsNotEmpty()
  region: string;
}
