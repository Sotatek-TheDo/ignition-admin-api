import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { KmsKey } from '../entities/kms-key.entity';

@EntityRepository(KmsKey)
export class KmsKeyRepository extends CustomRepository<KmsKey> {}
