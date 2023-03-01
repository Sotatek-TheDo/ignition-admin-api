import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nft_owner')
export class NftOwner {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'network_id',
    nullable: true,
  })
  networkId: number;

  @Column({
    name: 'nft_id',
  })
  nftId: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({
    default: 0,
  })
  quantity: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
