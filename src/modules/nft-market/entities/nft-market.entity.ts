import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DEFAULT_TOKEN_DECIMAL } from '../@shared/constants';
import { ENftMarketStatus } from '../constant/nft-market.constant';

@Entity('nft_market')
export class NftMarket {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  quantity: number;

  @Column({
    name: 'pending_quantity',
  })
  pendingQuantity: number;

  @Column({
    name: 'success_quantity',
  })
  successQuantity: number;

  @Column({
    type: 'enum',
    enum: ENftMarketStatus,
    default: ENftMarketStatus.SALE,
  })
  status: ENftMarketStatus;

  @Column()
  @Index()
  currency: string;

  @Column({
    name: 'currency_address',
  })
  @Index()
  currencyAddress: string;

  @Column({
    name: 'currency_decimal',
    nullable: true,
    default: DEFAULT_TOKEN_DECIMAL,
  })
  currencyDecimal: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
