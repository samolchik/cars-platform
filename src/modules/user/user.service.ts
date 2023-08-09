import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { PublicUserInfoDto } from '../../common/query/user.query.dto';
import { PaginatedDto } from '../../common/pagination/response';
import { PublicUserData } from './models/interface/user.response.dto';
import { UserLoginDto } from './models/dtos/response/user.login.dto';
import { CreateUserRequestDto } from './models/dtos/response/create-user.request.dto';
import { UpdateUserRequestDto } from './models/dtos/response/update-user.request.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {}

  async getAllUsers(
    query: PublicUserInfoDto,
  ): Promise<PaginatedDto<PublicUserData>> {
    return await this.userRepository.getAllUsers(query);
  }

  async login(data: UserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!findUser) {
      throw new HttpException(
        `Email or password is not correct`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await this.compareHash(data.password, findUser.password)) {
      const token = await this.signIn(findUser);
      this.redisClient.setEx(token, 10000, token);

      return { token };
    }
    throw new HttpException(
      `Email or password is not correct`,
      HttpStatus.UNAUTHORIZED,
    );
  }

  // async getUserById(userId: string): Promise<PublicUserData> {
  //   const findUser = await this.userRepository.findOne({
  //     where: { id: +userId },
  //     relations: { cars: true },
  //   });
  //
  //   if (!findUser) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   return findUser;
  // }

  async createUser(data: CreateUserRequestDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      throw new HttpException(
        `User with this ${data.email} already exists!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);

    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);

    const token = await this.signIn(newUser);

    return { token };
  }

  async updateUserById(
    userId: string,
    data: UpdateUserRequestDto,
  ): Promise<User> {
    await this.userRepository.update(
      { id: +userId },
      {
        name: data.name,
        email: data.email,
      },
    );
    return await this.userRepository.save(data);
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

  async getHash(password: string) {
    return await bcrypt.hash(password, 7);
  }

  async signIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
