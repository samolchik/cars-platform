import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BearerStrategy } from './bearer.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@webeleon/nestjs-redis';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../users/user.module';
import { Role } from '../roles/role.entity';
import { AuthController } from './auth.controller';
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
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY || 'Secret',
        signOptions: {
          expiresIn: process.env.JWT_TTL || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.JWT_TTL || '24h',
        },
      }),
    }),
    RoleModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
