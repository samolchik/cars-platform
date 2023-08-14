import { PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from './user-base.request.dto';

export class UserLoginDto extends PickType(UserBaseRequestDto, [
  'password',
  'email',
]) {}
