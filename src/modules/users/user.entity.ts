import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { AccountType } from './models/enums';
import { Car } from '../cars/car.entity';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'User email' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ example: false, description: 'Is user banned' })
  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @ApiProperty({ example: 'Inappropriate behavior', description: 'Ban reason' })
  @Column({ type: 'varchar', nullable: true })
  banReason: string;

  @ApiProperty({
    example: AccountType.BASIC,
    description: 'User account type',
    enum: AccountType,
  })
  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.BASIC,
  })
  accountType: AccountType;

  @ApiProperty({ example: '2023-07-05T10:00:00Z', description: 'User creation date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-07-05T15:30:00Z', description: 'User last update date' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: Car,
    isArray: true,
    description: 'List of user cars',
  })
  @OneToMany(() => Car, (entity) => entity.user, { cascade: true })
  cars: Car[];

  @ApiProperty({
    type: Role,
    isArray: true,
    description: 'List of user roles',
  })
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
