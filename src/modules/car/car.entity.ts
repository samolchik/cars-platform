import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BodyTypeEnum } from "./models/enums/body-type.enum";
import { StatusCarEnum } from "./models/enums/status.enum";
import { CurrencyEnum } from "./models/enums/currency.enum";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  brand: string;

  @Column({ type: 'varchar', nullable: true })
  model: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: BodyTypeEnum })
  bodyType: BodyTypeEnum;

  @Column({ type: 'enum', enum: StatusCarEnum, default: StatusCarEnum.NEW })
  status: StatusCarEnum;

  @Column({ type: 'integer', nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  region: string;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;

  // @ManyToOne(() => User, (entity) => entity.cars)
  // user: User;
}
