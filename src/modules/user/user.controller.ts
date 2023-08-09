import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../../common/pagination/response';
import { PublicUserData } from './models/interface/user.response.dto';
import { PublicUserInfoDto } from '../../common/query/user.query.dto';
import { UserLoginDto } from './models/dtos/response/user.login.dto';
import { LogoutGuard } from '../../common/guards/logout.guard';
import { CreateUserRequestDto } from './models/dtos/response/create-user.request.dto';
import { UpdateUserRequestDto } from './models/dtos/response/update-user.request.dto';

@ApiTags('Users')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  @ApiPaginatedResponse('entities', PublicUserData)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users with pagination',
    type: PaginatedDto,
  })
  @Get('list')
  async getUserList(@Query() query: PublicUserInfoDto) {
    return await this.userService.getAllUsers(query);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by ID',
    type: PublicUserData,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async login(@Req() req: any, @Body() body: UserLoginDto) {
    return await this.userService.login(body);
  }

  @UseGuards(AuthGuard(), LogoutGuard)
  @Post('logout')
  async logout(@Res() res: any) {
    return res.status(HttpStatus.OK).json('User logout');
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User with this email already exists',
  })
  @Post('create')
  async createUser(@Req() req: any, @Body() body: CreateUserRequestDto) {
    return await this.userService.createUser(body);
  }

  @Post('create/:userId/car')
  async addCarToUser() {
    return 'Add New car to User';
  }

  @ApiOperation({ summary: 'Update user' })
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user by ID',
    type: PublicUserData,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserRequestDto,
  ) {
    return await this.userService.updateUserById(userId, body);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user by ID',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.deleteUser(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
