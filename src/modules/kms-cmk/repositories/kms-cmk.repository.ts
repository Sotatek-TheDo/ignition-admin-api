import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { KmsCmk } from '../entities/kms-cmk.entity';

@EntityRepository(KmsCmk)
export class KmsCmkRepository extends CustomRepository<KmsCmk> {}
