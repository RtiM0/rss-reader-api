import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async findAllFeed() {
    return {
      message: await this.feedService.findAllFeed(),
      error: false,
    };
  }

  @Post()
  async create(@Body() createFeedDto: CreateFeedDto) {
    const response = await this.feedService.createFeed(createFeedDto);
    if (!response) {
      return {
        message: 'Error subscribing to feed',
        error: true,
      };
    } else {
      return {
        message: response,
        error: false,
      };
    }
  }

  @Get('refresh')
  async refreshAllFeed() {
    await this.feedService.updateAllFeed();
    return {
      message: 'success',
      error: false,
    };
  }

  @Get(':id')
  async findFeedItems(
    @Param('id') id: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return {
      message: await this.feedService.findFeedItems(id, paginationQuery),
      error: false,
    };
  }

  @Get(':id/refresh')
  async refreshFeed(
    @Param('id') id: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const feed = await this.feedService.findOneFeed(id);
    await this.feedService.updateFeed(feed);
    return {
      message: await this.feedService.findFeedItems(id, paginationQuery),
      error: false,
    };
  }
}
