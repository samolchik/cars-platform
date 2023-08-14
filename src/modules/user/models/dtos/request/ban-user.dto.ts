import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsString()
  banReason: string;
}
