import { ApiProperty } from '@nestjs/swagger';

export class PublicUserData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}