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
  Query,
  Req,
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
import { PublicInfoDto } from '../../common/query/info.query.dto';
import { CreateUserRequestDto } from './models/dtos/request/create-user.request.dto';
import { UpdateUserRequestDto } from './models/dtos/request/update-user.request.dto';
import { RolesGuard } from '../auth/models/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AddRoleDto } from './models/dtos/request/add-role.dto';
import { User } from './user.entity';

@ApiTags('Users')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiPaginatedResponse('entities', PublicUserData)
  @ApiResponse({
    description: 'Get all users with pagination',
    status: HttpStatus.OK,
    type: PaginatedDto,
  })
  @Get('list')
  async getUserList(@Query() query: PublicInfoDto) {
    return await this.userService.getAllUsers(query);
  }

  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new user',
    type: User,
  })
  @Post('create')
  async createUser(@Req() req: any, @Body() body: CreateUserRequestDto) {
    return await this.userService.createUser(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user by ID',
    type: User,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Get(':userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUserById(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user by ID',
    type: PublicUserData,
  })
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserRequestDto,
  ) {
    return await this.userService.updateUserById(userId, body);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user by ID',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.deleteUser(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() data: AddRoleDto) {
    return this.userService.addRole(data);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  @Post(':userId/ban')
  ban(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.ban(userId);
  }
}
