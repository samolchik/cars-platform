import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './models/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}

  async signIn(data: JWTPayload): Promise<string> {
    return this.jwtService.sign(data);
  }

  async validateUser(data: JWTPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: +data.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async verify(token: string): Promise<JWTPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
  }

  decode(token: string): JWTPayload | any {
    try {
      return this.jwtService.decode(token);
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
