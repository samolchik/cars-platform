import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { PublicInfoDto } from '../../common/query/info.query.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async getAllUsers(query: PublicInfoDto) {
    query.order = query.order || 'ASC';

    const page = +query.page || 1;
    const limit = +query.limit || 5;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.cars', 'car')
      .leftJoinAndSelect('user.roles', 'role');

    if (query.search) {
      this.applySearch(query, queryBuilder);
    }

    switch (query.sort) {
      case 'userName':
        queryBuilder.orderBy('user.name', query.order);
        break;
      case 'roleUser':
        queryBuilder.orderBy('role.userId', query.order);
        break;
      case 'carBrand':
        queryBuilder.orderBy('car.brand', query.order);
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

  public applySearch(query: PublicInfoDto, queryBuilder) {
    const searchTerms = query.search.split(',').map((term) => term.trim());

    const lowerCaseSearchTerms = searchTerms.map((term) => term.toLowerCase());

    return queryBuilder
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
}
