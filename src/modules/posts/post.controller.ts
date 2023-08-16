import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostRequestDto } from './models/dtos/request/create-post.request.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { PostResponseDto } from './models/dtos/response/post-response.dto';
import { RolesGuard } from '../auth/models/guards/roles.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  @UseInterceptors(FileInterceptor('image'))
  getAllPosts(@Body() data: CreatePostRequestDto) {
    return this.postService.getAllPosts(data);
  }

  @ApiOperation({ summary: 'Create post' })
  @Roles('ADMIN', 'MANAGER', 'SELLER')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() data: CreatePostRequestDto,
    @UploadedFile() image,
  ): Promise<PostResponseDto> {
    return this.postService.createPost(data, image);
  }

  @ApiOperation({ summary: 'Update post' })
  @Roles('ADMIN', 'MANAGER', 'SELLER')
  // @UseGuards(RolesGuard)
  @Patch(':postId')
  updatePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() data: CreatePostRequestDto,
  ): Promise<PostResponseDto> {
    return this.postService.updatePost(postId, data);
  }

  @ApiOperation({ summary: 'Delete post' })
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  @Delete(':postId')
  async deleteCar(@Param('postId', ParseIntPipe) postId: number) {
    await this.postService.deletePost(postId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Post deleted successfully',
    };
  }
}
