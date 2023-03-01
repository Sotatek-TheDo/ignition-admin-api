import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { UserSecurity } from '../entities/use-security.entity';

@EntityRepository(UserSecurity)
export class UserSecurityRepository extends CustomRepository<UserSecurity> {}
