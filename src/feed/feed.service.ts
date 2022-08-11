import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './models/feed.model';
import { FeedItem } from './models/feedItem.model';
import Parser = require('rss-parser');
import rssFinder = require('rss-finder');
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class FeedService {
  parser: Parser;

  constructor(
    @InjectModel(Feed)
    private readonly feedModel: typeof Feed,
    @InjectModel(FeedItem)
    private readonly feedItemModel: typeof FeedItem,
  ) {
    this.parser = new Parser();
  }

  async createFeed(createFeedDto: CreateFeedDto): Promise<Feed> {
    const feedInfo = await rssFinder(createFeedDto.url);

    if (!feedInfo.feedUrls.length) {
      return;
    }

    const feed = await this.feedModel.create({
      url: feedInfo.feedUrls[0].url,
      name: createFeedDto.name,
      faviconUrl: feedInfo.site.favicon,
    });

    await this.updateFeed(feed);
    return feed;
  }

  findOneFeed(id: string): Promise<Feed> {
    return this.feedModel.findOne({
      where: {
        id,
      },
    });
  }

  findAllFeed(): Promise<Feed[]> {
    return this.feedModel.findAll({
      order: [['lastItemAt', 'DESC']],
    });
  }

  findLatestFeedItem(id: string): Promise<FeedItem> {
    return this.feedItemModel.findOne({
      where: {
        feedId: id,
      },
      order: [['pubDate', 'DESC']],
    });
  }

  async findFeedItems(id: string, paginationQuery: PaginationQueryDto) {
    const { page = 1, size = 10 } = paginationQuery;

    const result = await this.feedItemModel.findAndCountAll({
      where: {
        feedId: id,
      },
      limit: size,
      offset: (page - 1) * size,
      order: [['pubDate', 'DESC']],
    });

    return {
      ...result,
      next: page * size < result.count ? parseInt(page.toString()) + 1 : null,
    };
  }

  async updateFeed(feed: Feed): Promise<void> {
    const rssFeed = await this.parser.parseURL(feed.url);

    rssFeed.items.forEach(async (item) => {
      if (
        feed.lastItemAt == null ||
        (feed.lastItemAt != null && feed.lastItemAt.toString() < item.isoDate)
      ) {
        await this.feedItemModel.create({
          title: item.title,
          link: item.link,
          content: item.content,
          author: item.author ?? item.creator,
          pubDate: item.isoDate,
          feedId: feed.id,
        });
      }
    });

    feed.update({
      lastItemAt: (await this.findLatestFeedItem(feed.id)).pubDate,
    });
  }

  async updateAllFeed(): Promise<void> {
    const feeds = await this.findAllFeed();
    feeds.forEach(async (feed) => await this.updateFeed(feed));
  }
}
