import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { NftOwner } from '../entities/nft-owner.entity';

@EntityRepository(NftOwner)
export class NftOwnerRepository extends CustomRepository<NftOwner> {}
