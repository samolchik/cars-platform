import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RedisModule } from '@webeleon/nestjs-redis';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot({
      url: process.env.REDIS_PORT,
    }),
    AuthModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports:[]
})
export class UserModule {}
