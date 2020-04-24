import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from "./User";
import { Channel } from "./Channel";

@Entity('messages')
export class Message extends BaseEntity {

  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({type: 'text'})
  content: string;

  @JoinColumn({name: "channel_id"})
  @ManyToOne(type => Channel, channel => channel.messages)
  channel: Channel;

  @JoinColumn({name: "user_id"})
  @ManyToOne(type => User, user => user.messages)
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}
