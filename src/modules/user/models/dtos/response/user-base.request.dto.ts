import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { AccountType, UserRole } from '../../enums';

export class UserBaseRequestDto {
  @ApiProperty({
    title: 'Username',
    pattern: '^[a-zA-Z]\\w{1,19}$',
    minLength: 1,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({ title: 'Is active', readOnly: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ title: 'Is banned', readOnly: true })
  @IsBoolean()
  @IsOptional()
  banned: boolean;

  @ApiProperty({
    title: 'Ban reason',
    pattern: '^[a-zA-Z]\\w{1,19}$',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  banReason: string;

  @ApiProperty({
    title: 'Password',
    pattern: '^\\S*(?=\\S{8,})(?=\\S*[A-Z])(?=\\S*[\\d])\\S*$',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*[\d])\S*$/, {
    message: 'Password must contain min 8 items and 1 uppercase letter.',
  })
  password: string;

  @ApiProperty({
    title: 'Email',
    pattern:
      '^([\\w\\-\\.]+)@((\\[([0-9]{1,3}\\.){3}[0-9]{1,3}\\])|(([\\w\\-]+\\.)+)([a-zA-Z]{2,4}))$',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
}
