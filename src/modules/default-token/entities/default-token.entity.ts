import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DEFAULT_TOKEN_DECIMAL } from '../@shared/constants';

@Entity('default_token')
export class DefaultToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'network_id',
  })
  networkId: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
    default: DEFAULT_TOKEN_DECIMAL,
  })
  decimal: number;

  @Column({
    name: 'is_enabled',
    default: true,
    type: 'boolean',
  })
  isEnabled: boolean;

  @Column({
    nullable: true,
  })
  logo: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
