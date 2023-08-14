import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './models/dtos/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  async getRoleByValue(role: string) {
    return await this.roleRepository.findOne({
      where: { role },
    });
  }
}
