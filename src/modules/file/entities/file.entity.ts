import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EFileDriver } from '../constant/file.constant';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'bigint',
    name: 'uploader_id',
  })
  @Index()
  uploaderId: number;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: EFileDriver,
    default: EFileDriver.LOCAL,
  })
  driver: EFileDriver;

  @Column()
  path: string;

  @Column({
    name: 's3_key',
    nullable: true,
  })
  s3key: string;

  @Column({
    nullable: true,
  })
  bucket: string;

  @Column({
    name: 'file_info',
    nullable: true,
    type: 'text',
  })
  fileInfo: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
