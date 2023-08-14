import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/cars/car.module';
import { RoleModule } from './modules/roles/role.module';
import { PostModule } from './modules/posts/post.module';
import { FileModule } from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    CarModule,
    RoleModule,
    PostModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
