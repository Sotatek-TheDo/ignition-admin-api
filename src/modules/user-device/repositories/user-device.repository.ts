import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { UserDevice } from '../entities/user-device.entity';

@EntityRepository(UserDevice)
export class UserDeviceRepository extends CustomRepository<UserDevice> {}
