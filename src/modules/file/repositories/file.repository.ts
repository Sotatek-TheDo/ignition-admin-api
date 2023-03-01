import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { File } from '../entities/file.entity';

@EntityRepository(File)
export class FileRepository extends CustomRepository<File> {}
