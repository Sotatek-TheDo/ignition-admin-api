import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserBalance } from '../entities/user-balance.entity';

@EntityRepository(UserBalance)
export class UserBalanceRepository extends BaseRepository<UserBalance> {}
