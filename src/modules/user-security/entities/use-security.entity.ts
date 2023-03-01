import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  E2FaType,
  EVerificationStatus,
} from '../constant/user-security.constant';

@Entity('user_security')
export class UserSecurity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'phone_number_verified',
    enum: EVerificationStatus,
    type: 'enum',
    default: EVerificationStatus.UN_VERIFIED,
  })
  phoneNumberVerified: EVerificationStatus;

  @Column({
    name: 'type_2fa',
    default: E2FaType.NO_SETTING,
  })
  type2Fa: E2FaType;

  @Column({ nullable: true })
  otp: string;

  @Column({ name: 'secret_key', nullable: true })
  secretKey: string;

  @Column({ name: 'expired_time', nullable: true })
  expiredTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
