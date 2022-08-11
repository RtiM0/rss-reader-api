import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      username: 'rssadmin',
      database: 'rssreader',
      password: 'qwerty',
      port: 5432,
      autoLoadModels: true,
      synchronize: true,
    }),
    FeedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
