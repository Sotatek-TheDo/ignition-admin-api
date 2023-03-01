import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DEFAULT_TOKEN_DECIMAL } from '../@shared/constants';

@Entity('network')
export class Network {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'chain_id',
  })
  chainId: number;

  @Column({
    name: 'chain_name',
  })
  chainName: string;

  @Column({
    name: 'rpc_endpoint',
  })
  rpcEndpoint: string;

  @Column({
    name: 'explorer_endpoint',
  })
  explorerEndpoint: string;

  @Column({
    name: 'block_time',
  })
  blockTime: string;

  @Column({
    name: 'native_token_symbol',
  })
  nativeTokenSymbol: string;

  @Column({
    name: 'native_token_decimal',
    nullable: true,
    default: DEFAULT_TOKEN_DECIMAL,
  })
  nativeTokenDecimal: number;

  @Column({
    name: 'block_confirmation',
  })
  blockConfirmation: number;

  @Column({
    name: 'is_enabled',
    default: true,
    type: 'boolean',
  })
  isEnabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
