import { forwardRef, Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarController } from './car.controller';
import { User } from '../users/user.entity';
import { UserModule } from '../users/user.module';
import { UserRepository } from "../users/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, User, UserRepository]),
    forwardRef(() => UserModule),
  ],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
