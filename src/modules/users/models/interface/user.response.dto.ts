import { ApiProperty } from '@nestjs/swagger';

export class PublicUserData {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'johndoe@example.com',
  })
  email: string;
}
