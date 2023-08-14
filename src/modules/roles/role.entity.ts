import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Unique role meaning' })
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  role: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
