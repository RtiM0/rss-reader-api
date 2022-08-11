import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';
import { FeedItem } from './models/feedItem.model';

@Module({
  imports: [SequelizeModule.forFeature([Feed, FeedItem])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
