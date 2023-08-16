import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostResponseDto {
  @ApiProperty({ example: 'Title', description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Content', description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'Image-url',
    description: 'The URL of the image associated with the post',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
