import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class ShowTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(): Promise<Transaction[] | undefined> {
    const transactions = this.transactionsRepository.findAll();
    return transactions;
  }
}

export default ShowTransactionsService;
