import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role value to add',
  })
  @IsString({ message: 'Must be a string' })
  value: string;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsNumber({}, { message: 'Must be a number' })
  userId: string;
}