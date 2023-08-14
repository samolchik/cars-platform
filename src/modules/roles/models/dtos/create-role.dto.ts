import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role value',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: 'Administrator role',
    description: 'Role description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

