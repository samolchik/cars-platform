import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { User } from '../users/user.entity';
import { CreateCarRequestDto } from './models/dtos/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dtos/request/update-car.request.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCar(data: CreateCarRequestDto, userId: number): Promise<Car> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newCar = this.carRepository.create({ ...data, user });

    return await this.carRepository.save(newCar);
  }

  async updateCarProfile(
    carId: number,
    data: UpdateCarRequestDto,
  ): Promise<UpdateCarRequestDto> {
    const findCar = await this.findCarById(carId);

    if (!findCar) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    await this.carRepository.update(
      { id: +carId },
      {
        age: data.age,
        price: data.price,
        currency: data.currency,
      },
    );

    return await this.findCarById(carId);
  }

  async markCarAsSold(carId: number) {
    const car = await this.findCarById(carId);

    if (!car) {
      throw new HttpException(
        `Car with id ${carId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    car.sold = true;
    await this.carRepository.save(car);
  }

  async getCarWithDrivers(carId: number): Promise<Car> {
    return await this.findCarById(carId);
  }

  async deleteCarProfile(carId: number) {
    const car = await this.findCarById(carId);

    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    await this.carRepository.remove(car);
  }

  private async findCarById(carId: number): Promise<Car> {
    return await this.carRepository.findOne({
      where: { id: +carId },
      relations: { user: true },
    });
  }
}
