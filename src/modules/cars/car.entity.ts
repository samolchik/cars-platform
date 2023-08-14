import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BodyTypeEnum } from './models/enums/body-type.enum';
import { StatusCarEnum } from './models/enums/status.enum';
import { CurrencyEnum } from './models/enums/currency.enum';
import { User } from '../user/user.entity';
import { IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the car' })
  id: number;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: 'Toyota', description: 'The brand of the car' })
  brand: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: 'Camry', description: 'The model of the car' })
  model: string;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({ example: 3, description: 'The age of the car' })
  age: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  @Min(0)
  @ApiProperty({ example: 50000, description: 'The mileage of the car' })
  mileage: number;

  @Column({
    type: 'enum',
    enum: BodyTypeEnum,
    default: BodyTypeEnum.SEDAN,
  })
  @ApiProperty({
    enum: BodyTypeEnum,
    default: BodyTypeEnum.SEDAN,
    description: 'The body type of the car',
  })
  bodyType: BodyTypeEnum;

  @Column({
    type: 'enum',
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
  })
  @ApiProperty({
    enum: StatusCarEnum,
    default: StatusCarEnum.NEW,
    description: 'The status of the car',
  })
  status: StatusCarEnum;

  @Column({ type: 'integer', nullable: true })
  @ApiProperty({ example: 20000, description: 'The price of the car' })
  price: number;

  @Column({
    type: 'enum',
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
  })
  @ApiProperty({
    enum: CurrencyEnum,
    default: CurrencyEnum.UAH,
    description: 'The currency of the car price',
  })
  currency: CurrencyEnum;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ example: false, description: 'Whether the car is sold' })
  sold: boolean;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: 'Kyiv', description: 'The region of the car' })
  region: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    example: 'This Audi A3 is a compact luxury sedan manufactured...',
    description: 'Detailed description of the car',
  })
  detailedDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (entity) => entity.cars)
  user: User;
}
