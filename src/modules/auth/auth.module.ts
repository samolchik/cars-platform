import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { BearerStrategy } from './bearer.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@webeleon/nestjs-redis';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
    RedisModule.forRoot({
      url: process.env.REDIS_PORT,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_TTL || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.JWT_TTL || '24h',
        },
      }),
    }),
  ],
  providers: [AuthService, BearerStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
