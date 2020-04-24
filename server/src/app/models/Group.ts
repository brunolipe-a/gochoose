import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from "./User";
// @ts-ignore
import { Channel } from './Channel';

@Entity('groups')
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'boolean', default: false})
  is_private: boolean;

  @ManyToMany(type => User, user => user.groups)
  players: User[];

  @JoinColumn({name: "master_id"})
  @ManyToOne(type => User, user => user.masterGroups)
  master: User;

  @OneToMany(type => Channel, channel => channel.group)
  channels: Channel[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}
