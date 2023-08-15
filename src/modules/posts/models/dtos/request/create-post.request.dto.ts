import { PickType } from '@nestjs/swagger';

import { PostBaseRequestDto } from './post-base.request.dto';

export class CreatePostRequestDto extends PickType(PostBaseRequestDto, [
  'title',
  'content',
  'image',
  'authorId',
]) {}
