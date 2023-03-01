import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { NftMarket } from '../entities/nft-market.entity';

@EntityRepository(NftMarket)
export class NftMarketRepository extends CustomRepository<NftMarket> {}
