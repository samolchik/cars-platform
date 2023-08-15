import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { FileModule } from '../file/file.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    FileModule,
    forwardRef(() => UserModule),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
