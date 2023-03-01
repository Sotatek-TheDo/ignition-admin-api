import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { Network } from '../entities/network.entity';

@EntityRepository(Network)
export class NetworkRepository extends CustomRepository<Network> {}
