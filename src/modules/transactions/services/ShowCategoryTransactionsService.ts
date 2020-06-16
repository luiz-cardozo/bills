import { injectable, inject } from 'tsyringe';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ISumCategoryTransactions from '../dtos/ISumCategoryTransactions';

@injectable()
class ShowCategoryTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(): Promise<ISumCategoryTransactions[] | undefined> {
    const transactions = this.transactionsRepository.findCategorizedTransactions();
    return transactions;
  }
}

export default ShowCategoryTransactionsService;
