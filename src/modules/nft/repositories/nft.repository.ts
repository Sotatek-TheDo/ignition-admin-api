import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { Nft } from '../entities/nft.entity';

@EntityRepository(Nft)
export class NftRepository extends CustomRepository<Nft> {}
