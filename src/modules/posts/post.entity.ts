import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the post' })
  id: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty({ example: 'Title', description: 'The title of the post' })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Content', description: 'The content of the post' })
  content: string;

  @Column()
  @ApiProperty({
    example: 'image-url',
    description: 'The URL of the image associated with the post',
  })
  image: string;

  @ApiProperty({ example: 1, description: 'The ID of the user' })
  @Column({ type: 'integer' })
  userId: number;

  @ManyToOne(() => User, (entity) => entity.posts)
  author: User;
}
