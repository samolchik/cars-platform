import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { User } from '../users/user.entity';
import { CreateCarRequestDto } from './models/dtos/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dtos/request/update-car.request.dto';
import { PaginatedDto } from '../../common/pagination/response';
import { PublicCarData } from './models/interface/car.response.dto';
import { PublicInfoDto } from '../../common/query/info.query.dto';
import { AccountType } from '../users/models/enums/account-type.enum';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllCars(query: PublicInfoDto): Promise<PaginatedDto<PublicCarData>> {
    query.order = query.order || 'ASC';

    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user');

    if (query.search) {
      const searchTerm = query.search.split(',').map((term) => term.trim());

      const lowerCaseSearchTerms = searchTerm.map((term) => term.toLowerCase());

      queryBuilder
        .andWhere('LOWER("name") IN (:...search)', {
          search: lowerCaseSearchTerms,
        })
        .orWhere('LOWER("brand") IN (:...search)', {
          search: lowerCaseSearchTerms,
        })
        .orWhere('LOWER("model") IN (:...search)', {
          search: lowerCaseSearchTerms,
        });
    }

    // if (query.class) {
    //   queryBuilder.andWhere(`LOWER(ani.class) LIKE '%:class%'`, {
    //     class: query.class.toLowerCase(),
    //   });
    // }

    switch (query.sort) {
      case 'userName':
        queryBuilder.orderBy('user.name', query.order);
        break;
      case 'carBrand':
        queryBuilder.orderBy('car.brand', query.order);
        break;
      case 'carModel':
        queryBuilder.orderBy('car.model', query.order);
        break;
      default:
        queryBuilder.orderBy('car.id', query.order);
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    const [entities, count] = await queryBuilder.getManyAndCount();

    return {
      page,
      pages: Math.ceil(count / limit),
      countItem: count,
      entities,
    };
  }

  async createCar(data: CreateCarRequestDto, userId: number): Promise<Car> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.accountType === AccountType.BASIC) {
      if (user.cars.length <= 1) {
        throw new HttpException(
          'User can have only one car in basic account',
          HttpStatus.BAD_REQUEST,
        );
      }

      const car = this.carRepository.create({
        ...data,
        user,
      })

      return await this.carRepository.save(car);
    } else if (user.accountType === AccountType.PREMIUM) {
      const car = this.carRepository.create({
        ...data,
        user,
      });

      return await this.carRepository.save(car);
    }

    throw new HttpException('Invalid account type', HttpStatus.BAD_REQUEST);
  }

  async updateCarProfile(
    carId: number,
    data: UpdateCarRequestDto
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
