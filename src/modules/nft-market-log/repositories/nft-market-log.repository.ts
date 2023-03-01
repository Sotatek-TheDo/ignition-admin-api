import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { NftMarketLog } from '../entities/nft-market-log.entity';

@EntityRepository(NftMarketLog)
export class NftMarketLogRepository extends CustomRepository<NftMarketLog> {}
