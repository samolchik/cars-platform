import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/cars/car.module';
import { RoleModule } from './modules/roles/role.module';
import { PostModule } from './modules/posts/post.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UserModule,
    AuthModule,
    CarModule,
    RoleModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
