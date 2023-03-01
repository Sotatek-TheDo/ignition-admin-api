import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hot_wallet')
export class HotWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  address: string;

  @Column({
    name: 'private_key',
    nullable: true,
  })
  privateKey: string;

  @Column({
    name: 'is_enabled',
    default: true,
    type: 'boolean',
  })
  isEnabled: boolean;

  @Column({
    name: 'kms_key_id',
    nullable: true,
  })
  kmsKeyId: number;

  @Column({
    name: 'is_external',
    default: false,
    type: 'boolean',
  })
  isExternal: boolean;

  @Column({
    name: 'network_id',
  })
  networkId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
