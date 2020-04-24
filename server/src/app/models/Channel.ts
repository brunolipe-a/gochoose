import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import { Message } from "./Message";
import {Group} from "./Group";

@Entity('channels')
export class Channel extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'varchar', nullable: false})
  name: string;

  @OneToMany(type => Message, message => message.channel)
  messages: Message[];

  @JoinColumn({name: "group_id"})
  @ManyToOne(type => Group, group => group.channels, { onDelete: "CASCADE" })
  group: Group;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}
