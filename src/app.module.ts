import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      host: 'localhost',
      port: 5432,
      username: 'dimasradityo',
      password: '123123',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // synchronize: configEnv.NODE_ENV === 'production' ? false : true,
      synchronize: true,
      logging: true,
    }),
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
