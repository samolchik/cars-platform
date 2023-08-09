import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarController } from './car.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User])],
  controllers: [CarController],
  providers: [CarService],
  exports: [],
})
export class CarModule {}
