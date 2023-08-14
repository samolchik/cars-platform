import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { PublicUserInfoDto } from '../../common/query/user.query.dto';
import { PaginatedDto } from '../../common/pagination/response';
import { PublicUserData } from './models/interface/user.response.dto';
import { CreateUserRequestDto } from './models/dtos/request/create-user.request.dto';
import { UpdateUserRequestDto } from './models/dtos/request/update-user.request.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RoleService } from '../roles/role.service';
import { AddRoleDto } from './models/dtos/request/add-role.dto';
import { BanUserDto } from './models/dtos/request/ban-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    // private readonly jwtService: JwtService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {}

  async getAllUsers(
    query: PublicUserInfoDto,
  ): Promise<PaginatedDto<PublicUserData>> {
    return await this.userRepository.getAllUsers(query);
  }

  async getUserById(userId: string): Promise<PublicUserData> {
    const findUser = await this.userRepository.findOne({
      where: { id: +userId },
      relations: { cars: true, roles: true },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }

  async createUser(data: CreateUserRequestDto): Promise<User> {
    const user = await this.findUser(data);

    if (user) {
      throw new HttpException(
        `User with email ${data.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.roleService.getRoleByValue('ADMIN');

    const createdUser = this.userRepository.create({
      ...data,
      roles: [role],
    });

    return await this.userRepository.save(createdUser);
  }

  async updateUserById(
    userId: string,
    data: UpdateUserRequestDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: +userId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.remove(user);
  }

  async addRole(data: AddRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: +data.userId },
      relations: ['roles'],
    });
    const role = await this.roleService.getRoleByValue(data.value);

    if (role && user) {
      user.roles.push(role);
      await this.userRepository.save(user);
      return data;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(data: BanUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: +data.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = data.banReason;
    await this.userRepository.save(user);
    return user;
  }

  async findUser(data) {
    return await this.userRepository.findOne({
      where: {
        email: data.email,
      },
      relations: { roles: true, cars: true },
    });
  }
}
