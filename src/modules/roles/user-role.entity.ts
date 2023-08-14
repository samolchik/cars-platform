import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Role } from './role.entity';

@Entity({ name: 'user_roles' })
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
