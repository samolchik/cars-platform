import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './models/dtos/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() data: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(data, image);
  }
}
