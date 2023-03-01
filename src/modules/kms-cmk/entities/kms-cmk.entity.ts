import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('kms_cmk')
export class KmsCmk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'key_id',
  })
  keyId: string;

  @Column()
  region: string;

  @Column()
  alias: string;

  @Column()
  arn: string;

  @Column({
    name: 'is_enabled',
    default: true,
  })
  isEnabled: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
