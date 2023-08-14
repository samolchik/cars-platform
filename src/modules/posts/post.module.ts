import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), FileModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
