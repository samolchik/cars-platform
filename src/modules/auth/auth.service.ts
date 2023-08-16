import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './models/interfaces/auth.interface';
import { RoleService } from '../roles/role.service';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { CreateUserRequestDto } from '../users/models/dtos/request/create-user.request.dto';
import { LoginResponseDto } from './models/dtos/response/login.response.dto';
import { UserLoginDto } from '../users/models/dtos/request/user.login.dto';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    public readonly userService: UserService,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    public readonly roleService: RoleService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {}

  async register(data: CreateUserRequestDto): Promise<LoginResponseDto> {
    const findUser = await this.userService.findUserByEmail(data);

    if (findUser) {
      throw new HttpException(
        `User with this email ${data.email} already exists!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.getHash(data.password);

    const role = await this.roleService.getRoleByValue('BUYER');

    const createdUser = this.userRepository.create({
      ...data,
      password: hashPassword,
      roles: [role],
    });

    const newUser = await this.userRepository.save(createdUser);

    const tokenResponse = await this.generateToken(newUser);
    const token = tokenResponse.token;
    this.redisClient.setEx(token, 10000, token);

    return { token };
  }

  async login(data: UserLoginDto): Promise<LoginResponseDto> {
    const findUser = await this.userService.findUserByEmail(data);

    if (!findUser) {
      throw new HttpException(
        `Email or password is not correct`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordEquals = await bcrypt.compare(
      data.password,
      findUser.password,
    );

    if (passwordEquals) {
      const tokenResponse = await this.generateToken(findUser);
      const token = tokenResponse.token;

      this.redisClient.setEx(token, 10000, token);
      return { token };
    }
    throw new HttpException(
      `Email or password is not correct!`,
      HttpStatus.UNAUTHORIZED,
    );
  }

  async generateToken(data): Promise<LoginResponseDto> {
    const payload = { email: data.email, id: data.id, roles: data.roles };
    return {
      token: this.jwtService.sign(payload, { expiresIn: 3600 }),
    };
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async verify(token: string): Promise<JWTPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
  }

  async decode(token: string): Promise<JWTPayload | any> {
    try {
      return await this.jwtService.decode(token);
    } catch (e) {
      console.log(
        new Date().toISOString(),
        ' [JWT VERIFY ERROR] ',
        JSON.stringify(e),
        ' [TOKEN] ',
        token,
      );
    }
  }
}
