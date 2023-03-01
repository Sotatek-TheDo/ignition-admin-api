import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ENftType } from '../constant/nft.constant';

@Entity('nft')
export class Nft {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'network_id',
    nullable: true,
  })
  networkId: number;

  @Column()
  name: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    name: 'unlockable_content',
  })
  unlockableContent: string;

  @Column({
    name: 'no_copy',
    nullable: true,
    default: 0,
  })
  noCopy: number;

  @Column({
    nullable: true,
    default: 0,
  })
  quantity: number;

  @Column({
    name: 'origin_image',
    nullable: true,
  })
  originImage: string;

  @Column({
    name: 'small_image',
    nullable: true,
  })
  smallImage: string;

  @Column({
    name: 'large_image',
    nullable: true,
  })
  largeImage: string;

  @Column({
    name: 'ipfs_json',
    nullable: true,
    type: 'longtext',
  })
  ipfsJson: string;

  @Column({
    name: 'raw_transaction',
    type: 'longtext',
    nullable: true,
  })
  rawTransaction: string;

  @Column({
    name: 'transaction_hash',
  })
  transactionHash: string;

  @Column({
    name: 'contract_address',
  })
  contractAddress: string;

  @Column({
    name: 'token_id',
  })
  tokenId: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ENftType,
  })
  type: string;

  @Column({
    name: 'creator_user_id',
    type: 'bigint',
  })
  creatorUserId: number;

  @Column({
    name: 'is_minted',
    type: 'boolean',
    default: false,
  })
  isMinted: boolean;

  @Column({
    name: 'is_sale',
    type: 'boolean',
    default: false,
  })
  isSale: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
