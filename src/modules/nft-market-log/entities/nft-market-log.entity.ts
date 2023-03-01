import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ENftMarketStatus } from '../../nft-market/constant/nft-market.constant';
import { EMarketAction } from '../constant/nft-market-log.constant';

@Entity({
  name: 'nft_market_log',
})
export class NftMarketLog {
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
    type: 'bigint',
  })
  nftMarketId: number;

  @Column()
  quantity: number;

  @Column({
    name: 'pending_quantity',
  })
  pendingQuantity: number;

  @Column({
    name: 'success_quantity',
    default: 0,
  })
  successQuantity: number;

  @Column({
    type: 'enum',
    enum: EMarketAction,
  })
  action: EMarketAction;

  @Column()
  price: string;

  @Column({
    type: 'bigint',
  })
  @Index()
  nftId: number;

  @Column()
  @Index()
  currency: string;

  @Column({
    name: 'currency_address',
  })
  @Index()
  currencyAddress: string;

  @Column({
    type: 'enum',
    enum: ENftMarketStatus,
    default: ENftMarketStatus.SALE,
  })
  status: ENftMarketStatus;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
