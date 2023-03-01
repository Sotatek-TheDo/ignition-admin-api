import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DEFAULT_TOKEN_DECIMAL } from '../@shared/constants';

@Entity('user_balance')
export class UserBalance {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  @Index()
  userId: number;

  @Column({
    name: 'token_address',
  })
  @Index()
  tokenAddress: string;

  @Column({
    name: 'token_symbol',
  })
  @Index()
  tokenSymbol: string;

  @Column({
    name: 'token_decimal',
    nullable: true,
    default: DEFAULT_TOKEN_DECIMAL,
  })
  @Index()
  tokenDecimal: number;

  @Column()
  balance: string;

  @Column({
    name: 'available_balance',
  })
  availableBalance: string;

  @Column({
    name: 'is_enabled',
    type: 'boolean',
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
