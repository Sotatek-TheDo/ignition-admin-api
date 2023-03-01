import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  ETransactionStatus,
  ETransactionType,
} from '../constant/transaction.constant';

@Entity({
  name: 'transaction',
})
export class Transaction {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'from_address',
    nullable: true,
  })
  fromAddress: string;

  @Column({
    name: 'to_address',
    nullable: true,
  })
  toAddress: string;

  @Column({
    name: 'from_user_id',
    nullable: true,
  })
  fromUserId: number;

  @Column({
    name: 'to_user_id',
    nullable: true,
  })
  toUserId: number;

  @Column({
    name: 'raw_transaction',
    nullable: true,
    type: 'longtext',
  })
  rawTransaction: string;

  @Column({
    name: 'signed_transaction',
    type: 'longtext',
    nullable: true,
  })
  signedTransaction: string;

  @Column({
    type: 'enum',
    enum: ETransactionStatus,
    default: ETransactionStatus.PENDING,
  })
  status: ETransactionStatus;

  @Column({
    name: 'tx_hash',
    nullable: true,
  })
  txHash: string;

  @Column({
    type: 'enum',
    enum: ETransactionType,
  })
  type: string;

  @Column({
    name: 'retry_count',
    default: 0,
    nullable: true,
  })
  retryCount: number;

  @Column({
    type: 'bigint',
    name: 'nft_id',
    nullable: true,
  })
  nftId: number;

  @Column({
    name: 'block_number',
  })
  blockNumber: number;

  @Column({
    name: 'token_address',
  })
  tokenAddress: string;

  @Column({
    name: 'token_symbol',
  })
  tokenSymbol: string;

  @Column({
    name: 'token_decimal',
  })
  tokenDecimal: string;

  @Column({
    name: 'fee_symbol',
  })
  feeSymbol: string;

  @Column({
    name: 'fee_amount',
  })
  feeAmount: string;

  @Column({
    type: 'longtext',
  })
  data: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
