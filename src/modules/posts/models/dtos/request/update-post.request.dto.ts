import { PickType } from '@nestjs/swagger';

import { PostBaseRequestDto } from './post-base.request.dto';

export class UpdatePostRequestDto extends PickType(PostBaseRequestDto, [
  'title',
  'content',
]) {}
