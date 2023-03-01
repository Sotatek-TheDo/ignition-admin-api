import { CustomRepository } from 'src/shared/database/custom.repository';
import { EntityRepository } from 'typeorm';

import { Transaction } from '../entities/transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends CustomRepository<Transaction> {}
