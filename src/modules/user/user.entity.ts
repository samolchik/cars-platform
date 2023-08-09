import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccountType, UserRole } from './models/enums';
import { Car } from '../car/car.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column({ type: 'varchar' })
  banReason: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BUYER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.BASIC,
  })
  accountType: AccountType;

  @OneToMany(() => Car, (entity) => entity.user, { cascade: true })
  cars: Car[];
}
