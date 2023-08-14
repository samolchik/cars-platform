import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RedisModule } from '@webeleon/nestjs-redis';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';
import { Role } from '../roles/role.entity';
import { RoleModule } from '../roles/role.module';
import { Car } from '../cars/car.entity';
import { CarModule } from '../cars/car.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Car]),
    RedisModule.forRoot({
      url: process.env.REDIS_PORT,
    }),
    RoleModule,
    CarModule,
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
