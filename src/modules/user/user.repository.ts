import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PublicUserInfoDto } from '../../common/query/user.query.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { CreateUserRequestDto } from "./models/dtos/response/create-user.request.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
  ) {
    super(User, dataSource.manager);
  }

  public async getAllUsers(query: PublicUserInfoDto) {
    query.order = query.order || 'ASC';

    const page = +query.page || 1;
    const limit = +query.limit || 2;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.cars',
      'car',
    );

    if (query.search) {
      queryBuilder.where('"userName" IN(:...search)', {
        search: query.search.split(','),
      });
    }

    if (query.class) {
      queryBuilder.andWhere(`LOWER(ani.class) LIKE '%:class%'`, {
        class: query.class.toLowerCase(),
      });
    }

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
        queryBuilder.orderBy('user.id', query.order);
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

  async createUser(data: CreateUserRequestDto) {
    const findUser = await this.findOne({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      throw new HttpException(
        `User with this ${data.email} already exists!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);

    const newUser = this.create(data);
    await this.save(newUser);

    const token = await this.signIn(newUser);

    return { token };
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, 7);
  }

  async signIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
