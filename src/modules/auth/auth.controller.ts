import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './models/dtos/response/login.response.dto';
import { JWTPayload } from './models/interfaces/auth.interface';
import { LocalAuthGuard } from './models/guards/local-auth.guard';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  // @ApiOperation({ description: 'User registration' })
  // @Post('sign-up')
  // async signUp(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
  //   return await this.authService.signUp(dto);
  // }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'User authentication' })
  @Post('sign-in')
  async signIn(@Body() body: JWTPayload): Promise<LoginResponseDto> {
    const token = await this.authService.signIn(body);
    return { token };
  }
}
