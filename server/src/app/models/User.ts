import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  ManyToMany, JoinTable, BeforeUpdate
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Group } from './Group';
import { Message } from './Message'

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'varchar', length: 100, unique: true})
  username: string;

  @Column({type: 'varchar', unique: true, nullable: false})
  email: string;

  password: string;

  @Column({type: 'varchar'})
  password_hash: string;

  @Column({type: 'timestamp', default: null})
  email_verified_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updated_at: string;

  @ManyToMany(type => Group, group => group.players)
  @JoinTable({
    name: 'user_groups',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];

  @OneToMany(type => Group, group => group.master)
  masterGroups: Group[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @BeforeUpdate()
  @BeforeInsert()
  async hash() {
    if (this.password) {
      this.password_hash = await bcrypt.hash(this.password, 8);
    }
  }

  checkpassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }
}
