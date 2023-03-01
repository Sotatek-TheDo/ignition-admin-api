import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { DefaultToken } from '../entities/default-token.entity';

@EntityRepository(DefaultToken)
export class DefaultTokenRepository extends CustomRepository<DefaultToken> {}
