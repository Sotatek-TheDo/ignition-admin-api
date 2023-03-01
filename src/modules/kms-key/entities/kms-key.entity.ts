import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('kms_key')
export class KmsKey {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'kms_cmk_id',
  })
  kmsCmkId: number;

  @Column({
    type: 'text',
    name: 'data_key',
  })
  dataKey: string;

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
