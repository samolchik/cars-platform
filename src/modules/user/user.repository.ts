import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { PublicUserInfoDto } from '../../common/query/user.query.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async getAllUsers(query: PublicUserInfoDto) {
    query.order = query.order || 'ASC';

    const page = +query.page || 1;
    const limit = +query.limit || 2;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.cars', 'car')

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
      // case 'carBrand':
      //   queryBuilder.orderBy('car.brand', query.order);
      //   break;
      // case 'carModel':
      //   queryBuilder.orderBy('car.model', query.order);
      //   break;
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
}
