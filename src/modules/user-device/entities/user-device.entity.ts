import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_device')
export class UserDevice {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  @Index()
  userId: number;

  @Column({
    name: 'device_id',
    nullable: true,
    default: '',
  })
  deviceId: string;

  @Column({
    name: 'fcm_token',
    nullable: true,
  })
  fcmToken: string;

  @Column()
  os: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
