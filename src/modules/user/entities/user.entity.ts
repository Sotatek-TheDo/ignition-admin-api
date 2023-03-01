import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ROLE } from '../../../auth/constants/role.constant';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'invite_code',
    unique: true,
    nullable: true,
  })
  inviteCode: string;

  @Column({
    name: 'referring_code',
    nullable: true,
  })
  referringCode: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  bio: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    name: 'user_security_id',
  })
  userSecurityId: string;

  @Column({
    type: 'set',
    enum: ROLE,
    default: [ROLE.USER],
  })
  roles: ROLE[];

  @Column({
    name: 'is_enabled',
    default: true,
    type: 'boolean',
  })
  isEnabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
