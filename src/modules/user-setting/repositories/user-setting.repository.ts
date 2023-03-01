import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { UserSetting } from '../entities/user-setting.entity';

@EntityRepository(UserSetting)
export class UserSettingRepository extends CustomRepository<UserSetting> {}
