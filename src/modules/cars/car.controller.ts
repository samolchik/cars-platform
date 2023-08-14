import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarRequestDto } from './models/dtos/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dtos/request/update-car.request.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Create new car' })
  @Post(':userId')
  async createCar(
    @Body() body: CreateCarRequestDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.carService.createCar(body, userId);
  }

  @ApiOperation({ summary: 'Get car with drivers' })
  @Get(':carId')
  async getCarWithDrivers(@Param('carId', ParseIntPipe) carId: number) {
    return this.carService.getCarWithDrivers(carId);
  }

  @ApiOperation({ summary: 'Update car profile' })
  @Patch(':carId')
  async updateCarProfile(
    @Param('carId', ParseIntPipe) carId: number,
    @Body() body: UpdateCarRequestDto,
  ): Promise<UpdateCarRequestDto> {
    return this.carService.updateCarProfile(carId, body);
  }

  @ApiOperation({ summary: 'Mark car as sold' })
  @Put(':carId/sold')
  async markCarAsSold(@Param('carId', ParseIntPipe) id: number) {
    await this.carService.markCarAsSold(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Car sold',
    };
  }

  @ApiOperation({ summary: 'Delete car profile' })
  @Delete(':carId')
  async deleteCar(@Param('carId', ParseIntPipe) carId: number) {
    await this.carService.deleteCarProfile(carId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Car deleted successfully',
    };
  }
}
