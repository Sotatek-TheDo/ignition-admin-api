import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { UserWallet } from '../entities/user-wallet.entity';

@EntityRepository(UserWallet)
export class UserWalletRepository extends CustomRepository<UserWallet> {}
