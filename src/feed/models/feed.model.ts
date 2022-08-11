import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { FeedItem } from './feedItem.model';

@Table
export class Feed extends Model {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  url: string;

  @Column
  lastItemAt: Date;

  @Column
  faviconUrl: string;

  @HasMany(() => FeedItem)
  items: FeedItem[];
}
