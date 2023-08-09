import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CarService } from './car.service';
import { CreateCarRequestDto } from './models/dtos/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dtos/request/update-car.request.dto';
import { Car } from './car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Create new car' })
  @Post(':userId')
  async createCar(
    @Body() body: CreateCarRequestDto,
    @Param('userId') userId: string,
  ) {
    return this.carService.createCar(body, userId);
  }

  @Get(':carId')
  async getCarWithDrivers(@Param('carId') carId: string) {
    return this.carService.getCarWithDrivers(carId);
  }
  @Patch(':carId')
  async updateCarProfile(
    @Param('carId') carId: string,
    @Body() body: UpdateCarRequestDto,
  ) {
    return this.carService.updateCarProfile(carId, body);
  }

  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string) {
    await this.carService.deleteCarProfile(carId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Car deleted successfully',
    };
  }
}
