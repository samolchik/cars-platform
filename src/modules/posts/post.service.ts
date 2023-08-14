import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './models/dtos/create-post.dto';
import { FileService } from "../file/file.service";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
