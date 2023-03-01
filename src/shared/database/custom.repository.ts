import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  EntityRepository,
  FindOneOptions,
  Repository,
} from 'typeorm';

@EntityRepository()
export class CustomRepository<T> extends Repository<T> {
  async findOneOrCreate(
    options: FindOneOptions,
    fallbackObj?: DeepPartial<T>,
  ): Promise<T> {
    const record = await this.findOne(options);
    if (record) return record;
    if (!fallbackObj) {
      throw new Error('Entity not found!');
    }
    return this.save(fallbackObj);
  }

  async getById(id: number): Promise<T> {
    const record = await this.findOne(id);
    if (!record) {
      throw new NotFoundException();
    }

    return record;
  }
}
