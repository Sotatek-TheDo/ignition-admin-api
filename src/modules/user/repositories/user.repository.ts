import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends CustomRepository<User> {}
