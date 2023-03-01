import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { HotWallet } from '../entities/hot-wallet.entity';

@EntityRepository(HotWallet)
export class HotWalletRepository extends CustomRepository<HotWallet> {}
