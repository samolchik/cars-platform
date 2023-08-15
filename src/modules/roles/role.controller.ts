import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RoleService } from './role.service';
import { CreateRoleDto } from './models/dtos/create-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/models/guards/roles.guard";

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
