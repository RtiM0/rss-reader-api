import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Feed } from './feed.model';

@Table
export class FeedItem extends Model {
  @Column
  title: string;

  @Column
  link: string;

  @Column(DataType.TEXT)
  content: string;

  @Column
  author: string;

  @Column
  pubDate: Date;

  @ForeignKey(() => Feed)
  @Column
  feedId: number;

  @BelongsTo(() => Feed)
  feed: Feed;
}
