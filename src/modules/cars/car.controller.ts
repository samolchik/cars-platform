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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarRequestDto } from './models/dtos/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dtos/request/update-car.request.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/models/guards/roles.guard';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../../common/pagination/response';
import { PublicInfoDto } from '../../common/query/info.query.dto';
import { PublicCarData } from './models/interface/car.response.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get all cars' })
  @ApiBearerAuth()
  @ApiPaginatedResponse('entities', PublicCarData)
  @ApiResponse({
    description: 'Get all cars with pagination',
    status: HttpStatus.OK,
    type: PaginatedDto,
  })
  @Get()
  async getUserList(@Query() query: PublicInfoDto) {
    return await this.carService.getAllCars(query);
  }

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
