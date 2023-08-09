import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType, UserRole } from './models/enums';

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

  @Column({ type: 'varchar', nullable: false })
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
}
