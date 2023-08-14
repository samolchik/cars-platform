import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the user creating the post',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'Title', description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Content', description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
