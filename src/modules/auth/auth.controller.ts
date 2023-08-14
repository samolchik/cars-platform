import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './models/dtos/response/login.response.dto';
import { LocalAuthGuard } from './models/guards/local-auth.guard';
import { CreateUserRequestDto } from '../user/models/dtos/request/create-user.request.dto';
import { UserLoginDto } from '../user/models/dtos/request/user.login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogoutGuard } from '../../common/guards/logout.guard';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @Post('register')
  async signUp(@Body() dto: CreateUserRequestDto): Promise<LoginResponseDto> {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'User authentication' })
  @Post('/login')
  async login(
    @Req() req: any,
    @Body() body: UserLoginDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(body);
  }

  @ApiOperation({ summary: 'User logout' })
  @UseGuards(AuthGuard(), LogoutGuard)
  @Post('/logout')
  async logout(@Res() res: any) {
    return res.status(HttpStatus.OK).json('User logout');
  }
}
