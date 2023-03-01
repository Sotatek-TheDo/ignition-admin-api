import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EFeeLevel, ELang } from '../constant/user-setting.constant';

@Entity('user_setting')
export class UserSetting {
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
    type: 'enum',
    enum: ELang,
    default: ELang.EN,
  })
  language: ELang;

  @Column({
    type: 'boolean',
    default: false,
  })
  biometrics: boolean;

  @Column({
    name: 'default_currency',
  })
  defaultCurrency: string;

  @Column({
    name: 'default_currency_decimal',
    nullable: true,
    default: 0,
  })
  defaultCurrencyDecimal: number;

  @Column({
    name: 'default_wallet_id',
    nullable: true,
  })
  defaultWalletId: number;

  @Column({
    name: 'default_network_id',
    nullable: true,
  })
  defaultNetworkId: number;

  @Column({
    name: 'fee_level',
    type: 'enum',
    enum: EFeeLevel,
    nullable: true,
    default: EFeeLevel.MEDIUM,
  })
  feeLevel: EFeeLevel;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
