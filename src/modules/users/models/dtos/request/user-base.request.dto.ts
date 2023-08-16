import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { AccountType } from '../../enums';
import { Match } from '../../../../../common/decorators/password.match';

export class UserBaseRequestDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username',
    pattern: '^[a-zA-Z]\\w{1,19}$',
    minLength: 1,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'MyP@ssw0rd',
    description: 'Password',
    pattern: '^\\S*(?=\\S{8,})(?=\\S*[A-Z])(?=\\S*[\\d])\\S*$',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*(?=\S{8,})(?=\S*[A-Z])(?=\S*\d)\S*$/, {
    message:
      'Password must contain min 8 and max 20 items and min 1 uppercase letter.',
  })
  password: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Email',
    pattern:
      '^([\\w\\-\\.]+)@((\\[([0-9]{1,3}\\.){3}[0-9]{1,3}\\])|(([\\w\\-]+\\.)+)([a-zA-Z]{2,4}))$',
  })
  @IsString()
  @IsEmail({}, { message: 'Email is not correct' })
  @IsNotEmpty()
  @Matches(
    /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/,
  )
  email: string;
  //
  // @ApiProperty({
  //   example: 'USER',
  //   description: 'Account type',
  //   enum: AccountType,
  // })
  // @IsEnum(AccountType)
  // @IsNotEmpty()
  // accountType: AccountType.PREMIUM;

  @ApiProperty({
    example: true,
    description: 'Is active',
    readOnly: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Is banned',
    readOnly: true,
  })
  @IsBoolean()
  @IsOptional()
  banned: boolean;
}
